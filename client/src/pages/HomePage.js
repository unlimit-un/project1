import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import backgrond_img from '../assets/bg-homepage.png'
import Login from './Login'
import Register from './Register'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const HomePage = () => {

const {pathname} = useLocation()

  const homepage = (
    <div className="flex flex-column justify-center text-center ">
      <h1 className=""> Maintenance works and Housekeeper's works Management System </h1> <br/>
      <h1 className="text-blue-500">สร้างความมีประสิทธิภาพให้พนักงานของคุณด้วยเว็ปลงเวลาทำงานและจัดการตารางงานออนไลน์</h1><br/>
      <div className="">
        <h2 className=""><FontAwesomeIcon className="text-green-500" icon={faCheck}/>จัดการตารางพนักงาน</h2>
        <h2 className=""><FontAwesomeIcon className="text-green-500" icon={faCheck}/>คำนวณวันขาด,ลา,มาสาย</h2>
        <h2 className=""><FontAwesomeIcon className="text-green-500" icon={faCheck}/>แสดงสต็อก real time</h2>
      </div>
    </div>
    
      
  );

  const imgLogin = (
    <div className="col flex items-center md:static absolute bottom-0 left-0">
      <img src={backgrond_img} alt="background.jpg" className="min-h-full"/>
    </div>
  )
  const imgHome = (
    <div className="col flex items-center justify-center">
      <img src={backgrond_img} alt="background.jpg" className=" md:h-full h-96"/>
    </div>
  )
  // console.log(pathname);
  
  return (
    <>
    
      <nav className="navbar navbar-expand-lg navbar-light bg-blue-600">
        <div className="container-fluid">
          <Link to="/" className="text-3xl text-white nav-link"> หน้าหลัก </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse flex justify-content-between" id="navbarNav">
          
            <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="text-3xl text-white nav-link"> สถานที่ทั้งหมด </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="text-3xl text-white nav-link"> ต่อติด </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="text-3xl text-white nav-link"> เกี่ยวกับ </Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/login" className="text-3xl text-white nav-link"> เข้าสู่ระบบ </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="text-3xl text-white nav-link"> สมัครสมาชิก </Link>
                </li>
              </ul>
          </div>
        
      </div>
    </nav>
      <div className="bg-blue-200 container-fluid min-h-screen flex items-center justify-center relative">
          <div className="my-5">
            <div className="md:grid md:grid-cols-2 grid-cols-1 flex flex-col-reverse">
              {pathname === '/'?imgHome:imgLogin}
              <div className="col d-flex justify-center z-10">
              {pathname === '/'?homepage: pathname === '/login/' || pathname === '/login'?<Login/>:<Register/>}
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default HomePage
