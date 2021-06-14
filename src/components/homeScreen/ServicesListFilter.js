import React from 'react'
import { useSelector } from 'react-redux'
import { Form, ListGroup, Row, Col } from 'react-bootstrap'

const ServicesListFilter = ({
   filteredServices,
   setSelectedService,
   value,
   setValue,
   setMapCenter,
   recomendados,
   setRecomendados,
}) => {
   const { userInfo } = useSelector((state) => state.userLogin)

   const handleSelectService = (service) => {
      setSelectedService(service)
      setMapCenter({
         lat: parseFloat(service.lat),
         lng: parseFloat(service.lng),
      })
   }

   return (
      <>
         <ListGroup horizontal>
            <ListGroup.Item
               action
               active={!recomendados}
               onClick={(_) => setRecomendados(false)}
            >
               Todos
            </ListGroup.Item>
            <ListGroup.Item
               action
               active={recomendados}
               onClick={(_) => setRecomendados(true)}
            >
               Recomendados
            </ListGroup.Item>
         </ListGroup>
         <Form>
            <Form.Control
               placeholder='busca servicios por nombre o categoria'
               value={value}
               onChange={(e) => setValue(e.target.value)}
               className='my-3'
            />
         </Form>
         {filteredServices.map((group, i) => (
            <ListGroup key={i} as='ul'>
               <ListGroup.Item
                  action
                  as='li'
                  onClick={(_) => setValue(group.category)}
                  style={{ fontWeight: 600 }}
               >
                  {group.category}
               </ListGroup.Item>
               <ListGroup.Item>
                  <ListGroup as='ul' variant='flush'>
                     {group.serv.map((service) => (
                        <ListGroup.Item
                           action
                           as='li'
                           key={service._id}
                           onClick={(_) => handleSelectService(service)}
                        >
                           <p className='mb-0'>{service.name}</p>
                           <Row>
                              <Col>
                                 {service.recos.length > 0 && (
                                    <p
                                       className='m-0 p-0'
                                       style={{ color: 'gray' }}
                                    >{`recos: ${service.recos.length}`}</p>
                                 )}
                              </Col>
                              {userInfo && service.recosFollowing && (
                                 <Col>
                                    {service.recosFollowing.length > 0 && (
                                       <p
                                          className='m-0 p-0'
                                          style={{ color: 'gray' }}
                                       >{`amigos: ${service.recosFollowing.length}`}</p>
                                    )}
                                 </Col>
                              )}
                           </Row>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               </ListGroup.Item>
            </ListGroup>
         ))}
      </>
   )
}

export default ServicesListFilter
