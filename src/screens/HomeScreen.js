import React, { useState, useEffect } from 'react'
import ServicesListFilter from '../components/homeScreen/ServicesListFilter'
import ServiceDisplay from '../components/homeScreen/ServiceDisplay'
import useServiceListFilterHook from '../hooks/useServiceListFilterHook'

import { Spinner, Alert, Row, Col } from 'react-bootstrap'

const HomeScreen = () => {
   const [mapCenter, setMapCenter] = useState({
      lat: 20.9670154,
      lng: -89.6242833,
   })
   //21.019529211939734, -89.61642142241317
   //21.036725153765357, -89.59349554287293
   //21.0020474837025, -89.61022170400815
   const [selectedService, setSelectedService] = useState()
   const [value, setValue] = useState('')

   const { filteredServices, markers, loading, error } =
      useServiceListFilterHook(value)

   // useEffect(() => {
   //    alert(`${mapCenter.lat}`)
   // }, [mapCenter])

   return loading ? (
      <Spinner animation='border' />
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

export default HomeScreen