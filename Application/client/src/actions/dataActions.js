import axios from 'axios'
import {DATA_GET_DATA_ID_REQUEST,DATA_GET_DATA_ID_SUCCESS,DATA_GET_DATA_ID_FAIL,DATA_GET_INFO_FAIL,DATA_GET_INFO_SUCCESS,DATA_GET_INFO_REQUEST, DATA_DELETE_DATA_ID_REQUEST, DATA_DELETE_DATA_ID_SUCCESS, DATA_DELETE_DATA_ID_FAIL} from "../constants/dataConstants"

export const getById = (dateStart,dateEnd,device_id) => async(dispatch,getState) => {
    try {
        dispatch({type: DATA_GET_DATA_ID_REQUEST})
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            },
        }
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


export const deleteById = (dateStart,dateEnd,device_id) => async(dispatch,getState) => {
    try {
        dispatch({type: DATA_DELETE_DATA_ID_REQUEST})
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        await axios.delete(`/api/data/${dateStart}/${dateEnd}/${device_id}`,config)
        dispatch({
            type: DATA_DELETE_DATA_ID_SUCCESS
        })
       
    } 
    
    catch (error) {
        dispatch({
            type: DATA_DELETE_DATA_ID_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const getInfo = (id) => async(dispatch,getState) => {
    try {
        dispatch({type: DATA_GET_INFO_REQUEST})
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.get(`/api/data/info/${id}`,config)

        dispatch({
            type: DATA_GET_INFO_SUCCESS,
            payload: data,
        })

        
    } 
    
    catch (error) {
        dispatch({
            type: DATA_GET_INFO_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
