import {DATA_UPLOAD_FAIL,DATA_UPLOAD_REQUEST,DATA_UPLOAD_SUCCESS} from "../constants/uploadConstants"

export const uploadReducer = (state = {}, action) => {
    switch(action.type){
        case DATA_UPLOAD_REQUEST:
            return { loading: true}
        case DATA_UPLOAD_SUCCESS:
            return {loading: false, uploadSuccess:true}
        case DATA_UPLOAD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}