import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connectWith } from '../actions/userActions'
import { Button, Spinner, Modal } from 'react-bootstrap'

const ButtonDisplay = ({ user }) => {
   const [show, setShow] = useState()
   const dispatch = useDispatch()

   const { loading: connectLoading } = useSelector((state) => state.userConnect)
   const { userInfo } = useSelector((state) => state.userLogin)

   const handleClickButton = () => {
      if (userInfo) {
         dispatch(connectWith(user.user._id))
      }
   }

   const handleReject = () => {
      dispatch(connectWith(user.user._id, true))
   }

   const noUserModal = () => (
      <Modal show={show} onHide={(_) => setShow(false)}>
         <Modal.Header>
            <Modal.Title>
               Crea un usuario para Recomendar y Conectar en Blizky
            </Modal.Title>
         </Modal.Header>
         <Modal.Footer>
            <Button variant='primary' onClick={(_) => setShow(false)}>
               Ok!
            </Button>
         </Modal.Footer>
      </Modal>
   )

   const cancelModal = () => (
      <Modal show={show} onHide={(_) => setShow(false)}>
         <Modal.Header>
            <Modal.Title>¿Deseas cancelar la solicitud?</Modal.Title>
         </Modal.Header>
         <Modal.Footer>
            <Button variant='secondary' onClick={(_) => setShow(false)}>
               Mejor no
            </Button>
            <Button variant='primary' onClick={handleClickButton}>
               Confirmar
            </Button>
         </Modal.Footer>
      </Modal>
   )

   const unFriendModal = () => (
      <Modal show={show} onHide={(_) => setShow(false)}>
         <Modal.Header>
            <Modal.Title>{`¿Deseas desconectarte de ${user.user.name} ${user.user.familyName}?`}</Modal.Title>
         </Modal.Header>
         <Modal.Footer>
            <Button variant='secondary' onClick={(_) => setShow(false)}>
               Mejor no
            </Button>
            <Button variant='primary' onClick={handleClickButton}>
               Confirmar
            </Button>
         </Modal.Footer>
      </Modal>
   )

   if (!userInfo)
      return (
         <>
            <Button size='sm' variant='primary' onClick={(_) => setShow(true)}>
               Connectar
            </Button>
            {noUserModal()}
         </>
      )
   switch (user.status) {
      case 'none':
         return (
            <Button size='sm' variant='primary' onClick={handleClickButton}>
               {connectLoading ? (
                  <Spinner animation='border' size='sm' />
               ) : (
                  'Conectar'
               )}
            </Button>
         )
      case 'request-received':
         return (
            <div className='d-flex justify-content-start'>
               <Button size='sm' variant='light' onClick={handleClickButton}>
                  {connectLoading ? (
                     <Spinner animation='border' size='sm' />
                  ) : (
                     <i
                        className='fas fa-check-circle'
                        style={{ color: 'green' }}
                     ></i>
                  )}
               </Button>
               <Button size='sm' variant='light' onClick={handleReject}>
                  {connectLoading ? (
                     <Spinner animation='border' size='sm' />
                  ) : (
                     <i
                        className='fas fa-times-circle'
                        style={{ color: 'red' }}
                     ></i>
                  )}
               </Button>
            </div>
         )
      case 'request-sent':
         return (
            <>
               <Button
                  size='sm'
                  variant='warning'
                  onClick={(_) => setShow(true)}
               >
                  {connectLoading ? (
                     <Spinner animation='border' size='sm' />
                  ) : (
                     'En espera'
                  )}
               </Button>
               {cancelModal()}
            </>
         )
      case 'friend':
         return (
            <>
               <Button
                  size='sm'
                  variant='secondary'
                  onClick={(_) => setShow(true)}
               >
                  {connectLoading ? (
                     <Spinner animation='border' size='sm' />
                  ) : (
                     'Amigo'
                  )}
               </Button>
               {unFriendModal()}
            </>
         )
      default:
         return (
            <Button size='sm' variant='primary' onClick={handleClickButton}>
               {connectLoading ? (
                  <Spinner animation='border' size='sm' />
               ) : (
                  'Conectar'
               )}
            </Button>
         )
   }
}

export default ButtonDisplay
