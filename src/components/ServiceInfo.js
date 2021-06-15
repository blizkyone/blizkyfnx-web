import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Button, Spinner, Modal, Card } from 'react-bootstrap'
import { recommendService, getServiceProfile } from '../actions/serviceActions'
import Message from './Message'
import ButtonDisplay from './ButtonDisplay'
import Radium from 'radium'
import InviteToTeamModal from './InviteToTeamModal'
import RecosListModal from './RecosListModal'

const styles = {
   user: {
      color: 'blue',
      ':hover': {
         cursor: 'pointer',
      },
   },
   link: {
      display: 'inline-block',
      fontWeight: 600,
      ':hover': {
         cursor: 'pointer',
      },
   },
   ref: {
      fontWeight: 600,
      ':hover': {
         cursor: 'pointer',
      },
   },
}

const ServiceInfo = ({ selectedService, history }) => {
   const [message, setMessage] = useState('')
   const [show, setShow] = useState(false)
   const [showRecosList, setShowRecosList] = useState(false)
   const [showRecosFollowingList, setShowRecosFollowingList] = useState(false)
   const [inviteShow, setInviteShow] = useState(false)
   const [isAdmin, setIsAdmin] = useState(false)

   const dispatch = useDispatch()

   const { userInfo } = useSelector((state) => state.userLogin)

   const { error: recoError, loading: recoLoading } = useSelector(
      (state) => state.serviceRecommend
   )

   const { error, loading, service } = useSelector(
      (state) => state.serviceProfile
   )

   const { success } = useSelector((state) => state.userConnect)

   useEffect(() => {
      setMessage('')
      dispatch(getServiceProfile(selectedService._id))
   }, [selectedService, success])

   useEffect(() => {
      if (userInfo && service && service.owner === userInfo._id) {
         setIsAdmin(true)
      } else {
         setIsAdmin(false)
      }
   }, [service])

   useEffect(() => {
      if (error) setMessage(`error: ${error}`)
      if (recoError) setMessage(`recoError ${recoError}`)
      // if (connectError) setMessage(`connectError ${connectError}`)
   }, [error, recoError])

   const handleRecommend = () => {
      if (userInfo) {
         dispatch(recommendService(service._id))
      } else {
         setShow(true)
      }
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

   return loading ? (
      <Spinner animation='border' size='sm' />
   ) : (
      <Col>
         {noUserModal()}
         <InviteToTeamModal
            selectedService={selectedService}
            show={inviteShow}
            setShow={setInviteShow}
         />
         {isAdmin && (
            <Card className='mb-3 p-3'>
               <Row>
                  <Col>
                     <Button
                        variant='info'
                        size='sm'
                        onClick={(_) =>
                           history.push(`/service/edit-info`, {
                              serviceInfo: selectedService,
                           })
                        }
                     >
                        Edit Info
                     </Button>
                  </Col>
                  <Col>
                     <Button
                        variant='info'
                        size='sm'
                        onClick={(_) =>
                           history.push(`/service/edit-location`, {
                              serviceInfo: selectedService,
                           })
                        }
                     >
                        Edit Location
                     </Button>
                  </Col>
                  <Col>
                     <Button
                        variant='info'
                        size='sm'
                        onClick={(_) =>
                           history.push(`/service/edit-categories`, {
                              serviceInfo: selectedService,
                           })
                        }
                     >
                        Edit Categories
                     </Button>
                  </Col>
                  <Col>
                     <Button
                        variant='info'
                        size='sm'
                        onClick={(_) => setInviteShow(true)}
                     >
                        Invitar a Equipo
                     </Button>
                  </Col>
               </Row>
            </Card>
         )}
         <Row>
            {message && <Message variant='danger'>{message}</Message>}
            <Col>
               <h1>{service.name}</h1>
            </Col>
            <Col xs='auto'>
               <Button
                  variant={service.recommended ? 'secondary' : 'primary'}
                  onClick={handleRecommend}
               >
                  {recoLoading ? (
                     <Spinner animation='border' size='sm' />
                  ) : service.recommended ? (
                     'Recomendado'
                  ) : (
                     'Recomendar'
                  )}
               </Button>
            </Col>
         </Row>
         {service.categories.map((category) => (
            <p
               style={{ display: 'inline-block', color: 'gray' }}
               key={category}
            >{`${category}--`}</p>
         ))}
         {service.recos.length > 0 && (
            // <Card className='p-3 my-3'>
            <Row className='mb-2'>
               <Col>
                  <RecosListModal
                     show={showRecosList}
                     setShow={setShowRecosList}
                     userArray={service.recos}
                     title={'Recomendaciones'}
                  />
                  <p
                     className='m-0'
                     key={'recomendaciones'}
                     style={styles.ref}
                     onClick={(_) => setShowRecosList(true)}
                  >
                     <strong>{'Recomendaciones:'}</strong>
                     {` ${service.recos.length}`}
                  </p>
               </Col>
               {service.recosFollowing && (
                  <Col>
                     <RecosListModal
                        show={showRecosFollowingList}
                        setShow={setShowRecosFollowingList}
                        userArray={service.recosFollowing}
                        title={'Amigos'}
                     />
                     <p
                        className='m-0'
                        key={'amigos'}
                        style={styles.ref}
                        onClick={(_) => setShowRecosFollowingList(true)}
                     >
                        <strong>{'Amigos:'}</strong>
                        {` ${service.recosFollowing.length}`}
                     </p>
                  </Col>
               )}
            </Row>
            // </Card>
         )}
         <p>{service.description}</p>
         <hr />
         <p className='mb-1' style={{ fontWeight: 800 }}>
            Equipo:
         </p>
         <Row>
            {service.team.map((user) => (
               <Col
                  sm={5}
                  className='m-1 d-flex flex-row justify-content-between align-items-center'
                  key={user._id}
               >
                  <div>
                     <p className='m-1'>{`${user.position}:`}</p>
                     <p
                        key={user.user._id}
                        className='m-1'
                        style={styles.user}
                        onClick={(_) =>
                           history.push(`/user/${user.user._id}/profile`)
                        }
                     >
                        {`${user.user.name} ${user.user.familyName}`}
                     </p>
                  </div>
                  {!userInfo ? (
                     <ButtonDisplay user={user} />
                  ) : userInfo._id !== user.user._id ? (
                     <ButtonDisplay user={user} />
                  ) : null}
               </Col>
            ))}
         </Row>
         <hr />
         <Row>
            <p className='mb-1' style={{ fontWeight: 800 }}>
               Telefonos:
            </p>
            {service.phoneArray.map((phone) => (
               <Col sm={3} className='m-1' key={phone._id}>
                  <p className='m-1'>{`${phone.label}:`}</p>
                  <p className='m-1' style={{ color: 'blue' }}>
                     {phone.phone}
                  </p>
               </Col>
            ))}
         </Row>
         <div className='my-3'>
            {service.instagram && (
               <div>
                  <p className='my-1' style={{ display: 'inline-block' }}>
                     <i className='fab fa-instagram'></i>
                     Instagram
                  </p>
                  <p
                     className='my-1'
                     style={styles.link}
                     key={service.instagram}
                     onClick={(_) =>
                        window.open(
                           `https://www.instagram.com/${service.instagram}`
                        )
                     }
                  >{`:  @${service.instagram}`}</p>
               </div>
            )}
            {service.webpage && (
               <div>
                  <p className='my-1' style={{ display: 'inline-block' }}>
                     <i className='fas fa-globe-americas'></i>
                     Webpage
                  </p>
                  <p
                     className='my-1'
                     style={styles.link}
                     key={service.webpage}
                     onClick={(_) => window.open(`https://${service.webpage}`)}
                  >{`:  ${service.webpage}`}</p>
               </div>
            )}
         </div>
      </Col>
   )
}

export default Radium(ServiceInfo)
