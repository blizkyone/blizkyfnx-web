import axios from 'axios'
import {
   USER_MY_PROFILE_FAIL,
   USER_MY_PROFILE_REQUEST,
   USER_MY_PROFILE_SUCCESS,
   USER_MY_PROFILE_RESET,
   USER_PROFILE_FAIL,
   USER_PROFILE_REQUEST,
   USER_PROFILE_SUCCESS,
   // USER_PROFILE_RESET,
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGOUT,
   USER_LOGOUT_FAIL,
   USER_LOGOUT_REQUEST,
   USER_LOGOUT_SUCCESS,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_UPDATE_PROFILE_FAIL,
   USER_UPDATE_PROFILE_REQUEST,
   USER_UPDATE_PROFILE_SUCCESS,
   USER_LIST_FAIL,
   USER_LIST_SUCCESS,
   USER_LIST_REQUEST,
   USER_LIST_RESET,
   USER_DELETE_REQUEST,
   USER_DELETE_SUCCESS,
   USER_DELETE_FAIL,
   USER_UPDATE_FAIL,
   USER_UPDATE_SUCCESS,
   USER_UPDATE_REQUEST,
   USERNAME_VALIDATION_REQUEST,
   USERNAME_VALIDATION_SUCCESS,
   USERNAME_VALIDATION_FAIL,
   USER_CONNECT_FAIL,
   USER_CONNECT_SUCCESS,
   USER_CONNECT_REQUEST,
   USER_INVITE_TO_TEAM_FAIL,
   USER_INVITE_TO_TEAM_REQUEST,
   USER_INVITE_TO_TEAM_SUCCESS,
   USER_RESPOND_INVITE_TO_TEAM_FAIL,
   USER_RESPOND_INVITE_TO_TEAM_REQUEST,
   USER_RESPOND_INVITE_TO_TEAM_SUCCESS,
} from '../constants/userConstants'

export const handleInviteToTeam =
   ({ accept, service, position }) =>
   async (dispatch, getState) => {
      try {
         dispatch({
            type: USER_RESPOND_INVITE_TO_TEAM_REQUEST,
         })

         const {
            userLogin: { userInfo },
         } = getState()

         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
               'Content-Type': 'application/json',
            },
         }

         await axios.post(
            `${process.env.REACT_APP_API_URL}/users/${service}/handle-invite-to-team`,
            { accept, position },
            config
         )

         dispatch({
            type: USER_RESPOND_INVITE_TO_TEAM_SUCCESS,
         })
      } catch (error) {
         dispatch({
            type: USER_RESPOND_INVITE_TO_TEAM_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         })
      }
   }

export const inviteUserToTeam =
   ({ user, service, position }) =>
   async (dispatch, getState) => {
      try {
         dispatch({
            type: USER_INVITE_TO_TEAM_REQUEST,
         })

         const {
            userLogin: { userInfo },
         } = getState()

         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
               'Content-Type': 'application/json',
            },
         }

         const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/users/${user}/invite-to-team`,
            { service, position },
            config
         )

         dispatch({
            type: USER_INVITE_TO_TEAM_SUCCESS,
         })
      } catch (error) {
         dispatch({
            type: USER_INVITE_TO_TEAM_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         })
      }
   }

export const connectWith =
   (id, reject = undefined) =>
   async (dispatch, getState) => {
      try {
         dispatch({
            type: USER_CONNECT_REQUEST,
         })

         const {
            userLogin: { userInfo },
         } = getState()

         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
               'Content-Type': 'application/json',
            },
         }

         const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/users/${id}/connect`,
            { reject },
            config
         )

         dispatch({
            type: USER_CONNECT_SUCCESS,
         })
      } catch (error) {
         dispatch({
            type: USER_CONNECT_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         })
      }
   }

