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
   SERVICE_CREATE_RESET,
   SERVICE_PROFILE_REQUEST,
   SERVICE_PROFILE_SUCCESS,
   SERVICE_PROFILE_FAIL,
   SERVICE_RECOMMEND_REQUEST,
   SERVICE_RECOMMEND_SUCCESS,
   SERVICE_RECOMMEND_FAIL,
   SERVICE_RECOMMEND_RESET,
} from '../constants/serviceConstants'

export const serviceProfileReducer = (
   state = { service: { categories: [], team: [], phoneArray: [] } },
   action
) => {
   switch (action.type) {
      case SERVICE_PROFILE_REQUEST:
         return { ...state, loading: true }
      case SERVICE_PROFILE_SUCCESS:
         return { loading: false, service: action.payload }
      case SERVICE_PROFILE_FAIL:
         return { ...state, loading: false, error: action.payload }
      default:
         return state
   }
}

export const serviceRecommendReducer = (state = {}, action) => {
   switch (action.type) {
      case SERVICE_RECOMMEND_REQUEST:
         return { loading: true }
      case SERVICE_RECOMMEND_SUCCESS:
         return { loading: false, service: action.payload }
      case SERVICE_RECOMMEND_FAIL:
         return { loading: false, error: action.payload }
      case SERVICE_RECOMMEND_RESET:
         return {}
      default:
         return state
   }
}

export const serviceCreateReducer = (state = {}, action) => {
   switch (action.type) {
      case SERVICE_CREATE_REQUEST:
         return { loading: true }
      case SERVICE_CREATE_SUCCESS:
         return { loading: false, service: action.payload }
      case SERVICE_CREATE_FAIL:
         return { loading: false, error: action.payload }
      case SERVICE_CREATE_RESET:
         return {}
      default:
         return state
   }
}

export const serviceNewCategoryReducer = (state = {}, action) => {
   switch (action.type) {
      case SERVICE_NEW_CATEGORY_REQUEST:
         return { loading: true }
      case SERVICE_NEW_CATEGORY_SUCCESS:
         return { loading: false, new_category: action.payload }
      case SERVICE_NEW_CATEGORY_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

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

export const serviceCategoriesReducer = (
   state = { categories: [] },
   action
) => {
   switch (action.type) {
      case SERVICE_GET_CATEGORIES_REQUEST:
         return { ...state, loading: true }
      case SERVICE_GET_CATEGORIES_SUCCESS:
         return { loading: false, categories: action.payload }
      case SERVICE_GET_CATEGORIES_FAIL:
         return { ...state, loading: false, error: action.payload }
      default:
         return state
   }
}
