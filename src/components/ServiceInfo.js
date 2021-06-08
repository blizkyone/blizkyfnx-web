import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Button, Spinner } from 'react-bootstrap'
import { recommendService, getServiceProfile } from '../actions/serviceActions'
import Message from './Message'
import ButtonDisplay from './ButtonDisplay'

const ServiceInfo = ({ selectedService, history }) => {
   const [message, setMessage] = useState('')

   const dispatch = useDispatch()

   const { userInfo } = useSelector((state) => state.userLogin)

   const { error: recoError, loading: recoLoading } = useSelector(
      (state) => state.serviceRecommend
   )

   const { error, loading, service } = useSelector(
      (state) => state.serviceProfile
   )

   const { error: connectError, success } = useSelector(
      (state) => state.userConnect
   )

   useEffect(() => {
      setMessage('')
      dispatch(getServiceProfile(selectedService._id))
   }, [selectedService, success])

   useEffect(() => {
      if (error) setMessage(error)
      if (recoError) setMessage(recoError)
      if (connectError) setMessage(connectError)
   }, [error, recoError, connectError])

   const handleRecommend = () => {
      dispatch(recommendService(service._id))
   }

   return loading ? (
      <Spinner animation='border' size='sm' />
   ) : (
      <Col>
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
         <p>{service.description}</p>

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
                        className='m-1'
                        style={{ color: 'blue' }}
                        onClick={(_) =>
                           history.push(`/user/${user.user._id}/profile`)
                        }
                     >
                        {`${user.user.name} ${user.user.familyName}`}
                     </p>
                  </div>
                  {userInfo && userInfo._id !== user.user._id && (
                     <ButtonDisplay user={user} userInfo={userInfo} />
                  )}
               </Col>
            ))}
         </Row>
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
                     style={{ display: 'inline-block', fontWeight: 600 }}
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
                     style={{ display: 'inline-block', fontWeight: 600 }}
                  >{`:  ${service.webpage}`}</p>
               </div>
            )}
         </div>
      </Col>
   )
}

export default ServiceInfo
