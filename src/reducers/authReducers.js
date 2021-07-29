import {
   GOOGLE_AUTH_REQUEST,
   GOOGLE_AUTH_SUCCESS,
   GOOGLE_AUTH_FAIL,
} from '../constants/authConstants'

export const authGoogleReducer = (state = {}, action) => {
   switch (action.type) {
      case GOOGLE_AUTH_REQUEST:
         return { loading: true }
      case GOOGLE_AUTH_SUCCESS:
         return { loading: false, success: true }
      case GOOGLE_AUTH_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}
