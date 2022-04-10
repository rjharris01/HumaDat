import React, {useCallback, useEffect} from 'react'
import Papa from "papaparse";
import Sidebar from "../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import Dropzone, {useDropzone} from 'react-dropzone';
import { Container } from 'react-bootstrap';
import {upload} from '../actions/uploadActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Card } from 'react-bootstrap';


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
    {error && <Message variant='danger'>{error}</Message>}
    
    <Container>

    <Card
         bg={"white"}
         text={'dark'}
         style={{ width: '80vw' }}
         className="text-center"
        >
        <Card.Header>File Upload</Card.Header>
        <Card.Body>
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
        isDragActive ?
          <Card.Text>Drop the file here ...</Card.Text> :
          <Card.Text>Drag 'n' drop some file here, or click to select file</Card.Text>
      }
    </div>
        </Card.Body>
        <Card.Footer className="text-muted"/>
      </Card>
    
   
     
    </Container>
  
    </>
  );
}

export default FileUploadScreen