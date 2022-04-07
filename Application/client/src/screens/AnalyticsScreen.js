import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {Table,Button,Row,Col, Container, Form} from 'react-bootstrap'
import LineChart from '../components/chart/analyticsCharts';
import FormContainer from '../components/FormContainer'



const  AnalyticsScreen = () => {

    const history = useNavigate()

    const [device_id, setdevice_id] = useState('')
    const [dateStart, setdateStart] = useState('')
    const [dateEnd, setdateEnd] = useState('')



    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=> {
        if(!userInfo){
            history('/login')
        }
    })



    const [xyzdata, setxyzdata] =  useState({
        labels  : [0,1,2,3,5,0,1,2,3,5],
        datasets: [{data:[0,1,2,3,5,0,1,2,3,5],
        label: 'x',
        borderColor: 'rgb(75, 192, 89)'},
        {data:[2,4,6,7,9,4,2,4,6,4],
        label: 'y',borderColor: 'rgb(196, 118, 22)'},
        {data:[0,6,2,9,4,2,8,6,2,3],
        label: 'z',borderColor: 'rgb(196, 63, 22)'}]
      });


      const [TandHdata, setTandHdata] =  useState({
        labels  : [0,1,2,3,5],
        datasets: [{data:[3,5,6,4,2,5],
        label: 'Temperature (°C)', borderColor: 'rgb(75, 192, 192)'},
        {data:[5,3,2,4,5,1],
         label: 'Humidity %',borderColor: 'rgb(75, 98, 192)'}]
      });


      const [HRdata, setHRdata] =  useState({
        labels  : [0,1,2,3,5],
        datasets: [{data:[0,1,2,3,4,5],
        label: 'HR',borderColor: 'rgb(196, 25, 22)'}]
      });


      const [PPGdata, setPPGdata] =  useState({
        labels  : [0,1,2,3,5],
        datasets: [{data:[0,1,3,3,4,2],
        label: 'IR', borderColor: 'rgb(86, 42, 173)'}, {data:[5,2,1,3,2,5],
            label: 'Red',borderColor: 'rgb(184, 61, 182)'}]
      });


      const submitHandler = (e) => {
        e.preventDefault()
        //dispatch(login(email,password))
    }


    return (
        <>
        <Sidebar/>
        <Container>
        <h1>HumaDat Analytics</h1>
        <Row>
            <Row>
                <Col>
                        XYZ
                </Col>
            </Row>

            <Col>
            <Row className='py-3'>
                <LineChart xyz={xyzdata} TandHdata={TandHdata} HRdata = {HRdata} PPGdata = {PPGdata}/>
                
            </Row>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Variable</th>
                        <th>Lowest</th>
                        <th>Lowest Time</th>
                        <th>Peak</th>
                        <th>Peak Time</th>
                        <th>Mean</th>
                        <th>Modal</th>
                        <th>Median</th>
                        <th>Range</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
            </Row>
            </Col>
            <Col xs md="auto">
           
            <Form onSubmit={submitHandler}>
                    <Form.Group controlId='device_id'>
                    <Form.Label>Device ID</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Device Id' 
                    value={device_id} 
                    onChange={(e) => setdevice_id(e.target.value)}
                    ></Form.Control>

                </Form.Group>

                <Form.Group controlId='dateStart'>
                    <Form.Label>Start of data</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter start of data' 
                    value={dateStart} 
                    onChange={(e) => setdateStart(e.target.value)}
                    ></Form.Control>

                </Form.Group>

                <Form.Group controlId='dateEnd'>
                    <Form.Label>End of Data</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter end of data' 
                    value={dateEnd} 
                    onChange={(e) => setdateEnd(e.target.value)}
                    ></Form.Control>

                </Form.Group>
                
                <Button type='submit' variant='primary m-2'>
                    Sign in 
                </Button>
            </Form>
            </Col>
        </Row>
        </Container>
        </>
    )
}

export default AnalyticsScreen