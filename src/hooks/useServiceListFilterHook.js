import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getServiceList } from '../actions/serviceActions'

const useServiceListFilterHook = (value = '', recommended = false) => {
   const [filteredServices, setFilteredServices] = useState([])
   const [markers, setMarkers] = useState([])

   const [servicesArray, setServicesArray] = useState([])
   const [categoriesArray, setCategoriesArray] = useState([])

   const dispatch = useDispatch()

   const { userInfo } = useSelector((state) => state.userLogin)

   const { services, categories, loading, error } = useSelector(
      (state) => state.serviceList
   )

   const { service } = useSelector((state) => state.serviceRecommend)

   useEffect(() => {
      dispatch(getServiceList())
   }, [dispatch, userInfo, service])

   useEffect(() => {
      if (userInfo && recommended) {
         const recoServices = services.filter(
            (x) => x.teamFollowing.length > 0 || x.recosFollowing.length > 0
         )
         let recoCategories = []
         recoServices.forEach((x) => {
            recoCategories = recoCategories.concat(x.categories)
         })
         recoCategories = [...new Set(recoCategories)]
         setServicesArray(recoServices)
         setCategoriesArray(recoCategories)
      } else {
         setServicesArray(services)
         setCategoriesArray(categories)
      }
   }, [services, categories, recommended])

   useEffect(() => {
      let arr = []
      let markerArr = []

      if (value === '') {
         categoriesArray.forEach((category) => {
            const serv = servicesArray.filter((ser) =>
               ser.categories.includes(category)
            )
            arr.push({ category, serv })
         })

         setFilteredServices(arr)
         setMarkers(servicesArray.filter((item) => !!item.lat))
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

         const filteredSer = filterServices(servicesArray, value)
         const negFilteredCat = antiFilterItems(categoriesArray, value)
         const filteredCat = filterItems(categoriesArray, value)

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
            const serv = servicesArray.filter((ser) =>
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
   }, [value, servicesArray, categoriesArray])

   return { filteredServices, markers, loading, error }
}

export default useServiceListFilterHook
