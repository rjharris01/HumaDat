import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {Table,Button,Row,Col, Container, Form} from 'react-bootstrap'
import LineChart from '../components/chart/analyticsCharts';
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select';
import {getById,getDevices} from '../actions/dataActions'

const  AnalyticsScreen = () => {

    const history = useNavigate()
    const dispatch = useDispatch()

    const [device_id, setdevice_id] = useState('')
    const [dateEnd, setdateEnd] = useState(new Date());
    const [dateStart, setdateStart] = useState(new Date());
    const [devicesLabels, setDevicesLabels] = useState([{ label: 'Shark', value: 'Shark' }])


  
    const dataDevices = useSelector((state) => state.dataDevices)   
    const {loading, error, devices} = dataDevices

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    
    
   


    

    useEffect(()=> {
        if(!userInfo){
            history('/login')
        }
        else{
            
            if(devices){
                
                setDevicesLabels(devices.map((  x ) => ({ label: x, value: x })))
            }

            else{
                dispatch(getDevices(userInfo._id))
            }
            
        }
       
        
       
    },[dispatch,devices])


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
          console.log(device_id.value)
          console.log(dateStart.toISOString())
          console.log(dateEnd.toISOString())
          dispatch(getById(dateStart.toISOString(),dateEnd.toISOString(),device_id.value))
          e.preventDefault()
        //dispatch(login(email,password))
    }


    return (
        <>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css"></link> 
        <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/i18n/defaults-*.min.js"></script>
        <Sidebar/>
        <Container >
        <Row>
        <h1>HumaDat Analytics</h1>
            <Row>
                <Col>
                        XYZ
                </Col>
            </Row>

            <Col>
            <Row>
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
        

                <Form onSubmit={submitHandler}>
                        <Form.Group controlId='device_id'>
                        <Form.Label>Device ID</Form.Label>
                        <Select options={devicesLabels}
                        onChange={setdevice_id}/>
                        </Form.Group>

                    <Form.Group controlId='dateStart'>
                        <Form.Label>Start of data: </Form.Label>
                            <DateTimePicker onChange={setdateStart} value={dateStart} />
                    </Form.Group>

                    <Form.Group controlId='dateEnd'>
                        <Form.Label>End of Data</Form.Label>
                        <DateTimePicker onChange={setdateEnd} value={dateEnd} />

                    </Form.Group>
                    
                    <Button type='submit' variant='primary m-2'>
                        Search for data
                    </Button>
                </Form>
            
            </Row>
            </Container>
        </>
    )
}

export default AnalyticsScreen