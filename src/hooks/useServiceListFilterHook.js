import { useEffect, useState } from 'react'

const useServiceListFilterHook = (
   serviceList = [],
   categoryList = [],
   value = ''
) => {
   const [filteredServices, setFilteredServices] = useState([])
   const [markers, setMarkers] = useState([])

   useEffect(() => {
      let arr = []
      let markerArr = []

      if (value === '') {
         categoryList.forEach((category) => {
            const serv = serviceList.filter((ser) =>
               ser.category.includes(category)
            )
            arr.push({ category, serv })
         })

         setFilteredServices(arr)
         setMarkers(serviceList.filter((item) => !!item.lat))
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

         const filteredSer = filterServices(serviceList, value)
         const negFilteredCat = antiFilterItems(categoryList, value)
         const filteredCat = filterItems(categoryList, value)

         negFilteredCat.forEach((category) => {
            const serv = filteredSer.filter((ser) =>
               ser.category.includes(category)
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
            const serv = serviceList.filter((ser) =>
               ser.category.includes(category)
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
   }, [value])

   return { filteredServices, markers }
}

export default useServiceListFilterHook
