import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Button, Spinner, Row } from 'react-bootstrap'
import { USER_INVITE_TO_TEAM_RESET } from '../constants/userConstants'
import { inviteUserToTeam } from '../actions/userActions'
import Message from './Message'

const InviteToTeamModal = ({ show, setShow, selectedService }) => {
   const [user, setUser] = useState('')
   const [position, setPosition] = useState('')
   const [invited, setInvited] = useState('')

   const dispatch = useDispatch()

   const { loading, error, success } = useSelector(
      (state) => state.userInviteToTeam
   )

   useEffect(() => {
      if (success) {
         setInvited(`${user} invitado como ${position}`)
         dispatch({ type: USER_INVITE_TO_TEAM_RESET })
      }
   }, [success])

   const handleInviteToTeam = () => {
      if (!user || !position) return
      dispatch(
         inviteUserToTeam({ user, position, service: selectedService._id })
      )
   }

   const handleAccept = () => {
      setUser('')
      setPosition('')
      setInvited('')
      setShow(false)
   }

   return (
      <Modal show={show} onHide={(_) => setShow(false)}>
         <Modal.Header>
            <Modal.Title>Invitar al Equipo</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {error && <Message variant='danger'>{error}</Message>}
            {invited && <Message variant='success'>{invited}</Message>}
            <Form.Control
               placeholder='usuario'
               value={user}
               onChange={(e) => setUser(e.target.value)}
               className='my-3'
            />
            <Form.Control
               placeholder='Puesto'
               value={position}
               onChange={(e) => setPosition(e.target.value)}
               className='my-3'
            />
            {invited ? (
               <Button onClick={handleAccept} variant='outline-success'>
                  Aceptar
               </Button>
            ) : (
               <>
                  <Button className='m-2' onClick={handleInviteToTeam}>
                     {loading ? (
                        <Spinner animation='border' size='sm' />
                     ) : (
                        'Invitar'
                     )}
                  </Button>
                  <Button
                     className='m-2'
                     variant='danger'
                     onClick={(_) => setShow(false)}
                  >
                     Cancelar
                  </Button>
               </>
            )}
         </Modal.Body>
      </Modal>
   )
}

export default InviteToTeamModal
