import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userUpdateReducer,
    userDeleteReducer
  } from './reducers/userReducers'
  import {
    dataInfoReducer,
    dataHumaDataReducer,
    dataHumaDataDeleteReducer
  } from './reducers/dataReducers'
import { uploadReducer } from './reducers/uploadReducer'

const reducer = combineReducers({  
  dataHumaDataDelete: dataHumaDataDeleteReducer,
  uploadReducer: uploadReducer,
  dataHumaData: dataHumaDataReducer,
  dataInfo: dataInfoReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete:userDeleteReducer,
  userUpdate:userUpdateReducer,})


const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
  }

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )


  
  
  export default store