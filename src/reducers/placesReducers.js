import {
   PLACE_AUTOCOMPLETE_REQUEST,
   PLACE_AUTOCOMPLETE_SUCCESS,
   PLACE_AUTOCOMPLETE_FAIL,
   GET_ADDRESS_REQUEST,
   GET_ADDRESS_SUCCESS,
   GET_ADDRESS_FAIL,
} from '../constants/placesConstants'

export const placeAutocompleteReducer = (state = { places: [] }, action) => {
   switch (action.type) {
      case PLACE_AUTOCOMPLETE_REQUEST:
         return { loading: true }
      case PLACE_AUTOCOMPLETE_SUCCESS:
         return { loading: false, places: action.payload }
      case PLACE_AUTOCOMPLETE_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const locationAddressReducer = (state = {}, action) => {
   switch (action.type) {
      case GET_ADDRESS_REQUEST:
         return { loading: true }
      case GET_ADDRESS_SUCCESS:
         return { loading: false, address: action.payload }
      case GET_ADDRESS_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}
