import React from 'react'
import { Link } from 'react-router-dom'


export const HomePage = () => {
  return (
    <>
      <div className="bg-blue-200 min-h-screen">
        
        <h1> Maintenance works and Housekeeper's works 
Management System </h1>

        <Link to="/manager/" className="text-xl text-pink-500" > เข้าสู่หน้าหลัก </Link>
      </div>
    </>
  )
}
