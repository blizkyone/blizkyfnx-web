import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { useDispatch, useSelector } from 'react-redux'
// import MapSearchBar from '../MapSearchBar'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { Form, Button, Card, Spinner } from 'react-bootstrap'
import { getAddress } from '../actions/placesActions.js'
import { editServiceProfile } from '../actions/serviceActions.js'
import { SERVICE_EDIT_PROFILE_RESET } from '../constants/serviceConstants'

const ServiceEditLocationScreen = ({ history }) => {
   const { serviceInfo } = history.location.state

   const [mapCenter, setMapCenter] = useState({
      lat: 20.9670154,
      lng: -89.6242833,
   })
   const [address, setAddress] = useState()
   const [marker, setMarker] = useState()

   const dispatch = useDispatch()

   // Fancy places search bar for map
   //   const [query, setQuery] = useState('')
   //    let places = []
   //    let placesLoading = false

   //    const handleSelectPlace = () => {
   //       return
   //    }

   //    const handleSearch = () => {
   //       return
   //    }

   const placeAddress = useSelector((state) => state.placeAddress)
   const {
      loading,
      error: placeAddressError,
      address: googleAddress,
   } = placeAddress

   const {
      loading: saveLoading,
      error: saveError,
      service,
   } = useSelector((state) => state.serviceEditProfile)

   useEffect(() => {
      dispatch({ type: SERVICE_EDIT_PROFILE_RESET })
      return () => dispatch({ type: SERVICE_EDIT_PROFILE_RESET })
   }, [])

   useEffect(() => {
      if (service) history.goBack()
   }, [service])

   useEffect(() => {
      setAddress(googleAddress)
   }, [googleAddress])

   const handleClickOnMap = ({ lat, lng }) => {
      dispatch(getAddress(lat, lng))
      setMarker({ lat, lng })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      if (marker && address) {
         dispatch(
            editServiceProfile(
               {
                  lat: marker.lat,
                  lng: marker.lng,
                  address: {
                     street_address: address,
                     city: 'Merida',
                     state: 'Yucatan',
                     country: 'Mexico',
                  },
               },
               serviceInfo._id
            )
         )
      }
   }

   return (
      <FormContainer>
         <h4>Edita la ubicacion de tu negocio</h4>
         {placeAddressError && (
            <Message variant='danger'>{placeAddressError}</Message>
         )}
         {saveError && <Message variant='danger'>{saveError}</Message>}
         <Card style={{ height: '80vh' }}>
            <GoogleMapReact
               bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
               onClick={handleClickOnMap}
               center={mapCenter}
               defaultZoom={12}
            >
               {marker && (
                  <i
                     lat={marker.lat}
                     lng={marker.lng}
                     style={{
                        fontSize: '2rem',
                        color: 'red',
                        transform: 'translate(-50%,-100%)',
                     }}
                     className='fas fa-map-marker-alt'
                  ></i>
               )}
            </GoogleMapReact>
            {/* <MapSearchBar
               query={query}
               setQuery={setQuery}
               places={places}
               handleSelectPlace={handleSelectPlace}
               placesLoading={placesLoading}
               handleSearch={handleSearch}
            /> */}
         </Card>
         <Form onSubmit={handleSubmit}>
            <Form.Group controlId='coordinates'>
               <Form.Label>Coordenadas</Form.Label>
               <Form.Control
                  required
                  readOnly
                  type='address'
                  placeholder='Seleccione ubicación en el mapa'
                  value={
                     marker
                        ? `lat: ${marker.lat}, lng: ${marker.lng}`
                        : 'Haz click en el mapa en la ubicacion de tu negocio'
                  }
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
               <Form.Label>Dirección</Form.Label>
               <Form.Control
                  required
                  as='textarea'
                  placeholder='Elige la ubicación en el mapa y edita la dirección'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
               ></Form.Control>
               <Form.Control.Feedback type='invalid'>
                  Requerido
               </Form.Control.Feedback>
            </Form.Group>
            {marker && (
               <Button className='m-3' type='submit'>
                  {saveLoading ? (
                     <Spinner animation='border' size='sm' />
                  ) : (
                     'Guardar Cambios'
                  )}
               </Button>
            )}
            <Button
               className='m-3'
               onClick={(_) => history.goBack()}
               variant='danger'
            >
               Cancelar
            </Button>
         </Form>
      </FormContainer>
   )
}

export default ServiceEditLocationScreen
