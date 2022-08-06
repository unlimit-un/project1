import React, { Suspense, useEffect, useState } from 'react'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useParams} from 'react-router-dom'
import { Skeleton } from '../../components/Loading';
import { lazily } from 'react-lazily';
import { loadOptionLocation, loadOptionDept } from '../../functions/manager/ManageEmp';

const {ManageEmployee, Dept, InsEmp} = lazily(()=>import('./submenu/ManageEmp'))

function ManageEmp() {
    const {page} = useParams();
    const listGroup = [
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
    
    const [optionsLocation, setOptionsLocation] = useState([]);
    const [optionsDept, setOptionsDept] = useState([]);
    useEffect(()=>{
        loadOptionLocation(setOptionsLocation);
        loadOptionDept(setOptionsDept);
    },[])
    return (
        <> 
            <h1 className="text-2xl ms-4 mt-3"><FontAwesomeIcon icon={faUserCog}/> จัดการข้อมูลพนักงาน</h1>
            <div className="container-fluid">
            {
                page === "maid"? <Suspense fallback={ <Skeleton/>}><ManageEmployee title="จัดการแม่บ้าน" dataSets={listGroup}/></Suspense>:
                page === "en"? <Suspense fallback={ <Skeleton/>}><ManageEmployee title="จัดการช่างซ่อม" dataSets={listGroup}/></Suspense>:
                page === "os_en"? <Suspense fallback={ <Skeleton/>}><ManageEmployee title="จัดการช่างซ่อมภายนอก" dataSets={listGroup}/></Suspense>:
                page === "ins"? <Suspense fallback={ <Skeleton/>}><InsEmp title="เพิ่มพนักงานในระบบ" options={options} optionsLocation={optionsLocation} optionsDept={optionsDept}/></Suspense>:
                page === "dept"? <Suspense fallback={ <Skeleton/>}><Dept title="เพิ่มแผนกช่างซ่อม" arr_obj_location={optionsLocation}/></Suspense>:null
                
            }
            </div>
        </>
    )
}

export default ManageEmp