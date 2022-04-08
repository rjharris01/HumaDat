
import {DATA_GET_DATA_ID_REQUEST,DATA_GET_DATA_ID_SUCCESS,DATA_GET_DATA_ID_FAIL,DATA_GET_DATA_REQUEST,DATA_GET_DATA_SUCCESS,DATA_GET_DATA_FAIL,DATA_GET_DEVICES_FAIL,DATA_GET_DEVICES_SUCCESS,DATA_GET_DEVICES_REQUEST} from "../constants/uploadConstants"

export const dataDevicesReducer = (state = {}, action) => {
    switch(action.type){
        case DATA_GET_DEVICES_REQUEST:
            return { loading: true}
        case DATA_GET_DEVICES_SUCCESS:
            return {loading: false, devices: action.payload }
        case DATA_GET_DEVICES_FAIL:
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