export const login = (email, password) => async (dispatch) => {
   try {
      dispatch({
         type: USER_LOGIN_REQUEST,
      })

      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      }

      const { data } = await axios.post(
         `${process.env.REACT_APP_API_URL}/users/login`,
         { email, password },
         config
      )

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
   } catch (error) {
      dispatch({
         type: USER_LOGIN_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const logout = () => async (dispatch, getState) => {
   try {
      dispatch({ type: USER_LOGOUT_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/users/logout`,
         config
      )

      dispatch({ type: USER_LOGOUT_SUCCESS, payload: data })

      localStorage.removeItem('userInfo')
      dispatch({ type: USER_LOGOUT })
      dispatch({ type: USER_MY_PROFILE_RESET })
      // dispatch({ type: ORDER_LIST_MY_RESET })
      dispatch({ type: USER_LIST_RESET })
      document.location.href = '/'
   } catch (error) {
      dispatch({
         type: USER_LOGOUT_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })

      localStorage.removeItem('userInfo')
      dispatch({ type: USER_LOGOUT })
      dispatch({ type: USER_MY_PROFILE_RESET })
      // dispatch({ type: ORDER_LIST_MY_RESET })
      dispatch({ type: USER_LIST_RESET })
      document.location.href = '/login'
   }
}

export const validateUsername = (username) => async (dispatch) => {
   try {
      dispatch({
         type: USERNAME_VALIDATION_REQUEST,
      })

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/users/validateUsername?username=${username}`
      )

      dispatch({
         type: USERNAME_VALIDATION_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: USERNAME_VALIDATION_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const register = (postData) => async (dispatch) => {
   try {
      dispatch({
         type: USER_REGISTER_REQUEST,
      })

      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      }
      // console.log(postData)
      const { data } = await axios.post(
         `${process.env.REACT_APP_API_URL}/users`,
         postData,
         config
      )

      dispatch({
         type: USER_REGISTER_SUCCESS,
         payload: data,
      })

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
   } catch (error) {
      dispatch({
         type: USER_REGISTER_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getUserProfile = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_PROFILE_REQUEST,
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
         `${process.env.REACT_APP_API_URL}/users/${id}`,
         config
      )

      dispatch({
         type: USER_PROFILE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      // if (message === 'Not authorized, token failed') {
      //    dispatch(logout())
      // }
      dispatch({
         type: USER_PROFILE_FAIL,
         payload: message,
      })
   }
}

export const getMyProfile = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_MY_PROFILE_REQUEST,
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
         `${process.env.REACT_APP_API_URL}/users/`,
         config
      )

      dispatch({
         type: USER_MY_PROFILE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: USER_MY_PROFILE_FAIL,
         payload: message,
      })
   }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
   try {
      console.log('here')
      dispatch({
         type: USER_UPDATE_PROFILE_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(
         `${process.env.REACT_APP_API_URL}/users/profile`,
         user,
         config
      )

      dispatch({
         type: USER_UPDATE_PROFILE_SUCCESS,
         payload: data,
      })
      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: { ...data, token: userInfo.token },
      })
      localStorage.setItem(
         'userInfo',
         JSON.stringify({ ...data, token: userInfo.token })
      )
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: USER_UPDATE_PROFILE_FAIL,
         payload: message,
      })
   }
}

export const listUsers = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_LIST_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(`/api/users`, config)

      dispatch({
         type: USER_LIST_SUCCESS,
         payload: data,
      })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: USER_LIST_FAIL,
         payload: message,
      })
   }
}

export const deleteUser = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_DELETE_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.delete(`/api/users/${id}`, config)

      dispatch({ type: USER_DELETE_SUCCESS })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: USER_DELETE_FAIL,
         payload: message,
      })
   }
}

export const updateUser = (user) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_UPDATE_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(`/api/users/${user._id}`, user, config)

      dispatch({ type: USER_UPDATE_SUCCESS })

      dispatch({ type: USER_MY_PROFILE_SUCCESS, payload: data })

      dispatch({ type: USER_MY_PROFILE_RESET })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: USER_UPDATE_FAIL,
         payload: message,
      })
   }
}
