import React from 'react'
import { Row, Card } from 'react-bootstrap'
import DirectoryMap from './DirectoryMap'
import ServiceInfo from '../ServiceInfo'

const ServiceDisplay = ({
   mapCenter,
   markers,
   selectedService,
   history,
   match,
}) => {
   return (
      <>
         {selectedService && (
            <Row>
               <Card className='p-3'>
                  <ServiceInfo
                     selectedService={selectedService}
                     history={history}
                  />
               </Card>
            </Row>
         )}
         <Row style={{ height: '400px' }}>
            <DirectoryMap mapCenter={mapCenter} markers={markers} />
         </Row>
      </>
   )
}

export default ServiceDisplay
