import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.jpg'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { InputGroupIconsSupfix, RadioInline } from '../components/FormElements';

import { checkAutoRedirectUser, LoginFunc } from "../functions/AuthFunc";

const Login = () => { 
  const [ userData, setUserData ] = useState({
    username: '',
    password: '',
    type: ''
  })
  
  const navigate = useNavigate();  
  useEffect(() => {
    
    (async ()=>{
     
      await checkAutoRedirectUser(navigate);
      
    })()

  }, [])
  
  const setUsername = ({target:{value: val}})=>{
    setUserData({...userData, username: val})
  }
  const setPassword = ({target:{value: val}})=>{
    setUserData({...userData, password: val})
  }
  const setType = ({target:{value: val}})=>{
    setUserData({...userData, type: val})
  }
  
  return (
    <>
      <div className="card card-body max-w-md">
        <div className="flex justify-center">
          <img src={Logo} alt="logo.png" className="w-40 h-40 rounded-circle" />
        </div>
        <h1 className="text-center">เข้าสู่ระบบ</h1>
        <hr className="my-16"/>
        <div className="flex flex-column mt-4">
          <form 
            onSubmit={(e)=>{
                e.preventDefault();
                console.log(userData);
                LoginFunc(userData, navigate)
              }
            }
          >
            <InputGroupIconsSupfix callback={setUsername} type="text" placeholder="ชื่อผู้ใช้งาน" icon={faUser}/>
            <InputGroupIconsSupfix callback={setPassword} type="password" placeholder="รหัสผ่าน" icon={faKey}/>
            
            <RadioInline id="manager" label="หัวหน้างาน" value="MANAGER" name="type" callback={setType}/>
            <RadioInline id="maid" label="แม่บ้าน" value="MAID" name="type" callback={setType}/>
            <RadioInline id="engineer" label="ช่างซ่อม" value="ENGINEER" name="type" callback={setType}/>

            <div className="flex justify-center">
              <button className="bg-green-500 text-white rounded-full p-3 hover:bg-green-400 transition-all ease-in-out duration-100">เข้าสู่ระบบ</button>
            </div>
          </form>
          <div className="flex justify-center mt-2">
            <Link to="/register" className="text-danger mx-auto"> สมัครสมาชิก </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login