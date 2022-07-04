import React from 'react'
import Logo from '../../assets/Logo.jpg'
import {  faUserTie  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'

function ManageEmp() {
  return (
    <> 
        <h1 className="text-2xl ms-4 mt-3"><FontAwesomeIcon icon={faUserTie}/> จัดการข้อมูลพนักงาน</h1>
        <div className="card card-body mt-3">
            <div className="flex justify-content flex-col">
                <h2 className="text-2xl ms-4"><FontAwesomeIcon icon={faUserTie}/> จัดการข้อมูลแม่บ้าน</h2>
               <div className="flex">
                    <img src={Logo} alt="logo.png" className="w-40 h-40 rounded"/>    
                    <div className="w-full">
                        <h1 className="ms-5">siriwimon</h1>
                        <ul className="ms-5">
                            <li>ชื่อผู้ใช้งาน :</li>
                            <li>อีเมล :</li>
                            <li>เบอร์โทร :</li>
                        </ul>  
                        <div className="d-flex justify-content-end ">
                            <Link to="/" className="text-success"> จัดการพนักงาน </Link>
                        </div>            
                    </div>  
               </div>
                <hr />
               <div className="flex">
                    <img src={Logo} alt="logo.png" className="w-40 h-40 rounded"/>    
                    <div className="w-full">
                        <h1 className="ms-5">siriwimon</h1>
                            <ul className="ms-5">
                                <li>ชื่อผู้ใช้งาน :</li>
                                <li>อีเมล :</li>
                                <li>เบอร์โทร :</li>
                            </ul> 
                            <div className="d-flex justify-content-end ">
                                <Link to="/" className="text-success"> จัดการพนักงาน </Link>
                            </div>               
                    </div>  
               </div>
               <hr/>
               <div className="flex">
                    <img src={Logo} alt="logo.png" className="w-40 h-40 rounded"/>    
                    <div className="w-full">
                        <h1 className="ms-5">siriwimon</h1>
                            <ul className="ms-5">
                                <li>ชื่อผู้ใช้งาน :</li>
                                <li>อีเมล :</li>
                                <li>เบอร์โทร :</li>
                            </ul> 
                            <div className="d-flex justify-content-end ">
                                <Link to="/" className="text-success"> จัดการพนักงาน </Link>
                            </div>               
                    </div>  
               </div>
            </div>    
        </div>
         
               
    
    </>
  )
}

export default ManageEmp