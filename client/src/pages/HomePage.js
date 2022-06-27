import React from 'react'
import { Link, useLocation, matchRoutes } from 'react-router-dom'
import backgrond_img from '../assets/bg-homepage.png'
import Login from './Login'

const HomePage = () => {

const {pathname} = useLocation()

  const homepage = (
    <div className="flex flex-column justify-center text-center">
      <h1 className=""> Maintenance works and Housekeeper's works Management System </h1>
      <div className="flex flex-column overflow-hidden gap-0">

        <Link to="/manager/" as="a" className="text-xl !text-pink-500  no-underline hover:scale-150 transition-all duration-300" > หน้าหลัก </Link>
        <Link to="/login/" as="a" className="text-xl !text-pink-500  no-underline hover:scale-150 transition-all duration-300 p-2" > เข้าสู่ระบบ </Link>
      </div>
    </div>
  );
  
  return (
    <>
      <div className="bg-blue-200 min-h-screen grid md:grid-cols-2 grid-cols-1 justify-items-center items-center">
          
          <img src={backgrond_img} alt="background.jpg" className=""/>
          {pathname === '/'?homepage:<Login/>}
          

      </div>
    </>
  )
}

export default HomePage
