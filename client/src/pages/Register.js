import React, {useState} from 'react'
import axios from "axios";
import { InputGroupwitlabel } from '../components/FormElements';
import Swal from 'sweetalert2';
import {  useNavigate } from 'react-router-dom';

const Register = () => {

  const [userData,setUserData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    tel: '',
    email: ''

  })
  const navigate = useNavigate ();
  const register_fnc = async (e) =>{
    e.preventDefault();
    const result = await axios.post(`http://localhost:3001/api/register_manager`,{
      name: userData.name,
      surname: userData.surname,
      username: userData.username,
      password: userData.password,
      tel: userData.tel,
      email: userData.email,
      type: 'MANAGER'
    }, 
    {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      withCredentials: true
    }

    ).catch( async (error)=>{
        await Swal.fire({
          title: "ผิดพลาด",
          icon: "error",
          text: `${error.response.data}`
        })
    })
    if (result !== undefined &&result.status===200) {

        await Swal.fire({
        title: "สำเร็จ",
        icon: "success"
      }).then(()=>{
        navigate('/login');
      })
  }
  }
  
  const SetName = ({target:{value: val}})=>{
    setUserData({...userData,name: val})
   } 
  const SetSurname = ({target:{value: val}})=>{
    setUserData({...userData,surname: val})
   } 
   const SetUsername = ({target:{value: val}})=>{
    setUserData({...userData,username: val})
   }    
  const SetPassword= ({target:{value: val}})=>{
    setUserData({...userData,password: val})
   }
  const SetTel= ({target:{value: val}})=>{
    setUserData({...userData,tel: val})
   }
  const SetEmail= ({target:{value: val}})=>{
    setUserData({...userData,email: val})
   }

  return (
    <> 
       <div className="card card-body ">
        <div className="flex justify-center top-50 end-0">
          <form onSubmit={register_fnc}>

            <InputGroupwitlabel callback={SetName} id="input_name" label="ชื่อ"  placeholder="กรอกชื่อ" type="text" />
            <InputGroupwitlabel callback={SetSurname} id="input_surname" label="สกุล" placeholder="กรอกสกุล" type="text"/>
            <InputGroupwitlabel callback={SetUsername} id="input_username" label="ชื่อผู้ใช้งาน" placeholder="กรอกชื่อผู้ใช้งาน" type="text"/>
            <InputGroupwitlabel callback={SetPassword} id="input_password" label="รหัสผ่าน" placeholder="กรอกรหัสผ่าน" type="password"/>
            <InputGroupwitlabel callback={SetTel} id="input_tel" label="เบอร์โทร" placeholder="กรอกเบอร์โทร" type="text"/>
            <InputGroupwitlabel callback={SetEmail} id="input_email" label="email" placeholder="email" type="email"/>
         
           
            <div className="flex justify-center">
              <button className="!bg-green-400 text-white rounded-full p-3">ยืนยัน</button>
            </div>
          </form>
        </div>
       </div>
    </>
  )
}


export default Register