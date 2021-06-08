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

export const notificationsIfPendingReducer = (
   state = { places: [] },
   action
) => {
   switch (action.type) {
      case IF_NOTIFICATIONS_REQUEST:
         return { loading: true }
      case IF_NOTIFICATIONS_SUCCESS:
         return { loading: false, pending: action.payload }
      case IF_NOTIFICATIONS_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const notificationsMarkAsSeenReducer = (state = {}, action) => {
   switch (action.type) {
      case SEE_NOTIFICATIONS_REQUEST:
         return { loading: true }
      case SEE_NOTIFICATIONS_SUCCESS:
         return { loading: false, success: true }
      case SEE_NOTIFICATIONS_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const notificationsGetListReducer = (
   state = { notifications: [] },
   action
) => {
   switch (action.type) {
      case GET_NOTIFICATIONS_REQUEST:
         return { ...state, loading: true }
      case GET_NOTIFICATIONS_SUCCESS:
         return { loading: false, notifications: action.payload }
      case GET_NOTIFICATIONS_FAIL:
         return { ...state, loading: false, error: action.payload }
      default:
         return state
   }
}
