import React, { useState, useEffect } from 'react'
import ServicesListFilter from '../components/myProfileScreen/ServicesListFilter'
import ServiceDisplay from '../components/myProfileScreen/ServiceDisplay'
import useCrazyShit from '../hooks/useCrazyShit'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import { Alert, Row, Col, Card, ListGroup } from 'react-bootstrap'
import { getMyProfile } from '../actions/userActions'
import { USER_MY_PROFILE_RESET } from '../constants/userConstants'

const UserProfileScreen = () => {
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

   // console.log(profile.services)

   const { filteredServices, markers: listMarkers } = useCrazyShit(
      value,
      profile.recoServices,
      recoCategories
   )

   useEffect(() => {
      dispatch(getMyProfile())
      return () => {
         dispatch({ type: USER_MY_PROFILE_RESET })
      }
   }, [dispatch, userInfo])

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

   return loading ? (
      <Loader animation='border' />
   ) : error ? (
      <Alert variant='danger'>{error}</Alert>
   ) : (
      <Row>
         <Col xs={5}>
            <Card className='p-3 mb-3'>
               <h1>{`${profile.name} ${profile.familyName}`}</h1>
               <p style={{ color: 'gray' }}>{profile.username}</p>
               <Row>
                  {profile.friends.length === 0 && (
                     <Col>
                        <p>{`Amigos: ${profile.friends.length}`}</p>
                     </Col>
                  )}
                  <Col></Col>
               </Row>
            </Card>
            {profile.services.length > 0 && (
               <Card className='p-3 my-3'>
                  <h3 className='mb-2'>Servicios</h3>
                  <ListGroup variant='flush'>
                     {profile.services.map((service) => (
                        <ListGroup.Item
                           action
                           key={service._id}
                           onClick={(_) => handleClickService(service.service)}
                        >
                           <p className='m-0' style={{ fontWeight: 600 }}>
                              {service.service.name}
                           </p>
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
            />
         </Col>
      </Row>
   )
}

export default UserProfileScreen
