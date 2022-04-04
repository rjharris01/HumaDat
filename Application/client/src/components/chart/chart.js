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
    maintainAspectRatio: false,
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
    <div style={{height:"70vh", width: "60vw", position:"relative", margin:"auto"}}>
      <Line options={options} data={props.updateData} />
    </div>
    )

  
}

export default Chart