
import {DATA_GET_DATA_ID_REQUEST,DATA_GET_DATA_ID_SUCCESS,DATA_GET_DATA_ID_FAIL,DATA_GET_DATA_REQUEST,DATA_GET_DATA_SUCCESS,DATA_GET_DATA_FAIL,DATA_GET_INFO_FAIL,DATA_GET_INFO_SUCCESS,DATA_GET_INFO_REQUEST} from "../constants/uploadConstants"

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
            return {loading: false, data: action.payload }
        case DATA_GET_DATA_ID_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}