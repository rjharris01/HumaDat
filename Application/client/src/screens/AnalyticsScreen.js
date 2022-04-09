import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {Table,Button,Row,Col, Container, Form} from 'react-bootstrap'
import LineChart from '../components/chart/analyticsCharts';
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select';
import {getById,getInfo} from '../actions/dataActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import CsvPasser from '../components/CsvPasser';

const  AnalyticsScreen = () => {

    const history = useNavigate()
    const dispatch = useDispatch()

    const [device_id, setdevice_id] = useState('')
    const [dateEnd, setdateEnd] = useState(new Date());
    const [dateStart, setdateStart] = useState(new Date());
    const [devicesLabels, setDevicesLabels] = useState([{ label:'' , value: '' }])


    const dataHumaData = useSelector((state) => state.dataHumaData)   
    const {loading:dataLoading, error:dataError, data:humaData} = dataHumaData


    const dataInfo = useSelector((state) => state.dataInfo)   
    const {loading, error, devices, dataLen, dataStart,dataEnd} = dataInfo


    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    
   
   // const [xyzdata, setxyzdata] =  useState({
    //    labels  : [0,1,2,3,5,0,1,2,3,5],
    //    datasets: [{data:[0,1,2,3,5,0,1,2,3,5], label: 'x',borderColor: 'rgb(75, 192, 89)'},
    //    {data:[2,4,6,7,9,4,2,4,6,4],label: 'y',borderColor: 'rgb(196, 118, 22)'},
    //    {data:[0,6,2,9,4,2,8,6,2,3], label: 'z',borderColor: 'rgb(196, 63, 22)'}]
    //  });

    const [xyzdata, setxyzData] =  useState({
        labels  : [],
        datasets: [
        {
            data:[], 
            label: 'x',
            borderColor: 'rgb(75, 192, 89)'
        },
        {
            data:[],
            label: 'y',
            borderColor: 'rgb(196, 118, 22)'
        },
        {
            data:[], 
            label: 'z',
            borderColor: 'rgb(196, 63, 22)'}]
      });


      const [TandHdata, setTandHdata] =  useState({
        labels  : [],
        datasets: [{data:[],
        label: 'Temperature (°C)', borderColor: 'rgb(75, 192, 192)'},
        {data:[],
         label: 'Humidity %',borderColor: 'rgb(75, 98, 192)'}]
      });


      const [HRdata, setHRdata] =  useState({
        labels  : [],
        datasets: [{data:[],
        label: 'HR',borderColor: 'rgb(196, 25, 22)'}]
      });


      const [PPGdata, setPPGdata] =  useState({
        labels  : [],
        datasets: [{data:[],
        label: 'IR', borderColor: 'rgb(86, 42, 173)'}, {data:[],
            label: 'Red',borderColor: 'rgb(184, 61, 182)'}]
      });
   
      

    

    useEffect(()=> {
        
        
        if(!userInfo){
            history('/login')
        }
       
        else{
            if(humaData){
                
                let tempDataset = xyzdata.datasets.slice(0)
    
                const time = humaData.map(a => a.time);
    
                const xData = humaData.map(a => a.xValue);
                const yData = humaData.map(a => a.yValue);
                const zData = humaData.map(a => a.zValue);
    
                const humidityData = humaData.map(a => a.humidityValue);
                const temperatureData = humaData.map(a => a.tempValue);
    
                const ppgIRData = humaData.map(a => a.irValue);
                const ppgRedData = humaData.map(a => a.redlightValue);
    
                const hrData = humaData.map(a => a.hrValue);
             
                
                tempDataset[0].data = xData
                tempDataset[1].data = yData
                tempDataset[2].data = zData
                
                setxyzData({
                     labels:   time,
                     datasets: tempDataset
                    })
    
               
                tempDataset = TandHdata.datasets.slice(0)
                tempDataset[0].data = temperatureData
                tempDataset[1].data = humidityData
    
                setTandHdata({
                    labels:   time,
                    datasets: tempDataset
                   })
    
                tempDataset = HRdata.datasets.slice(0)
                tempDataset[0].data= hrData
    
                setHRdata({
                    labels:   time,
                    datasets: tempDataset
                   })
    
                tempDataset = PPGdata.datasets.slice(0)
                tempDataset[0].data = ppgIRData
                tempDataset[1].data = ppgRedData
    
                
                setPPGdata({
                    labels:   time,
                    datasets: tempDataset
                   })
                   
            }

            if(devices){
                
                setDevicesLabels(devices.map((  x ) => ({ label: x, value: x })))
            }

            

            else{
                dispatch(getInfo(userInfo._id))
            }
            
        }
       
        
       
    },[dispatch,devices,humaData])




      


      const submitHandler = (e) => {
          e.preventDefault()
          dispatch(getById(dateStart.toISOString(),dateEnd.toISOString(),device_id.value))
          
    }

    

    return (
        <>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css"></link> 
        <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/i18n/defaults-*.min.js"></script>
        <Sidebar/>
        <Container >
        <h1>HumaDat Analytics</h1>
        <Row>
            <Col >
           
            {dataError && <Message variant='danger'>{dataError}</Message>}
            {humaData? ( dataLoading ? (dataLoading && <Loader/>) :
            <Col>
                <LineChart xyz={xyzdata} TandHdata={TandHdata} HRdata = {HRdata} PPGdata = {PPGdata}/>
            </Col>):
            
            <Col>
                <Message variant='info'>No data to display</Message>
            </Col>}
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
        
            <Col>
            {error && <Message variant='danger'>{error}</Message>}
            {loading ? (loading && <Loader/>) :
            
        

                <Form onSubmit={submitHandler} >
                        <Form.Group controlId='device_id'>
                        <Form.Label>Device ID</Form.Label>
                    
                        <Select options={devicesLabels}
                        onChange={setdevice_id}/>
                        
                       
                        </Form.Group>
                        <Col>
                        <p> 
                        <br /> You have: {dataLen? (dataLen):0} total records
                        <br /> Between
                        <br /> Start: {dataStart}  
                        <br /> End: {dataEnd} </p>
                        </Col>

                    <Form.Group controlId='dateStart'>
                        <Form.Label>Start of data: </Form.Label>
                            <DateTimePicker onChange={setdateStart} value={dateStart} />
                    </Form.Group>

                    <Form.Group controlId='dateEnd'>
                        <Form.Label>End of Data</Form.Label>
                        <DateTimePicker onChange={setdateEnd} value={dateEnd} />

                    </Form.Group>
                    
                    <Button type='submit' variant='primary m-2'>
                        Show data analytics
                    </Button>
                </Form>
                }
               {humaData? (<CsvPasser csvData = {humaData} variant='info'/>):null}
               
                    
            
            </Col>
            
           
            </Row>
            
            </Container>
            
        </>
    )
}

export default AnalyticsScreen