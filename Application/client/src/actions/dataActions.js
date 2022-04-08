import axios from 'axios'
import {DATA_GET_DATA_ID_REQUEST,DATA_GET_DATA_ID_SUCCESS,DATA_GET_DATA_ID_FAIL,DATA_GET_DATA_REQUEST,DATA_GET_DATA_SUCCESS,DATA_GET_DATA_FAIL,DATA_GET_DEVICES_FAIL,DATA_GET_DEVICES_SUCCESS,DATA_GET_DEVICES_REQUEST} from "../constants/uploadConstants"

export const getById = (dateStart,dateEnd,device_id) => async(dispatch,getState) => {
    try {
        dispatch({type: DATA_GET_DATA_ID_REQUEST})
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        console.log(dateStart,dateEnd,device_id)
        const {data} = await axios.get(`/api/data/${dateStart}/${dateEnd}/${device_id}`,config)
        dispatch({
            type: DATA_GET_DATA_ID_SUCCESS,
            payload:data,
        })
    } 
    
    catch (error) {
        dispatch({
            type: DATA_GET_DATA_ID_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const getDevices = (id) => async(dispatch,getState) => {
    try {
        dispatch({type: DATA_GET_DEVICES_REQUEST})
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.get(`/api/data/device/${id}`,config)

        dispatch({
            type: DATA_GET_DEVICES_SUCCESS,
            payload: data,
        })

        
    } 
    
    catch (error) {
        dispatch({
            type: DATA_GET_DEVICES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
