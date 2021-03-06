import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   Row,
   Form,
   Col,
   ListGroup,
   Spinner,
   Button,
   Modal,
} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {
   getCategories,
   createNewCategory,
   editServiceProfile,
} from '../actions/serviceActions'
import { SERVICE_EDIT_PROFILE_RESET } from '../constants/serviceConstants'
import Message from '../components/Message'

const SetCategoryScreen = ({ history }) => {
   const { serviceInfo } = history.location.state

   const [query, setQuery] = useState('')
   const [catArray, setCatArray] = useState([])
   const [displayCategories, setDisplayCategories] = useState([])
   const [selectedCategories, setSelectedCategories] = useState([])
   const [newCatName, setNewCatName] = useState('')
   const [show, setShow] = useState(false)

   const dispatch = useDispatch()

   const { loading, error, categories } = useSelector(
      (state) => state.serviceCategories
   )

   const {
      loading: saveLoading,
      error: saveError,
      service,
   } = useSelector((state) => state.serviceEditProfile)

   const {
      loading: newCatLoading,
      error: newCatError,
      new_category,
   } = useSelector((state) => state.serviceNewCategory)

   useEffect(() => {
      dispatch({ type: SERVICE_EDIT_PROFILE_RESET })
      return () => dispatch({ type: SERVICE_EDIT_PROFILE_RESET })
   }, [])

   useEffect(() => {
      if (service) history.goBack()
   }, [service])

   useEffect(() => {
      setShow(false)
      dispatch(getCategories())
   }, [new_category])

   useEffect(() => {
      //   console.log(categories)
      setQuery('')
      setCatArray(
         categories.map((cat) => ({
            name: cat.name,
            _id: cat._id,
            selected: false,
         }))
      )
      // setDisplayCategories(categories.map(cat=>({name: cat.name, _id: cat._id, selected: false})))
   }, [categories])

   useEffect(() => {
      const filterCategories = (arr, query) => {
         return arr.filter(
            (el) => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
         )
      }
      setDisplayCategories(filterCategories(catArray, query))
      setSelectedCategories(catArray.filter((cat) => cat.selected))
   }, [query, catArray])

   const handleSumbitNewCatModal = (e) => {
      if (newCatName) {
         dispatch(createNewCategory(newCatName))
      }
   }

   const handleSelectCategory = (_id) => {
      setCatArray((array) =>
         array.map((cat) => {
            if (cat._id === _id) {
               if (!cat.selected && selectedCategories.length > 2) return cat
               return { ...cat, selected: !cat.selected }
            }
            return cat
         })
      )
   }

   const handleNext = () => {
      if (selectedCategories.length === 0) return
      let c = selectedCategories.map((x) => x.name)
      dispatch(editServiceProfile({ categories: c }, serviceInfo._id))
   }

   return (
      <FormContainer>
         <h4>Elige hasta tres categor??as para tu negocio</h4>
         {error && <Message variant='danger'>{error}</Message>}
         {saveError && <Message variant='danger'>{saveError}</Message>}
         <Row>
            <Col xs={8}>
               {selectedCategories.map((cat) => (
                  <p key={cat._id} className='m-0'>
                     {cat.name}
                  </p>
               ))}
            </Col>
            <Col>
               <Button onClick={(_) => setShow(true)}>Nueva Categor??a</Button>
            </Col>
         </Row>
         <Form>
            <Form.Control
               placeholder='busca categorias'
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className='my-3'
            />
         </Form>
         {loading ? (
            <Spinner animation='border' />
         ) : displayCategories.length > 0 ? (
            <ListGroup style={{ maxHeight: '500px', overflow: 'scroll' }}>
               {displayCategories.map((category) => (
                  <ListGroup.Item
                     key={category._id}
                     action
                     onClick={(_) => handleSelectCategory(category._id)}
                     className='d-flex justify-content-between'
                  >
                     <p>{category.name}</p>
                     {category.selected && <i class='fas fa-check-circle'></i>}
                  </ListGroup.Item>
               ))}
            </ListGroup>
         ) : (
            'Se el primero en crear una categor??a en tu lenguaje'
         )}
         <Modal show={show} onHide={(_) => setShow(false)}>
            <Modal.Header>
               <Modal.Title>
                  Escribe el nombre de la nueva categor??a
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {newCatError && (
                  <Message variant='danger'>{newCatError}</Message>
               )}
               <Form.Control
                  placeholder='Nueva categor??a'
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className='my-3'
               />
               <Button onClick={handleSumbitNewCatModal}>
                  {newCatLoading ? (
                     <Spinner animation='border' size='sm' />
                  ) : (
                     'Crear'
                  )}
               </Button>
               <Button variant='danger' onClick={(_) => setShow(false)}>
                  Cancelar
               </Button>
            </Modal.Body>
         </Modal>
         <Button onClick={handleNext} className='m-3'>
            {saveLoading ? <Spinner size='sm' variant='border' /> : 'Guardar'}
         </Button>
         <Button
            className='m-3'
            variant='danger'
            onClick={(_) => history.goBack()}
         >
            Cancelar
         </Button>
      </FormContainer>
   )
}

export default SetCategoryScreen
