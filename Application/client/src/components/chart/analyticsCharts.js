import {Line,Bar} from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Button } from 'react-bootstrap';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
)




export const options = {
   
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        zoom: {
            zoom: {
              wheel: {
                enabled: true // SET SCROOL ZOOM TO TRUE
              },
              mode: "x",
              speed: 100
            },
            pan: {
              enabled: true,
              mode: "x",
              speed: 100
            }
          },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Accelerometer',
      },
    },
};

export const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        zoom: {
            zoom: {
              wheel: {
                enabled: true // SET SCROOL ZOOM TO TRUE
              },
              mode: "x",
              speed: 100
            },
            pan: {
              enabled: true,
              mode: "x",
              speed: 100
            }
          },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Heart Rate',
      },
    },
};

export const options3 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        zoom: {
            zoom: {
              wheel: {
                enabled: true // SET SCROOL ZOOM TO TRUE
              },
              mode: "x",
              speed: 100
            },
            pan: {
              enabled: true,
              mode: "x",
              speed: 100
            }
          },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temprature & Humidity',
      },
    },
};

export const options4 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        zoom: {
            zoom: {
              wheel: {
                enabled: true // SET SCROOL ZOOM TO TRUE
              },
              mode: "x",
              speed: 100
            },
            pan: {
              enabled: true,
              mode: "x",
              speed: 100
            }
          },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Raw PPG Data',
      },
    },
};



const line1ChartRef = React.createRef();
const line2ChartRef = React.createRef();
const line3ChartRef = React.createRef();
const line4ChartRef = React.createRef();

const resetZoom1 = () => {
      let chart = line1ChartRef.current
      chart.resetZoom();
}

const resetZoom2 = () => {
  let chart = line2ChartRef.current
      chart.resetZoom();
}

const resetZoom3 = () => {
  let chart = line3ChartRef.current
      chart.resetZoom();
}
    
const resetZoom4 = () => {
  let chart = line4ChartRef.current
      chart.resetZoom();
}



const LineChart = (props) => {

 
    
    return(
    <>
   
    <div style={{height:"30vh", width: "50vw", position:"relative", margin:0}}>
      <Line ref={line1ChartRef} options={options} data={props.xyz} />
    </div>
    <div style={{height:"10vh", width: "10vw", position:"relative", margin:0}}>
     <Button onClick={resetZoom1}>Reset Zoom</Button>
    </div>

    <div style={{height:"30vh", width: "50vw", position:"relative", margin:0}}>
    <Line ref={line2ChartRef} options={options2} data={props.HRdata} />
    </div>

    <div style={{height:"10vh", width: "10vw", position:"relative", margin:0}}>
    <Button onClick={resetZoom2}>Reset Zoom</Button>
    </div>

    <div style={{height:"30vh", width: "50vw", position:"relative", margin:0}}>
     <Line ref={line3ChartRef}  options={options3} data={props.TandHdata} />
    </div>
    <div style={{height:"10vh", width: "10vw", position:"relative", margin:0}}>
    <Button onClick={resetZoom3}>Reset Zoom</Button>
    </div>
    <div style={{height:"30vh", width: "50vw", position:"relative", margin:0}}>
     <Line ref={line4ChartRef} options={options4} data={props.PPGdata} />
    </div>
    <div style={{height:"10vh", width: "10vw", position:"relative", margin:0}}>
    <Button  onClick={resetZoom4}>Reset Zoom</Button>
    </div>
    </>
    )

  
}


const BarChart = (props) => {

 
    
    return(
        <>
    <div style={{height:"30vh", width: "30vw", position:"relative", margin:"auto"}}>
      <Line options={options} data={props.xyz} />
    </div>
    <div style={{height:"30vh", width: "30vw", position:"relative", margin:"auto"}}>
    <Line options={options2} data={props.HRdata} />
    </div>
    <div style={{height:"30vh", width: "30vw", position:"relative", margin:"auto"}}>
     <Line options={options3} data={props.TandHdata} />
    </div>
    <div style={{height:"30vh", width: "30vw", position:"relative", margin:"auto"}}>
     <Line options={options4} data={props.PPGdata} />
    </div>
    </>
    )

  
}

export default LineChart