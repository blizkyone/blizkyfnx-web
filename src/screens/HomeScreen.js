import React, { useState, useEffect } from 'react'
import ServicesListFilter from '../components/homeScreen/ServicesListFilter'
import ServiceDisplay from '../components/homeScreen/ServiceDisplay'
import useServiceListFilterHook from '../hooks/useServiceListFilterHook'
import Loader from '../components/Loader'
import { Alert, Row, Col } from 'react-bootstrap'

const HomeScreen = ({ history, match }) => {
   const [mapCenter, setMapCenter] = useState({
      lat: 20.9670154,
      lng: -89.6242833,
   })
   //21.019529211939734, -89.61642142241317
   //21.036725153765357, -89.59349554287293
   //21.0020474837025, -89.61022170400815
   const [selectedService, setSelectedService] = useState()
   const [value, setValue] = useState('')
   const [recomendados, setRecomendados] = useState(false)

   const { filteredServices, markers, loading, error } =
      useServiceListFilterHook(value, recomendados)

   return loading ? (
      <Loader animation='border' />
   ) : error ? (
      <Alert variant='danger'>{error}</Alert>
   ) : (
      <Row>
         <Col xs={5}>
            <ServicesListFilter
               setSelectedService={setSelectedService}
               setMapCenter={setMapCenter}
               setValue={setValue}
               value={value}
               filteredServices={filteredServices}
               recomendados={recomendados}
               setRecomendados={setRecomendados}
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

export default HomeScreen
