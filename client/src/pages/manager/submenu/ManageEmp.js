import React, { Suspense, useEffect, useState, useTransition } from 'react'
import { CardFillColorNonFooter } from '../../../components/Cards'
import { InputGroupWithLabel, SelectOptionWithLabel } from '../../../components/FormElements'
// import { MuiTable, TablesStriped } from '../../../components/Tables'
import Logo from '../../../assets/Logo.jpg'
import {  faPencil, faPlus, faSave, faTrash,faUserPlus, faUserTie  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import { EditDelete } from '../../../components/EditDelete'
import { Skeleton } from '@mui/material'
import { lazily } from 'react-lazily'
import { getEngineerDeptById, getEngineerDeptByManagerId } from '../../../controllers/manager/ManageEmpController'
import { ModalCard, ModalCardConfirm } from '../../../components/Modals'

const {MuiTable} = lazily(()=>import('../../../components/Tables'));

export const ManageEmployee = ({title, dataSets}) => {
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

export const InsEmp = ({title, options, optionsLocation, optionsType}) => {
    const [empData, setEmpData] = useState({
        data:{
            emp_id: '',
            name: '',
            surname: '',
            username: '',
            password: '',
            email: '',
            tel: '',
            location_id: '',
            role: '',
            type_engineer:'',
        },
        type_engineer: "disabled"
    })
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
                                    <InputGroupWithLabel id="input_emp_id" label="รหัสพนักงาน" type="text" placeholder="รหัสพนักงาน" />
                                </div>
                                <div className="col-md-4 col-12">
                                    <InputGroupWithLabel id="input_name" label="ชื่อ" type="text" placeholder="ชื่อ"/>
                                </div>
                                <div className="col-md-4 col-12">
                                    <InputGroupWithLabel id="input_surname" label="สกุล" type="text" placeholder="สกุล"/>
                                </div>
                                <div className="col-md-6 col-12">
                                    <InputGroupWithLabel id="input_username" label="ชื่อผู้ใช้งาน" type="text" placeholder="ชื่อผู้ใช้งาน"/>
                                </div>
                                <div className="col-md-6 col-12">
                                    <InputGroupWithLabel id="input_password" label="รหัสผ่าน" type="password" placeholder="รหัสผ่าน"/>
                                </div>
                                <div className="col-md-6 col-12">
                                    <InputGroupWithLabel id="input_email" label="อีเมล" type="text" placeholder="อีเมล"/>
                                </div>
                                <div className="col-md-6 col-12">
                                    <InputGroupWithLabel id="input_tel" label="เบอร์ติดต่อ" type="text" placeholder="เบอร์ติดต่อ"/>
                                </div>
                                <div className="col-md-4 col-12">
                                    <SelectOptionWithLabel id="select_location"  options_arr_obj={optionsLocation} label="สถานที่ทำงาน"/>
                                </div>
                                <div className="col-md-4 col-12">
                                    <SelectOptionWithLabel id="select_role"  options_arr_obj={options} label="ประเภทงาน"/>
                                </div>
                                <div className="col-md-4 col-12">
                                    <SelectOptionWithLabel id="select_type_engineer" label="แผนกช่าง" disable="disabled" options_arr_obj={optionsType}/>
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

export const Dept = ({title, arr_obj_location}) =>{
    const [engineerDept, setEngineerDept] = useState([]);
    const [modal, setModal] = useState({mHead:<></>, mBody:<></>})
    const [modalShow, setModalShow] = useState(false);
    const loadEngineerDept = async() => {
        const engineerDeptByManagerId = await getEngineerDeptByManagerId()
        setEngineerDept(engineerDeptByManagerId)
    }

    const showEditModal = async(dept_id) =>{
        await getEngineerDeptById(dept_id).then((selectedDept)=>{

            setModal({
                mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPencil}/>แก้ไขแผนกช่าง</h1>,
                mBody:(
                    <>
                        <div className="row">
                            <div className="col-12">
                                <InputGroupWithLabel value={selectedDept[0]['dept_code']} id="input_emp_id_modal" label="รหัสแผนก" type="text" placeholder="รหัสแผนก" callback={()=>{}}/>
                            </div>
                            <div className="col-12">
                                <InputGroupWithLabel value={selectedDept[0]['dept_name']} id="input_emp_id_modal" label="แผนกช่างซ่อม" type="text" placeholder="แผนกช่างซ่อม" callback={()=>{}}/>
                            </div>
                            <div className="col-12">
                                <SelectOptionWithLabel id="input_emp_id_modal" label="สถานที่" options_arr_obj={arr_obj_location} />
                            </div>
                        </div>
                    </>
                )
                
            })
        })
    }
    
    useEffect(()=>{
        loadEngineerDept()
    },[])

    const MuiTableData = {
        data: [
            ...engineerDept.map(item=>{
                return {
                            dept_code: item['dept_code'],
                            dept_name:item['dept_name'],
                            location_name: item['location_name'],
                            time_reg: `${item['time_reg'].split(/[\sT\s.]/)[0]} ${item['time_reg'].split(/[\sT\s.]/)[1]}`,
                            ED:<EditDelete setModalShow={setModalShow} EditFnc={()=>{showEditModal(item['dept_id'])}}/>
                        }
            })
        ],
        columns: [
            {title: "รหัสแผนก",field: "dept_code"},
            {title: "ชื่อแผนก",field: "dept_name"},
            {title: "สถานที่",field: "location_name"},
            {title: "วันที่เพิ่มข้อมูล",field: "time_reg"},
            {title: "",field: "ED"}
        ]

    }
    

    const template = (
        <div className="flex justify-content flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-lg m-0"><FontAwesomeIcon icon={faUserPlus}/> {title}</h2>
            </div>
            <hr />
            <div className="flex flex-col gap-2 max-h-screen overflow-auto">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 col-12">
                            <InputGroupWithLabel id="input_emp_id" label="รหัสแผนก" type="text" placeholder="รหัสแผนก" />
                        </div>
                        <div className="col-md-4 col-12">
                            <InputGroupWithLabel id="input_emp_id" label="แผนกช่างซ่อม" type="text" placeholder="แผนกช่างซ่อม" />
                        </div>
                        <div className="col-md-4 col-12">
                            <SelectOptionWithLabel id="input_emp_id" label="สถานที่" options_arr_obj={arr_obj_location} />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="btn btn-success w-1/4" ><FontAwesomeIcon icon={faSave}/> บันทึก</button>
                    </div>
                </div>
            </div>
        </div> 
    )   

    return(
        <>
            <CardFillColorNonFooter contentBody={template}/>
            <div className="mt-4">
                    <Suspense fallback={<Skeleton/>}>
                        <CardFillColorNonFooter contentBody={<MuiTable data={MuiTableData.data} columns={MuiTableData.columns} title=""/>} />
                    </Suspense>
            </div>
            <ModalCardConfirm setModalShow={setModalShow} modalShow={modalShow} modalBody={modal.mBody} modalHead={modal.mHead} cancleCallback={()=>{}} confrimCallback={()=>{}} btnOkText="บันทึก"/>
        </>
    )
}