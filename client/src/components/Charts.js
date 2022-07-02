import React from 'react'
import { Bar, Line, Pie } from "react-chartjs-2";

export const LineChart = ({ data, options, height }) => {
  const style = {minHeight: {height}}
  return (
    <div style={style}>
      <Line data={data} options={options}  height={height}/>
    </div>
  )

}
export const BarChart = ({ data, options, height }) => {
  const style = {minHeight: {height}}
  return (
    <div style={style}>
      <Bar data={data} options={options}  height={height}/>
    </div>
  )
}
export const PieChart = ({ data, options, height }) => {
  const style = {minHeight: {height}}
  return (
    <div style={style}>
      <Pie data={data} options={options}  height={height}/>
    </div>
  )
}

