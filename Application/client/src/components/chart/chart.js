import React, { useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2'


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
  Legend
)




export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'HumaDat Data',
      },
    },
};






const Chart = (props) => {

 
    
    return(
    <div style={{height:"50vh", width: "100vh", position:"relative", marginBottom:"10%", padding:"5%",margin:"auto"}}>
      <Line options={options} data={props.updateData} />
    </div>
    )

  
}

export default Chart