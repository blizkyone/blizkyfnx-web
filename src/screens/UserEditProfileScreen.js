import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, InputGroup, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const UserEditProfileSreen = ({ history }) => {
   const [name, setName] = useState('')
   const [familyName, setFamilyName] = useState('')
   const [username, setUsername] = useState('')
   const [bio, setBio] = useState('')
   const [message, setMessage] = useState(null)

   const dispatch = useDispatch()

   const { userInfo } = useSelector((state) => state.userLogin)

   const { loading, error, success } = useSelector(
      (state) => state.userUpdateProfile
   )

   useEffect(() => {
      setName(userInfo.name)
      setFamilyName(userInfo.familyName)
      setUsername(userInfo.username)
      if (userInfo.bio) {
         setBio(userInfo.bio)
      }
   }, [])

   useEffect(() => {
      if (success) history.push('/mi-perfil')
      return () => {
         dispatch({ type: USER_UPDATE_PROFILE_RESET })
      }
   }, [success, history])

   useEffect(() => {
      setMessage('')
      if (error) setMessage(error)
   }, [error])

   const submitHandler = (e) => {
      e.preventDefault()
      if (!/^[a-zA-Z0-9_.-]*$/.test(username)) {
         setMessage('Nombre de usuario invalido')
      } else if (name && username && familyName) {
         dispatch(updateUserProfile({ name, username, familyName, bio }))
      } else {
         setMessage('Revisa que la información esté completa')
      }
   }

   return (
      <FormContainer>
         <h1>Editar Perfil</h1>
         {message && <Message variant='danger'>{message}</Message>}
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
               <Form.Label>Nombre</Form.Label>
               <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='familyName'>
               <Form.Label>Apellido</Form.Label>
               <Form.Control
                  type='name'
                  placeholder='Apellidos'
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='username'>
               <Form.Label>Usuario</Form.Label>
               <InputGroup>
                  <InputGroup.Prepend>
                     <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                     type='username'
                     placeholder='Enter username'
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                  ></Form.Control>
               </InputGroup>
               <Form.Text className='text-muted'>
                  Username must use '.-_' and alphanumeric characters only.
               </Form.Text>
            </Form.Group>

            <Form.Group controlId='bio'>
               <Form.Label>Bio</Form.Label>
               <Form.Control
                  as='textarea'
                  type='text'
                  placeholder='Algo sobre ti'
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Button className='m-2' type='submit' variant='primary'>
               {loading ? (
                  <Spinner animation='border' size='sm' />
               ) : (
                  'Guardar Cambios'
               )}
            </Button>
            <Button
               className='m-2'
               variant='danger'
               onClick={(_) => history.goBack()}
            >
               Cancelar
            </Button>
         </Form>
      </FormContainer>
   )
}

export default UserEditProfileSreen
