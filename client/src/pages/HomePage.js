import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <>
      <div className="bg-blue-200 min-h-screen">
        <Link to="/manager/" className="text-xl text-pink-500" > manager </Link>
      </div>
    </>
  )
}
