import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import SetLocationScreen from '../components/serviceCreateScreen/SetLocationScreen'
import SetCategoryScreen from '../components/serviceCreateScreen/SetCategoryScreen'
import SetInfoScreen from '../components/serviceCreateScreen/SetInfoScreen'
import { SERVICE_CREATE_RESET } from '../constants/serviceConstants'

const ServiceCreateScreen = ({ history }) => {
   const [serviceInfo, setServiceInfo] = useState({})
   const [stage, setStage] = useState(0)

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch({ type: SERVICE_CREATE_RESET })
   }, [])

   const props = { setStage, setServiceInfo }

   const showStage = (stage) => {
      switch (stage) {
         case 0:
            return <SetLocationScreen {...props} />
         case 1:
            return <SetCategoryScreen {...props} />
         case 2:
            return (
               <SetInfoScreen
                  {...props}
                  serviceInfo={serviceInfo}
                  history={history}
               />
            )
         default:
            return <p>No stage selected</p>
      }
   }

   return <FormContainer>{showStage(stage)}</FormContainer>
}

export default ServiceCreateScreen
