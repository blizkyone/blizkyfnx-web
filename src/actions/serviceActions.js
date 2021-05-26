import {
   SERVICE_LIST_REQUEST,
   SERVICE_LIST_SUCCESS,
   SERVICE_LIST_FAIL,
   SERVICE_LIST_RESET,
} from '../constants/serviceConstants'
import axios from 'axios'

export const getServiceList = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: SERVICE_LIST_REQUEST,
      })

      const {
         userLogin: { userInfo },
         searchLocation: { country, city, region },
      } = getState()

      // const config =
      //    userInfo && userInfo.token
      //       ? {
      //            headers: {
      //               Authorization: `Bearer ${userInfo.token}`,
      //            },
      //         }
      //       : {
      //            headers: {},
      //         }

      const config = { headers: {} }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/services/?country=${country}&city=${city}&state=${region}`,
         config
      )

      dispatch({
         type: SERVICE_LIST_SUCCESS,
         payload: data,
      })
   } catch (error) {
      console.log(error)
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (
         message === 'Not authorized, token failed' ||
         message === 'User not found'
      ) {
         console.log('logout')
         // dispatch(logout())
      }
      dispatch({
         type: SERVICE_LIST_FAIL,
         payload: message,
      })
   }
}
