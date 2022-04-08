import React, {useCallback, useEffect} from 'react'
import Papa from "papaparse";
import Sidebar from "../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import Dropzone, {useDropzone} from 'react-dropzone';
import FormContainer from '../components/FormContainer';
import {upload} from '../actions/uploadActions'


const  FileUploadScreen = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin
    
    const history = useNavigate()
    useEffect(()=> {
        if(!userInfo){
            history('/profile')
        }
    },[history, userInfo])

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles) {
            console.log(acceptedFiles[0]);
            Papa.parse(acceptedFiles[0], {
              complete: function(results) {

                const data = results.data.slice(0,-1);
                const result = data.map( (item,i) => item.concat([userInfo._id]));


                dispatch(upload(result))
              }}
            )
          }
      }, [])

      const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject,} = useDropzone({onDrop, accept: '.hum',})
      

  return (
    <>
    <Sidebar/>
    <FormContainer>
    <div
        {...getRootProps({
          className: `dropzone 
          ${isDragAccept && 'dropzoneAccept'} 
          ${isDragReject && 'dropzoneReject'}`,
        })}
      >
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the file here ...</p> :
          <p>Drag 'n' drop some file here, or click to select file</p>
      }
    </div>
    </FormContainer>
  
    </>
  );
}

export default FileUploadScreen