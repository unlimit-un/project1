import React from 'react'
import { Bar, Line, Pie } from "react-chartjs-2";
export const LineChart = ({ data, options, height, width }) => {
  return (
    <div style={{height:`${height}`, minWidth:`${width}`}}>
      <Line data={data} options={options} />
    </div>
  )

}
export const BarChart = ({ data, options, height, width }) => {
  return (
    <div style={{height:`${height}`, minWidth:`${width}`}}>
      <Bar data={data} options={options}/>
    </div>
  )
}
export const PieChart = ({ data, options, height, width }) => {
  return (
    <div style={{minHeight:`${height}`, minWidth:`${width}`}}>
      <Pie data={data} options={options} />
    </div>
  )
}

