import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getServiceList } from '../actions/serviceActions'

const useServiceListFilterHook = (value = '') => {
   const [filteredServices, setFilteredServices] = useState([])
   const [markers, setMarkers] = useState([])

   const dispatch = useDispatch()

   const { services, categories, loading, error } = useSelector(
      (state) => state.serviceList
   )

   useEffect(() => {
      dispatch(getServiceList())
   }, [])

   useEffect(() => {
      let arr = []
      let markerArr = []

      if (value === '') {
         categories.forEach((category) => {
            const serv = services.filter((ser) =>
               ser.categories.includes(category)
            )
            arr.push({ category, serv })
         })

         setFilteredServices(arr)
         setMarkers(services.filter((item) => !!item.lat))
      } else {
         const filterServices = (arr, query) => {
            return arr.filter(
               (el) => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
            )
         }

         const filterItems = (arr, query) => {
            return arr.filter(
               (el) => el.toLowerCase().indexOf(query.toLowerCase()) !== -1
            )
         }

         const antiFilterItems = (arr, query) => {
            return arr.filter(
               (el) => el.toLowerCase().indexOf(query.toLowerCase()) === -1
            )
         }

         const filteredSer = filterServices(services, value)
         const negFilteredCat = antiFilterItems(categories, value)
         const filteredCat = filterItems(categories, value)

         negFilteredCat.forEach((category) => {
            const serv = filteredSer.filter((ser) =>
               ser.categories.includes(category)
            )
            if (serv.length !== 0) {
               arr.push({ category, serv })
            }
            serv.forEach((ser) => {
               if (ser.lat) {
                  markerArr.push(ser)
               }
            })
         })

         filteredCat.forEach((category) => {
            const serv = services.filter((ser) =>
               ser.categories.includes(category)
            )
            if (serv.length !== 0) {
               arr.push({ category, serv })
            }
            serv.forEach((ser) => {
               if (ser.lat) {
                  markerArr.push(ser)
               }
            })
         })

         arr.sort((a, b) => (a.category > b.category ? 1 : -1))

         setFilteredServices(arr)
         setMarkers([...new Set(markerArr)])
      }
   }, [value, services, categories])

   return { filteredServices, markers, loading, error }
}

export default useServiceListFilterHook
