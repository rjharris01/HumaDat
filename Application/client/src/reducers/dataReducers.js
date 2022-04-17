
import {DATA_GET_DATA_ID_REQUEST,DATA_GET_DATA_ID_SUCCESS,DATA_GET_DATA_ID_FAIL,DATA_GET_INFO_FAIL,DATA_GET_INFO_SUCCESS,DATA_GET_INFO_REQUEST, DATA_DELETE_DATA_ID_REQUEST, DATA_DELETE_DATA_ID_SUCCESS, DATA_DELETE_DATA_ID_FAIL} from "../constants/dataConstants"

export const dataInfoReducer = (state = {}, action) => {
    switch(action.type){
        case DATA_GET_INFO_REQUEST:
            return { loading: true}
        case DATA_GET_INFO_SUCCESS:
            return {loading: false, devices: action.payload[0], dataLen: action.payload[1], dataStart: action.payload[2], dataEnd: action.payload[3] }
        case DATA_GET_INFO_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const dataHumaDataReducer = (state = {}, action) => {
    switch(action.type){
        case DATA_GET_DATA_ID_REQUEST:
            return { loading: true}
        case DATA_GET_DATA_ID_SUCCESS:
            if (action.payload.length === 0 ){
                return {loading: false, data: null}
            }
            else{
                return {loading: false, data: action.payload }
            }
        case DATA_GET_DATA_ID_FAIL:
            return {loading: false, error: action.payload}
        case DATA_DELETE_DATA_ID_SUCCESS:
            return {}
        default:
            return state
    }
}

export const dataHumaDataDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case DATA_DELETE_DATA_ID_REQUEST:
            return { loading: true}
        case DATA_DELETE_DATA_ID_SUCCESS:
           return {loading: false, success: true }
        case DATA_DELETE_DATA_ID_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


