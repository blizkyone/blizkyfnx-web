import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const SetLocationScreen = () => {
   const [city, setCity] = useState('')
   const [region, setRegion] = useState('')
   const [country, setCountry] = useState('')

   return (
      <FormContainer>
         <Form>
            <Form.Group controlId='password'>
               <Form.Label>Ciudad</Form.Label>
               <Form.Control
                  type='text'
                  placeholder='Ciudad'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
               ></Form.Control>
            </Form.Group>
         </Form>
      </FormContainer>
   )
}

export default SetLocationScreen
