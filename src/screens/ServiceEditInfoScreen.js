import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { editServiceProfile } from '../actions/serviceActions'
import { SERVICE_EDIT_PROFILE_RESET } from '../constants/serviceConstants'

const ServiceEditInfoScreen = ({ history }) => {
   const { serviceInfo } = history.location.state

   const [name, setName] = useState(serviceInfo.name)
   const [description, setDescription] = useState(serviceInfo.description)
   const [webpage, setWebpage] = useState(serviceInfo.webpage)
   const [instagram, setInstagram] = useState(serviceInfo.instagram)
   const [phoneArray, setPhoneArray] = useState(serviceInfo.phoneArray)

   const [newPhone, setNewPhone] = useState('')
   const [newPhoneLabel, setNewPhoneLabel] = useState('')

   const [message, setMessage] = useState(null)
   const [show, setShow] = useState(false)

   const dispatch = useDispatch()

   const { loading, error, service } = useSelector(
      (state) => state.serviceEditProfile
   )

   useEffect(() => {
      dispatch({ type: SERVICE_EDIT_PROFILE_RESET })
      return () => dispatch({ type: SERVICE_EDIT_PROFILE_RESET })
   }, [])

   useEffect(() => {
      if (service) {
         history.goBack()
      }
   }, [service])

   useEffect(() => {
      setMessage('')
      if (error) setMessage(error)
   }, [error])

   const submitHandler = (e) => {
      e.preventDefault()
      if (name && description) {
         dispatch(
            editServiceProfile(
               {
                  name,
                  description,
                  webpage,
                  instagram,
                  phoneArray,
               },
               serviceInfo._id
            )
         )
      } else {
         setMessage('Escribe al menos nombre y descripción')
      }
   }

   const addPhoneToArray = () => {
      setPhoneArray((array) =>
         array.concat([{ phone: newPhone, label: newPhoneLabel }])
      )
      setNewPhone('')
      setNewPhoneLabel('')
      setShow(false)
   }

   const removePhoneFromArray = (loc) => {
      const newArray = phoneArray.filter((x, i) => i != loc)
      setPhoneArray(newArray)
   }

   return (
      <FormContainer>
         <h1>Editar Info del Servicio</h1>
         {message && <Message variant='danger'>{message}</Message>}
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
               <Form.Label>Nombre</Form.Label>
               <Form.Control
                  required
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
               <Form.Label>Descripcion</Form.Label>
               <Form.Control
                  required
                  as='textarea'
                  type='text'
                  placeholder='Describe your service'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group className='my-3'>
               {phoneArray.length > 0 && <Form.Label>Telefonos</Form.Label>}
               {phoneArray.map((element, i) => (
                  <Row key={i}>
                     <Col>{element.label}</Col>
                     <Col>{element.phone}</Col>
                     <Col auto>
                        <Button onClick={(_) => removePhoneFromArray(i)}>
                           <i className='fas fa-trash-alt'></i>
                        </Button>
                     </Col>
                  </Row>
               ))}
               <Button onClick={(_) => setShow(true)}>Agregar telefono</Button>
            </Form.Group>
            <Form.Group controlId='Webpage'>
               <Form.Label>Pagina web</Form.Label>
               <Form.Control
                  type='Webpage'
                  placeholder='Enter Webpage'
                  value={webpage}
                  onChange={(e) => setWebpage(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group controlId='Instagram'>
               <Form.Label>Instagram</Form.Label>
               <Form.Control
                  type='Instagram'
                  placeholder='Instagram username'
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Modal show={show} onHide={(_) => setShow(false)}>
               <Modal.Header>
                  <Modal.Title>
                     Escribe el nombre de la nueva categoría
                  </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form.Control
                     placeholder='Nombre'
                     value={newPhoneLabel}
                     onChange={(e) => setNewPhoneLabel(e.target.value)}
                     className='my-3'
                  />
                  <Form.Control
                     placeholder='Telefono'
                     value={newPhone}
                     onChange={(e) => setNewPhone(e.target.value)}
                     className='my-3'
                  />
                  <Button onClick={addPhoneToArray}>Crear</Button>
                  <Button variant='danger' onClick={(_) => setShow(false)}>
                     Cancelar
                  </Button>
               </Modal.Body>
            </Modal>
            <Button type='submit' variant='primary'>
               {loading ? <Spinner animation='border' size='sm' /> : 'Guardar'}
            </Button>
            <Button variant='danger' onClick={(_) => history.goBack()}>
               Cancelar
            </Button>
         </Form>
      </FormContainer>
   )
}

export default ServiceEditInfoScreen
