import React from 'react'
import { useSelector } from 'react-redux'
import { Modal, ListGroup } from 'react-bootstrap'
import ButtonDisplayUserProfile from './ButtonDisplayUserProfile'

const RecosListModal = ({ show, setShow, userArray, title }) => {
   console.log(userArray)
   const { userInfo } = useSelector((state) => state.userLogin)
   return (
      <Modal show={show} onHide={(_) => setShow(false)}>
         <Modal.Header>{title}</Modal.Header>
         <Modal.Body>
            <ListGroup>
               {userArray.map((user) => (
                  <ListGroup.Item key={user._id} className='d-flex flex-row'>
                     <p
                        style={{ flex: 1 }}
                     >{`${user.name} ${user.familyName}`}</p>
                     {user._id !== userInfo._id && (
                        <ButtonDisplayUserProfile user={user} />
                     )}
                  </ListGroup.Item>
               ))}
            </ListGroup>
         </Modal.Body>
      </Modal>
   )
}

export default RecosListModal
