import {
   GET_NOTIFICATIONS_REQUEST,
   GET_NOTIFICATIONS_SUCCESS,
   GET_NOTIFICATIONS_FAIL,
   IF_NOTIFICATIONS_REQUEST,
   IF_NOTIFICATIONS_SUCCESS,
   IF_NOTIFICATIONS_FAIL,
   SEE_NOTIFICATIONS_REQUEST,
   SEE_NOTIFICATIONS_SUCCESS,
   SEE_NOTIFICATIONS_FAIL,
} from '../constants/notificationsConstants'
import axios from 'axios'

export const seeNotifications = () => async (dispatch, getState) => {
   try {
      dispatch({ type: SEE_NOTIFICATIONS_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(
         `${process.env.REACT_APP_API_URL}/notifications/pending`,
         {},
         config
      )

      dispatch({
         type: SEE_NOTIFICATIONS_SUCCESS,
      })
   } catch (error) {
      dispatch({
         type: SEE_NOTIFICATIONS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getNotifications = () => async (dispatch, getState) => {
   try {
      dispatch({ type: GET_NOTIFICATIONS_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/notifications`,
         config
      )

      dispatch({
         type: GET_NOTIFICATIONS_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: GET_NOTIFICATIONS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const ifPendingNotifications = () => async (dispatch, getState) => {
   try {
      dispatch({ type: IF_NOTIFICATIONS_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/notifications/pending`,
         config
      )

      dispatch({
         type: IF_NOTIFICATIONS_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: IF_NOTIFICATIONS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
