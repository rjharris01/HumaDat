import axios from 'axios'
import {DATA_GET_DATA_REQUEST,DATA_GET_DATA_SUCCESS,DATA_GET_DATA_FAIL} from "../constants/uploadConstants"

export const getById = (dateStart,dateEnd,device_id) => async(dispatch,getState) => {
    try {
        dispatch({type: DATA_GET_DATA_REQUEST})
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.get(`/api/data/${dateStart}/${dateEnd}/${device_id}`,config)

        dispatch({
            type: DATA_GET_DATA_SUCCESS,
        })
    } 
    
    catch (error) {
        dispatch({
            type: DATA_GET_DATA_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
