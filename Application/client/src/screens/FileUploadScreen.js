import React, {useCallback, useEffect} from 'react'
import Papa from "papaparse";
import Sidebar from "../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {useDropzone} from 'react-dropzone';
import { Container } from 'react-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Card } from 'react-bootstrap';
import { upload } from '../actions/uploadActions';


const  FileUploadScreen = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {error, userInfo} = userLogin

    const uploadState = useSelector(state => state.uploadReducer)
    const {loading : uploadLoading, error : uploadError, uploadSuccess} = uploadState
    
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
      }, [dispatch,userInfo])

      const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject,} = useDropzone({onDrop, accept: '.hum,'})
      

  return (
    <>
    <Sidebar/>
    
    
    <Container>
    {error && <Message variant='danger'>{error}</Message>}
    {uploadError && <Message variant='danger'>{uploadError}</Message>}
    {uploadSuccess && <Message variant='primary'>File Upload Success</Message>}
    <Card
         bg={"white"}
         text={'dark'}
         style={{ width: '80vw' }}
         className="text-center"
        >
        <Card.Header>File Upload</Card.Header>
        <Card.Body>
          {uploadLoading ? (uploadLoading && <Loader/>) :
          <>
          <Card.Title>How to Use</Card.Title>
          <Card.Text>Simply drag, drop or select .hum files to upload them to database</Card.Text>
              <div
            {...getRootProps({
              className: `dropzone 
              ${isDragAccept && 'dropzoneAccept'} 
              ${isDragReject && 'dropzoneReject'}`,
            })}
          >
          <input {...getInputProps()} />
          {
          isDragActive ? (isDragAccept ? (<Card.Text>Drop the file here ...</Card.Text>):
          <Card.Text>Incorrect File Type, Please Ensure file is .hum</Card.Text>) :


          <Card.Text>Drag 'n' drop some file here, or click to select file</Card.Text>
          }
        </div>
        </>}
        </Card.Body>
        <Card.Footer className="text-muted"/>
      </Card>
    
   
     
    </Container>
  
    </>
  );
}

export default FileUploadScreen