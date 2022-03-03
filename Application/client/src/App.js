import React, { useState, useEffect } from 'react';
import './App.css';
import { blue } from '@mui/material/colors';
import { hslToRgb, IconButton } from '@mui/material';
import BluetoothConnectedIcon from '@mui/icons-material/BluetoothConnected';
import Sidebar from "./components/sidebar/sidebar";
import Topbar from './components/topbar/topbar';
import Chart from './components/chart/chart';









//data.datasets[0].data = [1,2,3,4,5,6,7,8]


function App(props) {
  const [supportsBluetooth, setSupportsBluetooth] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(null);

  const decoder = new TextDecoder('utf-8');


  const tempService = "4294c394-91ab-11ec-b909-0242ac120002"
  const tempCharacteristicID = "4294a8a0-91ab-11ec-b909-0242ac120002"
  
  const humService = "4294b20a-91ab-11ec-b909-0242ac120002"
  const humCharacteristicID = "4294a71a-91ab-11ec-b909-0242ac120002"

  const accService = "4294aef4-91ab-11ec-b909-0242ac120002"
  const accXCharacteristicID = "4294a27e-91ab-11ec-b909-0242ac120002"
  const accYCharacteristicID = "4294a404-91ab-11ec-b909-0242ac120002"
  const accZCharacteristicID = "4294a580-91ab-11ec-b909-0242ac120002"


  const hrService = "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
  const hrBPMCharacteristicID = "42949770-91ab-11ec-b909-0242ac120002"
  const hrRedCharacteristicID = "42949a36-91ab-11ec-b909-0242ac120002"
  const hrIRCharacteristicID = "42949a37-91ab-11ec-b909-0242ac120002"
  const hrSpo2CharacteristicID = "4294aa4e-91ab-11ec-b909-0242ac120002"

  const validService = "b07f7d8e-95ae-11ec-b909-0242ac120002"
  const hrValidCharacteristicID = "4294a0da-91ab-11ec-b909-0242ac120002"

  const dataLimit = 10;

  const [Humadata, setHumaData] =  useState({
    labels  : [],
    datasets: [{
      label: 'Temp',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'Humidity',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 98, 192)',
      tension: 0.1
    },
    {
      label: 'Accelerometer X',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 192, 89)',
      tension: 0.1
    },
    {
      label: 'Accelerometer Y',
      data: [],
      fill: false,
      borderColor: 'rgb(196, 118, 22)',
      tension: 0.1
    },
    {
      label: 'Accelerometer Z',
      data: [],
      fill: false,
      borderColor: 'rgb(196, 63, 22)',
      tension: 0.1
    },
    {
      label: 'BPM (PPG)',
      data: [],
      fill: false,
      borderColor: 'rgb(196, 25, 22)',
      tension: 0.1
    },
    {
      label: 'Red Light (PPG)',
      data: [],
      fill: false,
      borderColor: 'rgb(184, 61, 182)',
      tension: 0.1
    },
    {
      label: 'Infared Light (PPG)',
      data: [],
      fill: false,
      borderColor: 'rgb(86, 42, 173)',
      tension: 0.1
    },
    {
      label: 'Sp02 (PPG)',
      data: [],
      fill: false,
      borderColor: 'rgb(22, 44, 184)',
      tension: 0.1
    }]
  });
  

  // When the component mounts, check that the browser supports Bluetooth
  useEffect(() => {
    if (navigator.bluetooth) {
      setSupportsBluetooth(true);
    }
  }, []);

  /**
   * Let the user know when their device has been disconnected.
   */
  const onDisconnected = (event) => {
    alert(`The device ${event.target} is disconnected`);
    setIsDisconnected(true);
  }

  /**
   * Update the value shown on the web page when a notification is
   * received.
   */
  const handleCharacteristicValueChanged = (event) => {
    const tempDataset = Humadata.datasets.slice(0);
    const tempLabels = Humadata.labels;

    var pointer = 0; 

    if (event.target.uuid === tempCharacteristicID){
      pointer = 0;
    }

    else if (event.target.uuid === humCharacteristicID){
      pointer = 1;
    }

    else if (event.target.uuid === accXCharacteristicID){
      pointer = 2;
    }

    else if (event.target.uuid === accYCharacteristicID){
      pointer = 3;
    }

    else if (event.target.uuid === accZCharacteristicID){
      pointer = 4;
    }

    else if (event.target.uuid === hrBPMCharacteristicID){
      pointer = 5;
    }

    else if (event.target.uuid === hrRedCharacteristicID){
      pointer = 6;
    }

    else if (event.target.uuid === hrIRCharacteristicID){
      pointer = 7;
    }

    else if (event.target.uuid === hrSpo2CharacteristicID){
      pointer = 8;
    }

    else {
      return;
    }

   
    

    const tempData = tempDataset[pointer].data.slice(-dataLimit);
    
     
    tempData.push(event.target.value.getUint8(0));

    if (pointer === 1)
    {
      
      tempLabels.push(new Date().toLocaleString())
      const labels = [...tempLabels].slice(-dataLimit)

      tempDataset[pointer].data = tempData;
      setHumaData(previous =>({
        labels: labels,
        datasets: tempDataset
      }))
      return;
    }

    else{
      tempDataset[pointer].data = tempData;
      setHumaData(previous => ({
        ...previous,
        datasets: tempDataset
      }))
    }
  }



  /**
   * Attempts to connect to a Bluetooth device and subscribe to
   * battery level readings using the battery service.
   */
  const connectToDeviceAndSubscribeToUpdates = async () => {
    try {
      // Search for Bluetooth devices that advertise a battery service
      const device = await navigator.bluetooth
        .requestDevice({
          filters: [{name: 'Humadat'}],
          optionalServices:[tempService,hrService,accService,humService,validService]
        });

      setIsDisconnected(false);

      // Add an event listener to detect when a device disconnects
      device.addEventListener('gattserverdisconnected', onDisconnected);

      // Try to connect to the remote GATT Server running on the Bluetooth device
      const server = await device.gatt.connect();

      // Get the battery service from the Bluetooth device
      const services = await server.getPrimaryServices();

      const tempCharacteristic = await services.find(service => service.uuid === tempService).getCharacteristic(tempCharacteristicID);

      const humCharacteristic = await services.find(service => service.uuid === humService).getCharacteristic(humCharacteristicID);

      const accXCharacteristic = await services.find(service => service.uuid === accService).getCharacteristic(accXCharacteristicID);
      const accYCharacteristic = await services.find(service => service.uuid === accService).getCharacteristic(accYCharacteristicID);
      const accZCharacteristic = await services.find(service => service.uuid === accService).getCharacteristic(accZCharacteristicID);

      const hrBPMCharacteristic =  await services.find(service => service.uuid === hrService).getCharacteristic(hrBPMCharacteristicID);
      const hrRedCharacteristic =  await services.find(service => service.uuid === hrService).getCharacteristic(hrRedCharacteristicID);
      const hrIRCharacteristic =  await services.find(service => service.uuid === hrService).getCharacteristic(hrIRCharacteristicID);
      const hrSpo2Characteristic = await services.find(service => service.uuid === hrService).getCharacteristic(hrSpo2CharacteristicID);

      const hrValidCharacteristic = await services.find(service => service.uuid === validService).getCharacteristic(hrValidCharacteristicID);
      
     
 

      // Subscribe to battery level notifications
      tempCharacteristic.startNotifications();

      humCharacteristic.startNotifications();

      accXCharacteristic.startNotifications();
      accYCharacteristic.startNotifications();
      accZCharacteristic.startNotifications();
  

      hrBPMCharacteristic.startNotifications();
      hrRedCharacteristic.startNotifications();
      hrIRCharacteristic.startNotifications();
      hrSpo2Characteristic.startNotifications();
      hrValidCharacteristic.startNotifications();

      // When the battery level changes, call a function
      tempCharacteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);
      humCharacteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);

      accXCharacteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);
      accYCharacteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);
      accZCharacteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);

      hrBPMCharacteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);
      hrRedCharacteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);
      hrIRCharacteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);
      hrSpo2Characteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);
      hrValidCharacteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);
      
      // Read the battery level value
      const readingTemp = await tempCharacteristic.readValue();
      const readingHum = await humCharacteristic.readValue();

      const readingX = await accXCharacteristic.readValue();
      const readingY = await accYCharacteristic.readValue();
      const readingZ = await accZCharacteristic.readValue();

      const readingBPM = await hrBPMCharacteristic.readValue();
      const readingRed = await hrRedCharacteristic.readValue();
      const readingIR = await hrIRCharacteristic.readValue();
      const readingSp02 = await hrSpo2Characteristic.readValue();

      // Show the initial reading on the web page
      setHumaData({
        labels  : [new Date().toLocaleString()],
        datasets: [{
          label: 'Temperature (°C)',
          data: [readingTemp.getUint8(0)],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Humidity (%)',
          data: [readingHum.getUint8(0)],
          fill: false,
          borderColor: 'rgb(75, 98, 192)',
          tension: 0.1
        },
        {
          label: 'Accelerometer X',
          data: [readingX.getUint8(0)],
          fill: false,
          borderColor: 'rgb(75, 192, 89)',
          tension: 0.1
        },
        {
          label: 'Accelerometer Y',
          data: [readingY.getUint8(0)],
          fill: false,
          borderColor: 'rgb(196, 118, 22)',
          tension: 0.1
        },
        {
          label: 'Accelerometer Z',
          data: [readingZ.getUint8(0)],
          fill: false,
          borderColor: 'rgb(196, 63, 22)',
          tension: 0.1
        },
        {
          label: 'BPM (PPG)',
          data: [readingBPM.getUint8(0)],
          fill: false,
          borderColor: 'rgb(196, 25, 22)',
          tension: 0.1
        },
        {
          label: 'Red Light (PPG)',
          data: [readingRed.getUint8(0)],
          fill: false,
          borderColor: 'rgb(184, 61, 182)',
          tension: 0.1
        },
        {
          label: 'Infared Light (PPG)',
          data: [readingIR.getUint8(0)],
          fill: false,
          borderColor: 'rgb(86, 42, 173)',
          tension: 0.1
        },
        {
          label: 'Sp02 (PPG)',
          data: [readingSp02.getUint8(0)],
          fill: false,
          borderColor: 'rgb(22, 44, 184)',
          tension: 0.1
        }]
      });

     
    } catch(error) {
      console.log(`There was an error: ${error}`);
    }
  };


  return (
    <div className="App">
      <Sidebar/>
      <div className="container">
        <div className="bluetoothConnect">
        <h1>Live HumaDat Data</h1>
        {supportsBluetooth && !isDisconnected &&
              //<p>Battery level: {batteryLevel}</p>
              <Chart updateData={Humadata} />
        }
        {supportsBluetooth && isDisconnected &&
        <div className="BluetoothButton">
          <IconButton sx={{ color: blue[500] }} onClick={connectToDeviceAndSubscribeToUpdates}>
          <BluetoothConnectedIcon />
          </IconButton>
          <p>Connect to a HumaDat device</p>
        </div>
        }
        {!supportsBluetooth &&
          <p>This browser doesn't support the Web Bluetooth API</p>
        }
        </div>


      </div>
      
    </div>
  );
}

export default App;