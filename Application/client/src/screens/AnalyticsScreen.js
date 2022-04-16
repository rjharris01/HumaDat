import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {Table,Button,Row,Col, Container, Form,Card} from 'react-bootstrap'
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


    const [stats, setStats] = useState(null)

    const dataHumaData = useSelector((state) => state.dataHumaData)   
    const {loading:dataLoading, error:dataError, data:humaData} = dataHumaData


    const dataInfo = useSelector((state) => state.dataInfo)   
    const {loading, error, devices, dataLen, dataStart,dataEnd} = dataInfo


    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const median = arr => {
        const { length } = arr;
        const temp = [...arr];
        temp.sort((a, b) => a - b);
        
        if (length % 2 === 0) {
          return (temp[length / 2 - 1] + temp[length / 2]) / 2;
        }
        
        return temp[(length - 1) / 2];
      };


      const mode = arr => {
        const mode = {};
        let max = 0, count = 0;
      
        for(let i = 0; i < arr.length; i++) {
          const item = arr[i];
          
          if(mode[item]) {
            mode[item]++;
          } else {
            mode[item] = 1;
          }
          
          if(count < mode[item]) {
            max = item;
            count = mode[item];
          }
        }
         
        return max;
      };
    

      const range = arr => {
        const temp = [...arr];
        temp.sort((a, b) => a - b);
        
        return Math.abs(temp[0] - temp[temp.length - 1]);
      };

      const findVal = (arr,val) => {
        
        return arr.indexOf(val);
      };
   
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
        datasets:
        [
        {data:[],label: 'IR', borderColor: 'rgb(86, 42, 173)'}, 
        {data:[],label: 'Red',borderColor: 'rgb(184, 61, 182)'}, 
        ] });
   
      
    

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

                   var tempStats = []



                   var tempStat = {}
                   let sum = xData.reduce((a, b) => a + b, 0);
                   let mean =  Math.round(((sum / xData.length) + Number.EPSILON) * 100) / 100 || 0;
                   let med = median(xData)
                   let mod = mode(xData)
                   let rang = range(xData)
                   let minimum= Math.min(...xData)
                   let maximum = Math.max(...xData)
                   let minTime = time[findVal(xData,minimum)]
                   let maxTime = time[findVal(xData,maximum)]
                   let variable = "Accelerometer X"
                   tempStat = {variable,mean,med,mod,rang,minimum,maximum,minTime,maxTime}
   
              
   
   
   
                   tempStats.push(tempStat)
                   
   
                   
                   var tempStat = {}
                    sum = yData.reduce((a, b) => a + b, 0);
                    mean =  Math.round(((sum / yData.length) + Number.EPSILON) * 100) / 100 || 0;
                    med = median(yData)
                    mod = mode(yData)
                    rang = range(yData)
                    minimum= Math.min(...yData)
                    maximum = Math.max(...yData)
                    minTime = time[findVal(yData,minimum)]
                    maxTime = time[findVal(yData,maximum)]
                    variable = "Accelerometer Y"
                   tempStat = {variable,mean,med,mod,rang,minimum,maximum,minTime,maxTime}
   
              
   
                   tempStats.push(tempStat)
   
                 
   
                   var tempStat = {}
                   sum = zData.reduce((a, b) => a + b, 0);
                   mean =  Math.round(((sum / zData.length) + Number.EPSILON) * 100) / 100 || 0;
                   med = median(zData)
                   mod = mode(zData)
                   rang = range(zData)
                   minimum= Math.min(...zData)
                   maximum = Math.max(...zData)
                   minTime = time[findVal(zData,minimum)]
                   maxTime = time[findVal(zData,maximum)]
                   variable = "Accelerometer Z"
                   tempStat = {variable,mean,med,mod,rang,minimum,maximum,minTime,maxTime}
                   tempStats.push(tempStat)

                   var tempStat = {}
                   sum = temperatureData.reduce((a, b) => a + b, 0);
                   mean =  Math.round(((sum / temperatureData.length) + Number.EPSILON) * 100) / 100 || 0;
                   med = median(temperatureData)
                   mod = mode(temperatureData)
                   rang = range(temperatureData)
                   minimum= Math.min(...temperatureData)
                   maximum = Math.max(...temperatureData)
                   minTime = time[findVal(temperatureData,minimum)]
                   maxTime = time[findVal(temperatureData,maximum)]
                   variable = "Temperature (°C)"
                   tempStat = {variable,mean,med,mod,rang,minimum,maximum,minTime,maxTime}
                   tempStats.push(tempStat)

                   var tempStat = {}
                   sum = humidityData.reduce((a, b) => a + b, 0);
                   mean =  Math.round(((sum / humidityData.length) + Number.EPSILON) * 100) / 100 || 0;
                   med = median(humidityData)
                   mod = mode(humidityData)
                   rang = range(humidityData)
                   minimum= Math.min(...humidityData)
                   maximum = Math.max(...humidityData)
                   minTime = time[findVal(humidityData,minimum)]
                   maxTime = time[findVal(humidityData,maximum)]
                   variable = "Humidity Data (%)"
                   tempStat = {variable,mean,med,mod,rang,minimum,maximum,minTime,maxTime}
                   tempStats.push(tempStat)

                   var tempStat = {}
                   sum = hrData.reduce((a, b) => a + b, 0);
                   mean =  Math.round(((sum / hrData.length) + Number.EPSILON) * 100) / 100 || 0;
                   med = median(hrData)
                   mod = mode(hrData)
                   rang = range(hrData)
                   minimum= Math.min(...hrData)
                   maximum = Math.max(...hrData)
                   minTime = time[findVal(hrData,minimum)]
                   maxTime = time[findVal(hrData,maximum)]
                   variable = "Heart Rate (BPM)"
                   tempStat = {variable,mean,med,mod,rang,minimum,maximum,minTime,maxTime}
                   tempStats.push(tempStat)

                   var tempStat = {}
                   sum = ppgRedData.reduce((a, b) => a + b, 0);
                   mean =  Math.round(((sum / ppgRedData.length) + Number.EPSILON) * 100) / 100 || 0;
                   med = median(ppgRedData)
                   mod = mode(ppgRedData)
                   rang = range(ppgRedData)
                   minimum= Math.min(...ppgRedData)
                   maximum = Math.max(...ppgRedData)
                   minTime = time[findVal(ppgRedData,minimum)]
                   maxTime = time[findVal(ppgRedData,maximum)]
                   variable = "PPG IR"
                   tempStat = {variable,mean,med,mod,rang,minimum,maximum,minTime,maxTime}
                   tempStats.push(tempStat)

                   var tempStat = {}
                   sum = ppgIRData.reduce((a, b) => a + b, 0);
                   mean =  Math.round(((sum / ppgIRData.length) + Number.EPSILON) * 100) / 100 || 0;
                   med = median(ppgIRData)
                   mod = mode(ppgIRData)
                   rang = range(ppgIRData)
                   minimum= Math.min(...ppgIRData)
                   maximum = Math.max(...ppgIRData)
                   minTime = time[findVal(ppgIRData,minimum)]
                   maxTime = time[findVal(ppgIRData,maximum)]
                   variable = "PPG RedLight"
                   tempStat = {variable,mean,med,mod,rang,minimum,maximum,minTime,maxTime}
                   tempStats.push(tempStat)

                   setStats(tempStats)
              
               
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
        <Card
         bg={"white"}
         text={'dark'}
         style={{ width: '80vw' }}
         className="mb-2"
        >
        <Card.Header>HumaDat Analytics</Card.Header>
        <Card.Body>
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
                        <th>Minimum</th>
                        <th>Minimum Time</th>
                        <th>Maximum</th>
                        <th>Maximum Time</th>
                        <th>Mean</th>
                        <th>Modal</th>
                        <th>Median</th>
                        <th>Range</th>
                        </tr>
                    </thead>
                    <tbody>
                    {stats? stats.map(stat=> 
                        
                        
                        <tr>
                            <td key={stat.variable.key}>{stat.variable}</td>
                            <td key={stat.minimum.key}>{stat.minimum}</td>
                            <td key={stat.minTime.key}>{stat.minTime}</td>
                            <td key={stat.maximum.key}>{stat.maximum}</td>
                            <td key={stat.maxTime.key}>{stat.maxTime}</td>
                            <td key={stat.mean.key}>{stat.mean}</td>
                            <td key={stat.mod.key}>{stat.mod}</td>
                            <td key={stat.med.key}>{stat.med}</td>
                            <td key={stat.rang.key}>{stat.rang}</td>
                        </tr>
                       
                       ): null}
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
                        <Form.Label>End of data:</Form.Label>
                            <DateTimePicker onChange={setdateEnd} value={dateEnd} />
                    </Form.Group>
                    
                    <Button type='submit' variant='primary m-3'>
                        Show data analytics
                    </Button>
                </Form>
                }
               {humaData? (
                   stats? (
                    <CsvPasser csvData = {humaData} stats = {stats} variant='primary m-3'/>
                   ):null
               
               ):null}
              
               
                    
            
            </Col>
            
           
            </Row>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
            </Card>
            
            </Container>
            
        </>
    )
}

export default AnalyticsScreen