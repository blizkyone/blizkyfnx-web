import React from 'react'
import GoogleMapReact from 'google-map-react'
import PlaceMapIcon from '../PlaceMapIcon'

const DirectoryMap = ({ markers, mapCenter }) => {
   return (
      <GoogleMapReact
         bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
         // defaultCenter={mapCenter}
         center={mapCenter}
         defaultZoom={12}
      >
         {markers.map((marker, i) => (
            <PlaceMapIcon
               key={i}
               lat={parseFloat(marker.lat)}
               lng={parseFloat(marker.lng)}
            />
         ))}
      </GoogleMapReact>
   )
}

export default DirectoryMap
