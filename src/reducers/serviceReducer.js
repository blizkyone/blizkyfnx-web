import {
   SERVICE_LIST_REQUEST,
   SERVICE_LIST_SUCCESS,
   SERVICE_LIST_FAIL,
   SERVICE_LIST_RESET,
} from '../constants/serviceConstants'

export const serviceListReducer = (
   state = { services: [], categories: [] },
   action
) => {
   switch (action.type) {
      case SERVICE_LIST_REQUEST:
         return { ...state, loading: true }
      case SERVICE_LIST_SUCCESS:
         const { services, categories } = action.payload
         return { loading: false, services, categories }
      case SERVICE_LIST_FAIL:
         return { ...state, loading: false, error: action.payload }
      case SERVICE_LIST_RESET:
         return { services: [], categories: [] }
      default:
         return state
   }
}
