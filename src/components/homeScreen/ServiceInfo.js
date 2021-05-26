import React from 'react'
import { Col } from 'react-bootstrap'

const ServiceInfo = ({ selectedService }) => {
   console.log(selectedService)
   return (
      <Col>
         <h1>{selectedService.name}</h1>
         {selectedService.categories.map((category) => (
            <p
               style={{ display: 'inline-block', color: 'gray' }}
            >{`${category}--`}</p>
         ))}
         <p>{selectedService.description}</p>
         <div>
            <p className='mb-1' style={{ fontWeight: 800 }}>
               Telefonos:
            </p>
            {selectedService.phoneArray.map((phone) => (
               <p>{`${phone.label}: ${phone.phone}`}</p>
            ))}
         </div>
         <div className='my-3'>
            {selectedService.instagram && (
               <p className='my-1'>
                  <i className='fab fa-instagram'></i>
                  {`instagram: @${selectedService.instagram}`}
               </p>
            )}
            {selectedService.webpage && (
               <p className='my-1'>
                  <i className='fas fa-globe-americas'></i>
                  {`webpage: ${selectedService.webpage}`}
               </p>
            )}
         </div>
      </Col>
   )
}

export default ServiceInfo
