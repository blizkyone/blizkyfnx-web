import React, { useState } from 'react'
import { Form, ListGroup } from 'react-bootstrap'

const ServicesListFilter = ({
   filteredServices,
   setSelectedService,
   value,
   setValue,
   setMapCenter,
}) => {
   const [recomendados, setRecomendados] = useState(false)

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
                           {service.name}
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
