import React from 'react'
import { Line } from "react-chartjs-2";

export const LineChart = ({ data, options, height }) => {
  const style = {minHeight: {height}}
  return (
    <div style={style}>
      <Line data={data} options={options}  height={height}/>
    </div>
  )
}

