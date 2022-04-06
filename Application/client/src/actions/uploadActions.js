import axios from 'axios'
import {DATA_UPLOAD_FAIL,DATA_UPLOAD_REQUEST,DATA_UPLOAD_SUCCESS} from "../constants/uploadConstants"


export const upload = (uploadData) => async(dispatch) => {
    try{
        dispatch({
            type: DATA_UPLOAD_REQUEST
        })

        

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/data',{uploadData}, config)

        dispatch({
            type: DATA_UPLOAD_SUCCESS
        })
        

    }catch(error){
        dispatch({
            type: DATA_UPLOAD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
