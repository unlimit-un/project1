import React from 'react'
import { Bar, Line, Pie } from "react-chartjs-2";
import { Spiner } from './Loading';
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
      {!(data.datasets.length>0)?<Spiner/>:<Bar data={data} options={options}/>}
    </div>
  )
}
export const PieChart = ({ data, options, height, width }) => {
  return (
    <div style={{minHeight:`${height}`, minWidth:`${width}`}}>
       {!(data.datasets.length>0)?<Spiner/>:<Pie data={data} options={options} />}
    </div>
  )
}

