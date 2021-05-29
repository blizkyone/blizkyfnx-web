import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
   userLoginReducer,
   userLogoutReducer,
   userRegisterReducer,
   userMyProfileReducer,
   userUpdateProfileReducer,
   userListReducer,
   userDeleteReducer,
   userUpdateReducer,
   usernameValidationReducer,
} from './reducers/userReducers'
import { serviceListReducer } from './reducers/serviceReducer'
import { searchLocationReducer } from './reducers/searchReducer'
import {
   placeAutocompleteReducer,
   locationAddressReducer,
} from './reducers/placesReducers'

const reducer = combineReducers({
   placeAutocomplete: placeAutocompleteReducer,
   placeAddress: locationAddressReducer,
   searchLocation: searchLocationReducer,
   serviceList: serviceListReducer,
   userLogin: userLoginReducer,
   userLogout: userLogoutReducer,
   userRegister: userRegisterReducer,
   usernameValidation: usernameValidationReducer,
   userMyProfile: userMyProfileReducer,
   userUpdateProfile: userUpdateProfileReducer,
   userList: userListReducer,
   userDelete: userDeleteReducer,
   userUpdate: userUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null

const servicesFromStorage = localStorage.getItem('services')
   ? JSON.parse(localStorage.getItem('services'))
   : []

const categoriesFromStorage = localStorage.getItem('categories')
   ? JSON.parse(localStorage.getItem('categories'))
   : []

const searchLocationFromStorage = localStorage.getItem('region')
   ? JSON.parse(localStorage.getItem('region'))
   : { city: 'Merida', region: 'Yucatan', country: 'Mexico' }

const initialState = {
   serviceList: {
      services: servicesFromStorage,
      categories: categoriesFromStorage,
   },
   userLogin: { userInfo: userInfoFromStorage },
   searchLocation: searchLocationFromStorage,
}

const middleware = [thunk]

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
)

export default store
