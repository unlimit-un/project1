import React, { useEffect, useState } from 'react'
import Logo from '../../assets/demo.jpg'
import { Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faHome, faScrewdriverWrench, faUserGear, faTable, faBell, faClipboardList, faClipboardCheck, faBuilding, faPowerOff, faExclamationCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import { LinkMenuM } from './LinkMenuM';
import SubMenuItem from './SubMenuItem';
import {SignOutFunc} from '../../functions/AuthFunc'
import { useNavigate } from 'react-router-dom';
import { ListGroupFlushWithLink } from './subComponents/ListGroup';

export const SidebarLeftManager = ({ open, setOpen }) => {
    const navigate = useNavigate()
    const [classToggle, setClassToggle] = useState("");
    const onToggleMenu = (e) =>{
        setOpen({person:{status: !open.person.status}})
        !open.person.status?setClassToggle("!text-white !bg-blue-500"): setClassToggle("")
    }
    return (
        <>
            <div className="bg-blue-200 min-h-screen h-full">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mt-4 mb-2">
                        <img src={Logo} alt="profile.jpg" className="w-20 h-20 rounded-circle"/>
                        <p className="m-0 text-lg">Unlimit unarn</p>
                    </div>
                    <div className="container-fluid">
                        <ul className="list-group bg-white  text-sm">
                            <LinkMenuM path="/manager/" icon={faHome} label="หน้าหลัก" />
                            <li className="list-group-item p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenu(e)}
                                        aria-expanded = {open.person.status}
                                        aria-controls = {open.person.id} 
                                        className = {classToggle+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faUserGear}/> พนักงาน</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.person.status}>
                                    <div id={open.person.id} className="py-1">
                                        <ul className=" px-0 ">
                                            <SubMenuItem label={"แม่บ้าน"} path="/manager/manage_emp?p=maid"/>
                                            <SubMenuItem label={"ช่างซ่อม"} path="/manager/manage_emp?p=en"/>
                                            <SubMenuItem label={"ช่างซ่อมภายนอก"} path="/manager/manage_emp?p=os_en"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            
                            <LinkMenuM path="/manager/repair" icon={faBell} label="แจ้งซ่อม" />
                            <LinkMenuM path="/manager/material" icon={faScrewdriverWrench} label="วัสดุครุภัณฑ์" />
                            <LinkMenuM path="/manager/schedual_work" icon={faTable} label="ตารางงาน" />
                            <LinkMenuM path="/manager/leave" icon={faClipboardList} label="ประวัติการลา" />
                            <LinkMenuM path="/manager/request" icon={faClipboardCheck} label="คำขออนุมัติ" />
                            <LinkMenuM path="/manager/location" icon={faBuilding} label="จัดการสถานที่" />
                            <li className="list-group-item p-0 group  text-sm">
                                <button onClick={()=>SignOutFunc(navigate)} className="p-2 px-3 text-gray-600 no-underline w-100 block group-hover:!text-white hover:bg-red-500 ease-in-out duration-300 text-left">
                                    <FontAwesomeIcon icon={faPowerOff} className="text-black group-hover:!text-white ease-in-out duration-300"/> ออกจากระบบ
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export const SidebarRightManager = () =>{

    const listGroup = [
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."}
    ]
    
    return (
        <>
            <div className="card card-body">
                <h5 className="mb-3 text-base"><FontAwesomeIcon icon={faExclamationCircle}/> รายการแจ้งเตือน</h5>
                <ListGroupFlushWithLink lists={listGroup}/>
            </div>
        </>
    )
}
