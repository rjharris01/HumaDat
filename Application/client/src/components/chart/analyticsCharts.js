import {Line,Bar} from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom';

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
              mode: "xy",
              speed: 100
            },
            pan: {
              enabled: true,
              mode: "xy",
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
              mode: "xy",
              speed: 100
            },
            pan: {
              enabled: true,
              mode: "xy",
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
              mode: "xy",
              speed: 100
            },
            pan: {
              enabled: true,
              mode: "xy",
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
              mode: "xy",
              speed: 100
            },
            pan: {
              enabled: true,
              mode: "xy",
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

export const options5 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Raw PPG Data',
      },
    },
};






const LineChart = (props) => {

 
    
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