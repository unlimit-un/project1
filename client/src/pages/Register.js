import React, {useState} from 'react'
import axios from "axios";

const Register = () => {

  const [userData,setUserData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    tel: '',
    email: ''

  })

  const register_fnc = async (e) =>{
    e.preventDefault();
    const result = await axios.post(`http://localhost:3001/api/register`,{
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
    })
    console.log(result);
  }


  return (
    <> Register
       <div className="card card-body ">
        <div className="flex justify-center">
          <form onSubmit={register_fnc} >
            <div className="mb-3">
              <label htmlFor="input_name" className="form-label">ชื่อ</label>
              <input type="text" className="form-control" id="input_name" placeholder="กรอกชื่อ" required
                onChange={({target:{value: val}})=>{
                 setUserData({...userData,name: val})
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="input_surname" className="form-label">สกุล</label>
              <input type="text" className="form-control" id="input_surname" placeholder="สกุล" required
                 onChange={({target:{value: val}})=>{
                  setUserData({...userData,surname: val})
                 }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="input_username" className="form-label">ชื่อผู้ใช้งาน</label>
              <input type="text" className="form-control" id="input_username" placeholder="ชื่อผู้ใช้งาน" required
                 onChange={({target:{value: val}})=>{
                  setUserData({...userData,username: val})
                 }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="input_password" className="form-label">รหัสผ่าน</label>
              <input type="password" className="form-control" id="input_password" placeholder="รหัสผ่าน" required
                 onChange={({target:{value: val}})=>{
                  setUserData({...userData,password: val})
                 }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="input_tel" className="form-label">เบอร์โทร</label>
              <input type="text" className="form-control" id="input_tel" placeholder="เบอร์โทร" required
                 onChange={({target:{value: val}})=>{
                  setUserData({...userData,tel: val})
                 }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="input_email" className="form-label">Email</label>
              <input type="email" className="form-control" id="input_email" placeholder="email" required
                 onChange={({target:{value: val}})=>{
                  setUserData({...userData,email: val})
                 }}
              />
            </div>
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