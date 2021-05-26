import {
   SET_SEARCH_LOCATION,
   RESET_SEARCH_LOCATION,
} from '../constants/searchConstants'

export const searchLocationReducer = (state = {}, action) => {
   switch (action.type) {
      case RESET_SEARCH_LOCATION:
         return { city: 'Merida', region: 'Yucatan', country: 'Mexico' }
      // case SET_SEARCH_LOCATION:
      //    const { city, region, country } = action.payload
      //    return {
      //       ...state,
      //       city,
      //       region,
      //       country,
      //    }
      default:
         return state
   }
}
