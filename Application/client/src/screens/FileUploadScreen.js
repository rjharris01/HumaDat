import React, {useCallback, useEffect} from 'react'
import Papa from "papaparse";
import Sidebar from "../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import Dropzone, {useDropzone} from 'react-dropzone';
import { Container } from '@mui/material';
import FormContainer from '../components/FormContainer';


const  FileUploadScreen = () => {

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const history = useNavigate()
    useEffect(()=> {
        if(!userInfo){
            history('/profile')
        }
    },[history, userInfo])

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        if (acceptedFiles) {
            console.log(acceptedFiles[0]);
            Papa.parse(acceptedFiles[0], {
              complete: function(results) {
                console.log("Finished:", results.data);
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