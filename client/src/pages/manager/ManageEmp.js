import React from 'react'
import Logo from '../../assets/Logo.jpg'
import {  faPlus, faUserCog, faUserPlus, faUserTie  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link, useParams} from 'react-router-dom'
import { CardFillColorNonFooter } from '../../components/manager/subComponents/Cards'
import { InputGroupwitlabel, SelectOptionWithLabel } from '../../components/FormElements'

const ManageEmployee = ({title, dataSets}) => {
    
    const template = (
        <div className="flex justify-content flex-col">
            <h2 className="text-lg"><FontAwesomeIcon icon={faUserTie}/> {title}</h2>
            <div className="flex flex-col gap-2 max-h-screen overflow-auto">
                {
                    dataSets.map((item, index)=>{
                        return(
                            <div key={index}>
                                <div className="flex justify-center items-center flex-col md:flex-row gap-3 ">
                                    <img src={Logo} alt="logo.png" className="w-40 h-40 rounded"/>    
                                    <div className="w-full">
                                        <div className="flex justify-center md:justify-start">
                                            <h1 className="m-0">{item.name}</h1>
                                        </div>
                                        <div className="container">
                                            <div className="flex md:justify-start justify-center gap-3">
                                                <ul className="m-0 p-0">
                                                    <li>ชื่อผู้ใช้งาน</li>
                                                    <li>email</li>
                                                    <li>tel</li>
                                                </ul>
                                                <ul className="m-0 p-0">
                                                    <li>: {item.username}</li>
                                                    <li>: {item.email}</li>
                                                    <li>: {item.tel}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end me-4">
                                            <Link to="/" className="text-success"> จัดการพนักงาน </Link>
                                        </div>            
                                    </div> 
                                </div>
                                <hr />
                            </div>
                        )
                        
                    })
                }
                
            </div>
        </div>    
    )

    return (
        <>
            <CardFillColorNonFooter contentBody={template}/>
        </>
    )
}

const InsEmp = ({title, options, optionsLocation}) => {
    const template = (
        <div className="flex justify-content flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-lg m-0"><FontAwesomeIcon icon={faUserPlus}/> {title}</h2>
                <button className="btn btn-success"><FontAwesomeIcon icon={faPlus}/>เพิ่มพนักงาน</button>
            </div>
            <hr />
            <div className="flex flex-col gap-2 max-h-screen overflow-auto">
                <div className="container-fluid">
                    <div className="row gap-y-5">
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="flex flex-col items-center gap-y-3">
                                <img src={Logo} alt="demo.jpg" className="w-40 h-40 rounded" />
                                <input type="file" name="" id="" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="row">
                                <div className="col-md-4 col-12">
                                    <InputGroupwitlabel id="input_name" label="รหัสพนักงาน" type="text"/>
                                </div>
                                <div className="col-md-4 col-12">
                                    <InputGroupwitlabel id="input_name" label="ชื่อ" type="text"/>
                                </div>
                                <div className="col-md-4 col-12">
                                    <InputGroupwitlabel id="input_name" label="สกุล" type="text"/>
                                </div>
                                <div className="col-md-6 col-12">
                                    <InputGroupwitlabel id="input_name" label="ชื่อผู้ใช้งาน" type="text"/>
                                </div>
                                <div className="col-md-6 col-12">
                                    <InputGroupwitlabel id="input_name" label="รหัสผ่าน" type="text"/>
                                </div>
                                <div className="col-md-6 col-12">
                                    <InputGroupwitlabel id="input_name" label="อีเมล" type="text"/>
                                </div>
                                <div className="col-md-6 col-12">
                                    <InputGroupwitlabel id="input_name" label="เบอร์ติดต่อ" type="text"/>
                                </div>
                                <div className="col-md-4 col-12">
                                    <SelectOptionWithLabel id="select_role"  options={optionsLocation} label="สถานที่ทำงาน"/>
                                </div>
                                <div className="col-md-4 col-12">
                                    <SelectOptionWithLabel id="select_role"  options={options} label="ประเภทงาน"/>
                                </div>
                                <div className="col-md-4 col-12">
                                    <InputGroupwitlabel id="input_name" label="เบอร์ติดต่อ" type="text" disable="disabled"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
    return (
        <>
            <CardFillColorNonFooter contentBody={template} />
        </>
    )
}


function ManageEmp() {
    const {page} = useParams();
    const listGroup = [
        {username:"unlimit", name: "unlimit unarn", email:"unlimit@gmail.com", tel:"0123456789", img:""},
        {username:"unlimit", name: "unlimit unarn", email:"unlimit@gmail.com", tel:"0123456789", img:""},
        {username:"unlimit", name: "unlimit unarn", email:"unlimit@gmail.com", tel:"0123456789", img:""},
        {username:"unlimit", name: "unlimit unarn", email:"unlimit@gmail.com", tel:"0123456789", img:""},
        {username:"unlimit", name: "unlimit unarn", email:"unlimit@gmail.com", tel:"0123456789", img:""},
    ]
    const options = [
        {value: "maid", text: "แม่บ้าน"},
        {value: "en", text: "ช่างซ่อม"},
        {value: "os_en", text: "ช่างซ่อมภายนอก"},
    ]
    const optionsLocation = [
        {value: "1", text: "ตึก A"},
        {value: "2", text: "ตึก B"},
        {value: "3", text: "ตึก C"},
    ]
    return (
        <> 
            <h1 className="text-2xl ms-4 mt-3"><FontAwesomeIcon icon={faUserCog}/> จัดการข้อมูลพนักงาน</h1>
            {
                page === "maid"? <ManageEmployee title="จัดการแม่บ้าน" dataSets={listGroup}/>:
                page === "en"? <ManageEmployee title="จัดการช่างซ่อม" dataSets={listGroup}/>:
                page === "os_en"? <ManageEmployee title="จัดการช่างซ่อมภายนอก" dataSets={listGroup}/>:
                page === "ins"? <InsEmp title="เพิ่มพนักงานในระบบ" options={options} optionsLocation={optionsLocation}/>:null
                
            }
        </>
    )
}

export default ManageEmp