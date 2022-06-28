import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {

  const [ userData, setUserData ] = useState({
    username: '',
    password: ''
  })

  const navigate = useNavigate();

  const login_fnc = async (e) =>{
    e.preventDefault();
    const result = await axios.post(`http://localhost:3001/api/login`,
      {
        username: userData.username,
        password: userData.password,
        type: 'MANAGER'
      },
      {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true
      }
    )
    // console.log(result.data);
    localStorage.setItem('user_data', JSON.stringify(result.data));
    navigate('/manager');
  } 

  useEffect(() => {
    // localStorage.clear()
    console.log(localStorage.getItem('user_data'));
    // if (localStorage.getItem('user_data') !== undefined) {
    //   navigate('/manager');
    // }
  }, [])
  
  
  return (
    <>
      <div className="card card-body max-w-md">
        <div className="flex justify-center">
          <img src={Logo} alt="logo.png" className="w-40 h-40 rounded-circle" />
        </div>
        <h1 className="text-center">เข้าสู่ระบบ</h1>
        <hr className="my-16"/>
        <div className="flex flex-column mt-4">
          <form onSubmit={login_fnc}>
            <div className="input-group mb-3 input-group-lg">
              <input 
                type="text" 
                className="form-control" 
                placeholder="ชื่อผู้ใช้งาน"
                required
                onChange={({target:{value: val}})=>{
                  setUserData({...userData, username: val})
                }}
                />
              <span className="input-group-text"><FontAwesomeIcon icon={faUser}/></span>
            </div> 
            <div className="input-group mb-3 input-group-lg">
              <input 
                type="password" 
                className="form-control" 
                placeholder="รหัสผ่าน"
                required
                onChange={({target:{value: val}})=>{
                  setUserData({...userData, password: val})
                }}
              />
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
    </>
  )
}

export default Login