import {
   SERVICE_LIST_REQUEST,
   SERVICE_LIST_SUCCESS,
   SERVICE_LIST_FAIL,
   SERVICE_LIST_RESET,
   SERVICE_GET_CATEGORIES_REQUEST,
   SERVICE_GET_CATEGORIES_SUCCESS,
   SERVICE_GET_CATEGORIES_FAIL,
   SERVICE_NEW_CATEGORY_REQUEST,
   SERVICE_NEW_CATEGORY_SUCCESS,
   SERVICE_NEW_CATEGORY_FAIL,
   SERVICE_CREATE_REQUEST,
   SERVICE_CREATE_SUCCESS,
   SERVICE_CREATE_FAIL,
   SERVICE_RECOMMEND_REQUEST,
   SERVICE_RECOMMEND_SUCCESS,
   SERVICE_RECOMMEND_FAIL,
   SERVICE_RECOMMEND_RESET,
   SERVICE_PROFILE_REQUEST,
   SERVICE_PROFILE_SUCCESS,
   SERVICE_PROFILE_FAIL,
} from '../constants/serviceConstants'
import axios from 'axios'
import { logout } from '../actions/userActions'

export const getServiceProfile = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: SERVICE_PROFILE_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = userInfo
         ? {
              headers: {
                 Authorization: `Bearer ${userInfo.token}`,
              },
           }
         : {}

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/services/${id}`,
         config
      )

      dispatch({
         type: SERVICE_PROFILE_SUCCESS,
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
         dispatch(logout())
      }
      dispatch({
         type: SERVICE_PROFILE_FAIL,
         payload: message,
      })
   }
}

export const recommendService = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: SERVICE_RECOMMEND_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/services/${id}/recommend`,
         config
      )

      dispatch({
         type: SERVICE_RECOMMEND_SUCCESS,
         payload: data,
      })
      dispatch({
         type: SERVICE_PROFILE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (
         message === 'Not authorized, token failed' ||
         message === 'User not found'
      ) {
         console.log('logout')
         dispatch(logout())
      }
      dispatch({
         type: SERVICE_RECOMMEND_FAIL,
         payload: message,
      })
   }
}

export const createService =
   ({
      name,
      description,
      phoneArray,
      webpage,
      instagram,
      lat,
      lng,
      address,
      categories,
   }) =>
   async (dispatch, getState) => {
      try {
         dispatch({
            type: SERVICE_CREATE_REQUEST,
         })

         const {
            userLogin: { userInfo },
         } = getState()

         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
            },
         }

         const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/services/`,
            {
               name,
               description,
               phoneArray,
               webpage,
               instagram,
               lat,
               lng,
               address,
               categories,
            },
            config
         )

         dispatch({
            type: SERVICE_CREATE_SUCCESS,
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
            dispatch(logout())
         }
         dispatch({
            type: SERVICE_CREATE_FAIL,
            payload: message,
         })
      }
   }

export const createNewCategory =
   (new_category) => async (dispatch, getState) => {
      try {
         dispatch({
            type: SERVICE_NEW_CATEGORY_REQUEST,
         })

         const {
            userLogin: { userInfo },
         } = getState()

         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
            },
         }

         const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/services/categories`,
            { new_category, language: 'ES' },
            config
         )

         dispatch({
            type: SERVICE_NEW_CATEGORY_SUCCESS,
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
            dispatch(logout())
         }
         dispatch({
            type: SERVICE_NEW_CATEGORY_FAIL,
            payload: message,
         })
      }
   }

export const getCategories = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: SERVICE_GET_CATEGORIES_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/services/categories?language=ES`,
         config
      )

      dispatch({
         type: SERVICE_GET_CATEGORIES_SUCCESS,
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
         dispatch(logout())
      }
      dispatch({
         type: SERVICE_GET_CATEGORIES_FAIL,
         payload: message,
      })
   }
}

export const getServiceList = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: SERVICE_LIST_REQUEST,
      })

      const {
         userLogin: { userInfo },
         searchLocation: { country, city, region },
      } = getState()

      const config =
         userInfo && userInfo.token
            ? {
                 headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                 },
              }
            : {
                 headers: {},
              }

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
         dispatch(logout())
      }
      dispatch({
         type: SERVICE_LIST_FAIL,
         payload: message,
      })
   }
}
