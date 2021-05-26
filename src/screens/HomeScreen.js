import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ServicesListFilter from '../components/homeScreen/ServicesListFilter'
import useServiceListFilterHook from '../hooks/useServiceListFilterHook'
import { getServiceList } from '../actions/serviceActions'

import { Spinner, Alert, Row, Col } from 'react-bootstrap'

const HomeScreen = () => {
   const [mapCenter, setMapCenter] = useState()
   const [selectedService, setSelectedService] = useState()
   const [value, setValue] = useState('')

   const dispatch = useDispatch()

   const { services, categories, loading, error } = useSelector(
      (state) => state.serviceList
   )

   const { filteredServices, markers } = useServiceListFilterHook(
      services,
      categories,
      value
   )

   useEffect(() => {
      dispatch(getServiceList())
   }, [dispatch])

   return loading ? (
      <Spinner animation='border' />
   ) : error ? (
      <Alert variant='danger'>{error}</Alert>
   ) : (
      <Row>
         <Col>
            <ServicesListFilter
            //    setSelectedService={setSelectedService}
            //    setMapCenter={setMapCenter}
            />
         </Col>
         <Col>MAP</Col>
      </Row>
   )
}

export default HomeScreen
