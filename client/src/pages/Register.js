import React, {useEffect, useState} from 'react'
import axios from "axios";
import { InputGroupWithLabel } from '../components/FormElements';
import Swal from 'sweetalert2';
import { Link , useNavigate } from 'react-router-dom';
import { RegisterFncManager } from '../functions/AuthFunc';
import Resizer from 'react-image-file-resizer'
import DemoImage from "../assets/business-man.png";

const Register = () => {

  const [userData,setUserData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    tel: '',
    email: '',
    image: {}
  })
  const [preview, setPreview] = useState()
  const navigate = useNavigate()
  
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
  const SetImage= ({target:{files}})=>{
    let fileInput = false;
    if (files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          files[0],
          200,
          200,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            setUserData({...userData,image: uri})
          },
          "file",
          150,
          150
        );
      } catch (err) {
        console.log(err);
      }
    }
    
   }
  
  useEffect(()=>{
    
    if (userData.image.size !== undefined) {
      const render = new FileReader();
      render.onloadend = () =>{
        setPreview(render.result)
      }
      render.readAsDataURL(userData.image)
    }else{
      setPreview(null)
    }
  },[userData.image])

  return (
    <> 
      <div className="card card-body ">
        <div className="flex justify-center flex-column">
        <h1 className="text-center">ระบบลงทะเบียน</h1>
          <div className="flex flex-column mt-6">
          <form onSubmit={(e)=>{
              e.preventDefault()
              console.log(userData);
              RegisterFncManager(userData, navigate)
          }}>
            <InputGroupWithLabel callback={SetName} id="input_name" label="ชื่อ"  placeholder="กรอกชื่อ" type="text" />
            <InputGroupWithLabel callback={SetSurname} id="input_surname" label="สกุล" placeholder="กรอกสกุล" type="text"/>
            <InputGroupWithLabel callback={SetUsername} id="input_username" label="ชื่อผู้ใช้งาน" placeholder="กรอกชื่อผู้ใช้งาน" type="text"/>
            <InputGroupWithLabel callback={SetPassword} id="input_password" label="รหัสผ่าน" placeholder="กรอกรหัสผ่าน" type="password"/>
            <InputGroupWithLabel callback={SetTel} id="input_tel" label="เบอร์โทร" placeholder="กรอกเบอร์โทร" type="text"/>
            <InputGroupWithLabel callback={SetEmail} id="input_email" label="email" placeholder="email" type="email"/>
            <InputGroupWithLabel callback={SetImage} id="input_file" label="รูปภาพ" placeholder="file" type="file"/>
            <div className="max-h-60 overflow-auto shadow-lg">
              <div className="flex justify-center py-3">
                <img src={preview?preview:DemoImage} alt={preview}/>
              </div>
            </div>
           
            <div className="flex justify-center">
              <button className="btn btn-primary mt-3">ยืนยัน</button>
            </div>
          </form>
          <div className="flex justify-center mt-2">
            <Link to="/login" className="text-info mx-auto"> มีบัญชีอยู่แล้ว เข้าสู่ระบบ </Link>
          </div>
          </div>
         </div>
      </div>
    </>
  )
}


export default Register