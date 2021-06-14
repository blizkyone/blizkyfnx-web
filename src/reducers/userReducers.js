import {
   USER_MY_PROFILE_FAIL,
   USER_MY_PROFILE_REQUEST,
   USER_MY_PROFILE_RESET,
   USER_MY_PROFILE_SUCCESS,
   USER_PROFILE_FAIL,
   USER_PROFILE_REQUEST,
   USER_PROFILE_RESET,
   USER_PROFILE_SUCCESS,
   USER_LIST_REQUEST,
   USER_LIST_SUCCESS,
   USER_LIST_FAIL,
   USER_LIST_RESET,
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
   USER_DELETE_REQUEST,
   USER_DELETE_SUCCESS,
   USER_DELETE_FAIL,
   USER_UPDATE_RESET,
   USER_UPDATE_REQUEST,
   USER_UPDATE_SUCCESS,
   USER_UPDATE_FAIL,
   USER_UPDATE_PROFILE_RESET,
   USERNAME_VALIDATION_REQUEST,
   USERNAME_VALIDATION_SUCCESS,
   USERNAME_VALIDATION_FAIL,
   USER_CONNECT_FAIL,
   USER_CONNECT_REQUEST,
   USER_CONNECT_SUCCESS,
   USER_INVITE_TO_TEAM_FAIL,
   USER_INVITE_TO_TEAM_REQUEST,
   USER_INVITE_TO_TEAM_SUCCESS,
   USER_INVITE_TO_TEAM_RESET,
   USER_RESPOND_INVITE_TO_TEAM_FAIL,
   USER_RESPOND_INVITE_TO_TEAM_REQUEST,
   USER_RESPOND_INVITE_TO_TEAM_SUCCESS,
   USER_RESPOND_INVITE_TO_TEAM_RESET,
} from '../constants/userConstants'

export const userRespondInviteToTeamReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_RESPOND_INVITE_TO_TEAM_REQUEST:
         return { loading: true }
      case USER_RESPOND_INVITE_TO_TEAM_SUCCESS:
         return { loading: false, success: true }
      case USER_RESPOND_INVITE_TO_TEAM_FAIL:
         return { loading: false, error: action.payload }
      case USER_RESPOND_INVITE_TO_TEAM_RESET:
         return {}
      default:
         return state
   }
}

export const userInviteToTeamReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_INVITE_TO_TEAM_REQUEST:
         return { loading: true }
      case USER_INVITE_TO_TEAM_SUCCESS:
         return { loading: false, success: true }
      case USER_INVITE_TO_TEAM_FAIL:
         return { loading: false, error: action.payload }
      case USER_INVITE_TO_TEAM_RESET:
         return {}
      default:
         return state
   }
}

export const userConnectReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_CONNECT_REQUEST:
         return { loading: true }
      case USER_CONNECT_SUCCESS:
         return { loading: false, success: true }
      case USER_CONNECT_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const userLoginReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
         return { loading: true }
      case USER_LOGIN_SUCCESS:
         // console.log(action.payload)
         return { loading: false, userInfo: action.payload }
      case USER_LOGIN_FAIL:
         return { loading: false, error: action.payload }
      case USER_LOGOUT:
         return {}
      default:
         return state
   }
}

export const userLogoutReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_LOGOUT_REQUEST:
         return { loading: true }
      case USER_LOGOUT_SUCCESS:
         return { loading: false, message: action.payload }
      case USER_LOGOUT_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const usernameValidationReducer = (state = {}, action) => {
   switch (action.type) {
      case USERNAME_VALIDATION_REQUEST:
         return { loading: true }
      case USERNAME_VALIDATION_SUCCESS:
         return { loading: false, validUsername: action.payload }
      case USERNAME_VALIDATION_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const userRegisterReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_REGISTER_REQUEST:
         return { loading: true }
      case USER_REGISTER_SUCCESS:
         return { loading: false, userInfo: action.payload }
      case USER_REGISTER_FAIL:
         return { loading: false, error: action.payload }
      case USER_LOGOUT:
         return {}
      default:
         return state
   }
}

export const userProfileReducer = (
   state = {
      profile: {
         services: [],
         friends: [],
         recoServices: [],
         antirecoServices: [],
      },
      recoCategories: [],
      antirecoCategories: [],
   },
   action
) => {
   switch (action.type) {
      case USER_PROFILE_REQUEST:
         return { ...state, loading: true }
      case USER_PROFILE_SUCCESS:
         return {
            loading: false,
            profile: action.payload.profile,
            recoCategories: action.payload.recoCategories,
            antirecoCategories: action.payload.antirecoCategories,
         }
      case USER_PROFILE_FAIL:
         return { ...state, loading: false, error: action.payload }
      case USER_PROFILE_RESET:
         return {
            profile: {
               services: [],
               friends: [],
               recoServices: [],
               antirecoServices: [],
            },
            recoCategories: [],
            antirecoCategories: [],
         }
      default:
         return state
   }
}

export const userMyProfileReducer = (
   state = {
      profile: {
         services: [],
         friends: [],
         recoServices: [],
         antirecoServices: [],
         teamRequest: [],
      },
      recoCategories: [],
      antirecoCategories: [],
   },
   action
) => {
   switch (action.type) {
      case USER_MY_PROFILE_REQUEST:
         return { ...state, loading: true }
      case USER_MY_PROFILE_SUCCESS:
         return {
            loading: false,
            profile: action.payload.profile,
            recoCategories: action.payload.recoCategories,
            antirecoCategories: action.payload.antirecoCategories,
         }
      case USER_MY_PROFILE_FAIL:
         return { loading: false, error: action.payload }
      case USER_MY_PROFILE_RESET:
         return {
            profile: {
               services: [],
               friends: [],
               recoServices: [],
               antirecoServices: [],
               teamRequest: [],
            },
            recoCategories: [],
            antirecoCategories: [],
         }
      default:
         return state
   }
}

export const userUpdateProfileReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
         return { loading: true }
      case USER_UPDATE_PROFILE_SUCCESS:
         return { loading: false, success: true, userInfo: action.payload }
      case USER_UPDATE_PROFILE_FAIL:
         return { loading: false, error: action.payload }
      case USER_UPDATE_PROFILE_RESET:
         return {}
      default:
         return state
   }
}

export const userListReducer = (state = { users: [] }, action) => {
   switch (action.type) {
      case USER_LIST_REQUEST:
         return { loading: true }
      case USER_LIST_SUCCESS:
         return { loading: false, users: action.payload }
      case USER_LIST_FAIL:
         return { loading: false, error: action.payload }
      case USER_LIST_RESET:
         return { users: [] }
      default:
         return state
   }
}

export const userDeleteReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_DELETE_REQUEST:
         return { loading: true }
      case USER_DELETE_SUCCESS:
         return { loading: false, success: true }
      case USER_DELETE_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case USER_UPDATE_REQUEST:
         return { loading: true }
      case USER_UPDATE_SUCCESS:
         return { loading: false, success: true }
      case USER_UPDATE_FAIL:
         return { loading: false, error: action.payload }
      case USER_UPDATE_RESET:
         return {
            user: {},
         }
      default:
         return state
   }
}
