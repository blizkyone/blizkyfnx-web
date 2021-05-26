import React from 'react'
import { Row } from 'react-bootstrap'
import DirectoryMap from './DirectoryMap'
import ServiceInfo from './ServiceInfo'

const ServiceDisplay = ({ mapCenter, markers, selectedService }) => {
   return (
      <>
         {selectedService && (
            <Row>
               <ServiceInfo selectedService={selectedService} />
            </Row>
         )}
         <Row style={{ height: '400px' }}>
            <DirectoryMap mapCenter={mapCenter} markers={markers} />
         </Row>
      </>
   )
}

export default ServiceDisplay
