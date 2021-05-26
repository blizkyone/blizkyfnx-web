import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'

const ServiceInfo = ({ selectedService }) => {
   // console.log(selectedService)
   return (
      <Col>
         <Row>
            <Col>
               <h1>{selectedService.name}</h1>
            </Col>
            <Col xs='auto'>
               <Button>Recomendar</Button>
            </Col>
         </Row>
         {selectedService.categories.map((category) => (
            <p
               style={{ display: 'inline-block', color: 'gray' }}
               key={category}
            >{`${category}--`}</p>
         ))}
         <p>{selectedService.description}</p>

         <p className='mb-1' style={{ fontWeight: 800 }}>
            Equipo:
         </p>
         <Row>
            {selectedService.team.map((user) => (
               <Col
                  sm={5}
                  className='m-1 d-flex flex-row justify-content-between align-items-center'
                  key={user._id}
               >
                  <div>
                     <p className='m-1'>{`${user.position}:`}</p>
                     <p className='m-1' style={{ color: 'blue' }}>
                        {`${user.user.name} ${user.user.familyName}`}
                     </p>
                  </div>
                  <Button size='sm'>Seguir</Button>
               </Col>
            ))}
         </Row>
         <Row>
            <p className='mb-1' style={{ fontWeight: 800 }}>
               Telefonos:
            </p>
            {selectedService.phoneArray.map((phone) => (
               <Col sm={3} className='m-1' key={phone._id}>
                  <p className='m-1'>{`${phone.label}:`}</p>
                  <p className='m-1' style={{ color: 'blue' }}>
                     {phone.phone}
                  </p>
               </Col>
            ))}
         </Row>
         <div className='my-3'>
            {selectedService.instagram && (
               <div>
                  <p className='my-1' style={{ display: 'inline-block' }}>
                     <i className='fab fa-instagram'></i>
                     Instagram
                  </p>
                  <p
                     className='my-1'
                     style={{ display: 'inline-block', fontWeight: 600 }}
                  >{`:  @${selectedService.instagram}`}</p>
               </div>
            )}
            {selectedService.webpage && (
               <div>
                  <p className='my-1' style={{ display: 'inline-block' }}>
                     <i className='fas fa-globe-americas'></i>
                     Webpage
                  </p>
                  <p
                     className='my-1'
                     style={{ display: 'inline-block', fontWeight: 600 }}
                  >{`:  ${selectedService.webpage}`}</p>
               </div>
            )}
         </div>
      </Col>
   )
}

export default ServiceInfo
