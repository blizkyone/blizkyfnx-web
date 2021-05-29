import {
   PLACE_AUTOCOMPLETE_REQUEST,
   PLACE_AUTOCOMPLETE_SUCCESS,
   PLACE_AUTOCOMPLETE_FAIL,
   GET_ADDRESS_REQUEST,
   GET_ADDRESS_SUCCESS,
   GET_ADDRESS_FAIL,
} from '../constants/placesConstants'
import axios from 'axios'

export const queryPlaces = (query) => async (dispatch, getState) => {
   try {
      dispatch({ type: PLACE_AUTOCOMPLETE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/places/autocomplete?input=${query}`,
         config
      )

      dispatch({
         type: PLACE_AUTOCOMPLETE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PLACE_AUTOCOMPLETE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getAddress = (lat, lng) => async (dispatch, getState) => {
   try {
      dispatch({ type: GET_ADDRESS_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/places/getAddress?latlng=${lat},${lng}`,
         config
      )

      dispatch({
         type: GET_ADDRESS_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: GET_ADDRESS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
