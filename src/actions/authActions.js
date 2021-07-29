import {
   GOOGLE_AUTH_REQUEST,
   GOOGLE_AUTH_SUCCESS,
   GOOGLE_AUTH_FAIL,
} from '../constants/authConstants'
import axios from 'axios'

export const googleAuth = () => async (dispatch) => {
   try {
      dispatch({ type: GOOGLE_AUTH_REQUEST })

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/auth/google`
      )

      dispatch({
         type: GOOGLE_AUTH_SUCCESS,
      })
   } catch (error) {
      dispatch({
         type: GOOGLE_AUTH_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
