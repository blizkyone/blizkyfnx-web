import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
   Navbar,
   Nav,
   Container,
   NavDropdown,
   Form,
   Button,
   Spinner,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout, login } from '../actions/userActions'
import { googleAuth } from '../actions/authActions'
import { ifPendingNotifications } from '../actions/notificationActions'

const Header = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo, loading } = userLogin
   const {
      loading: googleLoading,
      success: googleSuccess,
      error: googleError,
   } = useSelector((state) => state.searchLocation)
   const { city, region } = useSelector((state) => state.searchLocation)
   const { pending } = useSelector((state) => state.notificationsIfPending)
   const { success } = useSelector((state) => state.notificationsMarkAsSeen)

   useEffect(() => {
      if (userInfo) {
         dispatch(ifPendingNotifications())
      }
   }, [success])

   const logoutHandler = () => {
      dispatch(logout())
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      if (!email || !password) return
      dispatch(login(email, password))
   }

   const handleGoogleAuth = () => {
      window.open(
         'https://localhost:5001/api/auth/google',
         '_self',
         'width=500,height=600'
      )
      // dispatch(googleAuth())
   }

   const handleFacebookAuth = () => {
      window.open(
         'https://localhost:5001/api/auth/facebook',
         '_self',
         'width=500,height=600'
      )
      // dispatch(googleAuth())
   }

   return (
      <Navbar bg='light' expand='lg'>
         <Container>
            <LinkContainer to='/'>
               <Navbar.Brand>{`Blizky Fnx: ${city}, ${region}`}</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse
               id='basic-navbar-nav'
               className='justify-content-end'
            >
               {userInfo ? (
                  <>
                     <>
                        <Link
                           to='/notifications'
                           style={{ textDecoration: 'none' }}
                        >
                           Notificaciones
                        </Link>
                        {pending && (
                           <i
                              className='fas fa-circle'
                              style={{
                                 color: 'red',
                                 position: 'relative',
                                 top: -8,
                              }}
                           ></i>
                        )}
                     </>

                     <NavDropdown
                        title={userInfo.name}
                        id='username'
                        className=''
                     >
                        <LinkContainer to='/mi-perfil'>
                           <NavDropdown.Item>Mi Perfil</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>
                           Logout
                        </NavDropdown.Item>
                        <LinkContainer to='/crear-negocio'>
                           <NavDropdown.Item>Crear Negocio</NavDropdown.Item>
                        </LinkContainer>
                     </NavDropdown>
                  </>
               ) : (
                  <Form
                     onSubmit={handleSubmit}
                     className='d-flex flex-row align-items-center'
                  >
                     <Form.Group controlId='emailheader' className='mx-1'>
                        <Form.Control
                           type='email'
                           placeholder='Enter email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                     </Form.Group>

                     <Form.Group controlId='passwordheader' className='mx-1'>
                        <Form.Control
                           type='password'
                           placeholder='Enter password'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                     </Form.Group>

                     <Button
                        type='submit'
                        variant='primary'
                        size='sm'
                        className='mx-1'
                        style={{ height: '2.4rem' }}
                     >
                        {loading ? (
                           <Spinner animation='border' size='sm' />
                        ) : (
                           'Sign In'
                        )}
                     </Button>

                     {/* <Button
                        size='sm'
                        className='mx-1'
                        style={{ height: '2.4rem' }}
                        onClick={handleGoogleAuth}
                     >
                        {googleLoading ? (
                           <Spinner animation='border' size='sm' />
                        ) : (
                           'Google'
                        )}
                     </Button> */}

                     <Button
                        size='sm'
                        className='mx-1'
                        style={{ height: '2.4rem' }}
                        onClick={handleFacebookAuth}
                     >
                        {googleLoading ? (
                           <Spinner animation='border' size='sm' />
                        ) : (
                           'Facebook'
                        )}
                     </Button>

                     <LinkContainer to='/register'>
                        <Nav.Link>Sign up</Nav.Link>
                     </LinkContainer>
                  </Form>
               )}
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default Header
