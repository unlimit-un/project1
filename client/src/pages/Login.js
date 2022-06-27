import React from 'react'
import Logo from '../assets/Logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
        <div className="card card-body max-w-md">
          <div className="">
            <div className="flex justify-center">
              <img src={Logo} alt="logo.png" className="w-40 h-40 rounded-circle" />
            </div>
            <h1 className="text-center">เข้าสู่ระบบ</h1>
            <hr className="my-16"/>
            <div className="flex flex-column mt-4">
              <form>
                <div className="input-group mb-3 input-group-lg">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="ชื่อผู้ใช้งาน"/>
                  <span className="input-group-text"><FontAwesomeIcon icon={faUser}/></span>
                </div>
                <div className="input-group mb-3 input-group-lg">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="รหัสผ่าน"/>
                  <span className="input-group-text"><FontAwesomeIcon icon={faKey}/></span>
                </div>
                <div className="flex justify-center">
                  <button className="!bg-green-400 text-white rounded-full p-3">เข้าสู่ระบบ</button>
                </div>
                <div className="flex justify-center mt-2">
                  <Link to="/register" className="text-danger mx-auto"> สมัครสมาชิก </Link>
                </div>
                  
              </form>
            </div>
          </div>
        </div>
    </>
  )
}

export default Login