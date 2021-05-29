import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import SetLocationScreen from '../components/serviceCreateScreen/SetLocationScreen'

const ServiceCreateScreen = () => {
   const [serviceInfo, setServiceInfo] = useState({})
   const [stage, setStage] = useState(0)

   const showStage = (stage) => {
      switch (stage) {
         case 0:
            return <SetLocationScreen />
         default:
            return <p>No stage selected</p>
      }
   }

   return <FormContainer>{showStage(stage)}</FormContainer>
}

export default ServiceCreateScreen
