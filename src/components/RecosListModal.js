import React from 'react'
import Radium from 'radium'
import { Modal, ListGroup } from 'react-bootstrap'
import ButtonDisplayUserProfile from './ButtonDisplayUserProfile'

const styles = {
   username: {
      flex: 1,
      ':hover': {
         cursor: 'pointer',
      },
   },
}

const RecosListModal = ({
   show,
   setShow,
   userArray,
   title,
   handleClickOnUser,
}) => {
   return (
      <Modal show={show} onHide={(_) => setShow(false)}>
         <Modal.Header>{title}</Modal.Header>
         <Modal.Body>
            <ListGroup>
               {userArray.map((user, i) => (
                  <ListGroup.Item key={user._id} className='d-flex flex-row'>
                     <p
                        key={i}
                        style={styles.username}
                        onClick={(_) => handleClickOnUser(user._id)}
                     >{`${user.name} ${user.familyName}`}</p>
                     <ButtonDisplayUserProfile user={user} />
                  </ListGroup.Item>
               ))}
            </ListGroup>
         </Modal.Body>
      </Modal>
   )
}

export default Radium(RecosListModal)
