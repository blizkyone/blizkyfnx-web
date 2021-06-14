import React, { useState, useEffect } from 'react'
import ServicesListFilter from '../components/myProfileScreen/ServicesListFilter'
import ServiceDisplay from '../components/myProfileScreen/ServiceDisplay'
import useCrazyShit from '../hooks/useCrazyShit'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import {
   Alert,
   Row,
   Col,
   Card,
   ListGroup,
   Button,
   Spinner,
} from 'react-bootstrap'
import { getMyProfile, handleInviteToTeam } from '../actions/userActions'
import {
   USER_MY_PROFILE_RESET,
   USER_RESPOND_INVITE_TO_TEAM_RESET,
} from '../constants/userConstants'

const UserProfileScreen = ({ history, match }) => {
   const [mapCenter, setMapCenter] = useState({
      lat: 20.9670154,
      lng: -89.6242833,
   })

   const [selectedService, setSelectedService] = useState()
   const [value, setValue] = useState('')

   const dispatch = useDispatch()

   const { userInfo } = useSelector((state) => state.userLogin)

   const { profile, recoCategories, loading, error } = useSelector(
      (state) => state.userMyProfile
   )

   const {
      loading: respondLoading,
      error: respondError,
      success: respondSuccess,
   } = useSelector((state) => state.userRespondInviteToTeam)

   const { service } = useSelector((state) => state.serviceRecommend)

   // console.log(profile)

   const { filteredServices, markers: listMarkers } = useCrazyShit(
      value,
      profile.recoServices,
      recoCategories
   )

   useEffect(() => {
      if (!userInfo) {
         history.push('/')
      }
   }, [userInfo, history])

   useEffect(() => {
      dispatch(getMyProfile())
      return () => {
         dispatch({ type: USER_MY_PROFILE_RESET })
      }
   }, [dispatch, userInfo, service, respondSuccess])

   //To add my services markers to the map
   const [markers, setMarkers] = useState([])

   useEffect(() => {
      let newMarkers = profile.services.map((x) => x.service)
      setMarkers([...new Set([...listMarkers, ...newMarkers])])
   }, [listMarkers])

   const handleClickService = (service) => {
      setSelectedService(service)
      // console.log(service)
      setMapCenter({
         lat: parseFloat(service.lat),
         lng: parseFloat(service.lng),
      })
   }

   const handleTeamRequest = (accept, service, position) => {
      dispatch(handleInviteToTeam({ accept, service, position }))
   }

   return loading ? (
      <Loader animation='border' />
   ) : error ? (
      <Alert variant='danger'>{error}</Alert>
   ) : (
      <Row>
         {respondError && <Alert variant='danger'>{respondError}</Alert>}
         <Col xs={5}>
            <Card className='p-3 mb-3'>
               <h1 className='mb-0'>{`${profile.name} ${profile.familyName}`}</h1>
               <p style={{ color: 'gray' }}>{profile.username}</p>
               {profile.bio && <p>{profile.bio}</p>}
               <Button
                  variant='info'
                  onClick={(_) => history.push('editar-perfil')}
               >
                  Editar perfil
               </Button>
               <Row>
                  {profile.friends.length === 0 && (
                     <Col>
                        <p>{`Amigos: ${profile.friends.length}`}</p>
                     </Col>
                  )}
               </Row>
            </Card>
            {profile.teamRequest.length > 0 && (
               <Card className='p-3 my-3'>
                  <h3 className='mb-2'>Invitaciones</h3>
                  <ListGroup variant='flush'>
                     {profile.teamRequest.map((request) => (
                        <ListGroup.Item>
                           <p>
                              <strong>{request.position}</strong>
                              {` in ${request.service.name}`}
                           </p>
                           {respondLoading ? (
                              <Spinner animation='border' size='sm' />
                           ) : (
                              <div className='d-flex justify-content-start'>
                                 <Button
                                    size='sm'
                                    variant='light'
                                    onClick={(_) =>
                                       handleTeamRequest(
                                          true,
                                          request.service._id,
                                          request.position
                                       )
                                    }
                                 >
                                    <i
                                       className='fas fa-check-circle'
                                       style={{ color: 'green' }}
                                    ></i>
                                 </Button>
                                 <Button
                                    size='sm'
                                    variant='light'
                                    onClick={(_) =>
                                       handleTeamRequest(
                                          false,
                                          request.service._id,
                                          request.position
                                       )
                                    }
                                 >
                                    <i
                                       className='fas fa-times-circle'
                                       style={{ color: 'red' }}
                                    ></i>
                                 </Button>
                              </div>
                           )}
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               </Card>
            )}
            {profile.services.length > 0 && (
               <Card className='p-3 my-3'>
                  <h3 className='mb-2'>Servicios</h3>
                  <ListGroup variant='flush'>
                     {profile.services.map((service) => (
                        <ListGroup.Item
                           action
                           key={service.service._id}
                           onClick={(_) => handleClickService(service.service)}
                        >
                           <p className='m-0' style={{ fontWeight: 600 }}>
                              {service.service.name}
                           </p>
                           <p className='m-0'>{service.position}</p>
                           {service.service.categories.map((category) => (
                              <p
                                 style={{
                                    display: 'inline-block',
                                    color: 'gray',
                                 }}
                                 key={category}
                              >{`${category}--`}</p>
                           ))}
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               </Card>
            )}
            <ServicesListFilter
               setSelectedService={setSelectedService}
               setMapCenter={setMapCenter}
               setValue={setValue}
               value={value}
               filteredServices={filteredServices}
            />
         </Col>
         <Col>
            <ServiceDisplay
               mapCenter={mapCenter}
               markers={markers}
               selectedService={selectedService}
               history={history}
               match={match}
            />
         </Col>
      </Row>
   )
}

export default UserProfileScreen
