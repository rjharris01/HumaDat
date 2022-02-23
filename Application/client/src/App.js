import React, { useState, useEffect } from 'react';
import './App.css';
import { blue } from '@mui/material/colors';
import { IconButton } from '@mui/material';
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

  const [Humadata, setHumaData] =  useState({
    labels  : ['1','2','3','4','5','6','7'],
    datasets: [{
      label: 'Temp',
      data: [1],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
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
    //data.datasets[0].data.push(event.target.value.getUint8(0));
    
    //const tempData = JSON.parse(JSON.stringify(Humadata.datasets.slice(0)))
    const tempDataset = Humadata.datasets.slice(0);
    const tempData = tempDataset[0].data.slice(0);

    tempData.push(event.target.value.getUint8(0));
    tempDataset[0].data = tempData;

    

    //tempData.datasets[0].data.push(event.target.value.getUint8(0))

    console.log(JSON.parse(JSON.stringify(Humadata)))
    
    
    
    
  

    setHumaData(previous => ({
      ...previous,
      datasets: tempDataset
    }))

    console.log(JSON.parse(JSON.stringify(Humadata)))
    

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
          filters: [{services: ['4294c394-91ab-11ec-b909-0242ac120002']}]
        });

      setIsDisconnected(false);

      // Add an event listener to detect when a device disconnects
      device.addEventListener('gattserverdisconnected', onDisconnected);

      // Try to connect to the remote GATT Server running on the Bluetooth device
      const server = await device.gatt.connect();

      // Get the battery service from the Bluetooth device
      const service = await server.getPrimaryService('4294c394-91ab-11ec-b909-0242ac120002');

      // Get the battery level characteristic from the Bluetooth device
      const characteristic = await service.getCharacteristic('4294a8a0-91ab-11ec-b909-0242ac120002');

      // Subscribe to battery level notifications
      characteristic.startNotifications();

      // When the battery level changes, call a function
      characteristic.addEventListener('characteristicvaluechanged',
                                  handleCharacteristicValueChanged);
      
      // Read the battery level value
      const reading = await characteristic.readValue();

      // Show the initial reading on the web page
      setHumaData({
        labels  : ['1','2','3','4','5','6','7'],
        datasets: [{
          label: 'Temp',
          data: [reading.getUint8(0)],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      });

      console.log(JSON.parse(JSON.stringify(Humadata)))
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