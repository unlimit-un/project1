import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/business-man.png'
import { Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faHome, faScrewdriverWrench, faUserGear, faTable, faBell, faClipboardList, faClipboardCheck, faBuilding, faPowerOff, faExclamationCircle, faUsers, faWarning } from "@fortawesome/free-solid-svg-icons";
import { LinkMenuM, SubMenuLink } from '../LinkMenuM';
import {SignOutFunc} from '../../functions/AuthFunc'
import { useNavigate } from 'react-router-dom';
import { ListGroupFlushWithLink } from '../ListGroup';

export const SidebarLeftManager = ({ open, setOpen }) => {
    const navigate = useNavigate()
    const [classTogglePerson, setClassTogglePerson] = useState("");
    const [classToggleSchedual, setClassToggleSchedual] = useState("");
    

    const onToggleMenuPerson = (e) =>{
        setOpen({...open, person:{status: !open.person.status}, schedual: { status: false}})
        !open.person.status?setClassTogglePerson("!text-white !bg-blue-500"): setClassTogglePerson("")
        setClassToggleSchedual("")
    }
    const onToggleMenuSchedual = (e) =>{
        setOpen({...open, schedual:{status: !open.schedual.status}, person:{status: false}})
        !open.schedual.status?setClassToggleSchedual("!text-white !bg-blue-500"): setClassToggleSchedual("")
        setClassTogglePerson("")
    }

    return (
        <>
            <div className="bg-blue-50 min-h-screen h-full ">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mt-4 mb-3">
                        <img src={Logo} alt="business-man.png" className="w-20 h-20 rounded-circle shadow"/>
                        <p className="m-2 text-lg">Unlimit unarn</p>
                        <small>หัวหน้างาน</small>
                    </div>
                    <div className="w-full">
                        <ul className=" text-sm m-1 p-2">
                            <LinkMenuM path="/manager" icon={faHome} label="หน้าหลัก" />
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuPerson(e)}
                                        aria-expanded = {open.person.status}
                                        aria-controls = {open.person.id} 
                                        className = {classTogglePerson+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faUserGear}/> พนักงาน</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.person.status}>
                                    <div id={open.person.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"แม่บ้าน"} path="/manager/manage_emp/maid"/>
                                            <SubMenuLink label={"ช่างซ่อม"} path="/manager/manage_emp/en"/>
                                            <SubMenuLink label={"ช่างซ่อมภายนอก"} path="/manager/manage_emp/os_en"/>
                                            <SubMenuLink label={"เพิ่มพนักงานในระบบ"} path="/manager/manage_emp/ins"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            
                            <LinkMenuM path="/manager/repair" icon={faBell} label="แจ้งซ่อม" />
                            <LinkMenuM path="/manager/material" icon={faScrewdriverWrench} label="วัสดุครุภัณฑ์" />

                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuSchedual(e)}
                                        aria-expanded = {open.schedual.status}
                                        aria-controls = {open.schedual.id} 
                                        className = {classToggleSchedual+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faTable}/> งานและกิจกรรม</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.schedual.status}>
                                    <div id={open.schedual.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"ตารางงานทั้งหมด"} path="/manager/schedual_work/dashboard"/>
                                            <SubMenuLink label={"จัดการงานแม่บ้าน"} path="/manager/schedual_work/maid"/>
                                            <SubMenuLink label={"จัดงานกิจกรรมพิเศษ"} path="/manager/schedual_work/event"/>
                                            <SubMenuLink label={"จัดการทีม"} path="/manager/schedual_work/team"/>
                                            <SubMenuLink label={"จัดการงานด่วน"} path="/manager/schedual_work/urgent"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <LinkMenuM path="/manager/leave" icon={faClipboardList} label="ประวัติการลา" />
                            <LinkMenuM path="/manager/request" icon={faClipboardCheck} label="คำขออนุมัติ" />
                            <LinkMenuM path="/manager/location" icon={faBuilding} label="จัดการสถานที่" />
                            <li className=" p-0 group  text-sm">
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

export const SidebarRightManager = ({maxHeight}) =>{
    const listGroup = [
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."}
    ]
    
    return (
        <>
            <div className="card card-body" style={{maxHeight: `${maxHeight/16}rem`, overflow: "auto",}}>
                <h5 className="mb-3 text-base"><FontAwesomeIcon icon={faExclamationCircle}/> รายการแจ้งซ่อม</h5>
                <ListGroupFlushWithLink lists={listGroup}/>
            </div>
        </>
    )
}

export const SidebarLeftMaid = ({ open, setOpen }) => {
    const navigate = useNavigate()
    const [classToggleWork, setClassToggleWork] = useState("");
    const [classToggleActivity, setClassToggleActivity] = useState("");
    const [classToggleLeave, setClassToggleLeave] = useState("");
    

    const onToggleMenuWork = (e) =>{
        setOpen({...open, work:{status: !open.work.status}, event: { status: false}, leave: { status: false}})
        !open.work.status?setClassToggleWork("!text-white !bg-blue-500"): setClassToggleWork("")
        setClassToggleActivity("")
        setClassToggleLeave("")
    }
    const onToggleMenuActivity = (e) =>{
        setOpen({...open, event:{status: !open.event.status}, work:{status: false}, leave: {status: false}})
        !open.event.status?setClassToggleActivity("!text-white !bg-blue-500"): setClassToggleActivity("")
        setClassToggleWork("")
        setClassToggleLeave("")
    }
    const onToggleMenuLeave = (e) =>{
        setOpen({...open, leave:{status: !open.leave.status}, work:{status: false}, event:{ status: false}})
        !open.leave.status?setClassToggleLeave("!text-white !bg-blue-500"): setClassToggleLeave("")
        setClassToggleWork("")
        setClassToggleActivity("")
    }

    return (
        <>
            <div className="bg-blue-50 min-h-screen h-full ">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mt-4 mb-3">
                        <img src={Logo} alt="business-man.png" className="w-20 h-20 rounded-circle shadow"/>
                        <p className="m-2 text-lg">min min</p>
                        <small>แม่บ้าน</small>
                    </div>
                    <div className="w-full">
                        <ul className=" text-sm m-1 p-2">
                            <LinkMenuM path="/maid" icon={faHome} label="หน้าหลัก" />
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuWork(e)}
                                        aria-expanded = {open.work.status}
                                        aria-controls = {open.work.id} 
                                        className = {classToggleWork+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faUserGear}/> ตารางเวร</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.work.status}>
                                    <div id={open.work.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"งานที่ต้องทำ"} path="/maid/work/todo"/>
                                            <SubMenuLink label={"งานที่เสร็จแล้ว"} path="/maid/work/done"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuActivity(e)}
                                        aria-expanded = {open.event.status}
                                        aria-controls = {open.event.id} 
                                        className = {classToggleActivity+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faUserGear}/> ตารางกิจกรรม</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.event.status}>
                                    <div id={open.event.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"กิจกรรมที่ต้องทำ"} path="/maid/event/todo"/>
                                            <SubMenuLink label={"งานกิจกรรมที่เสร็จแล้ว"} path="/maid/event/done"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <LinkMenuM path="/maid/urgent" icon={faBell} label="งานด่วน" />
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuLeave(e)}
                                        aria-expanded = {open.leave.status}
                                        aria-controls = {open.leave.id} 
                                        className = {classToggleLeave+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faTable}/> การลา</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.leave.status}>
                                    <div id={open.leave.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"คำขอการลา"} path="/maid/leave/request"/>
                                            <SubMenuLink label={"ประวัติการลา"} path="/maid/leave/stat"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <LinkMenuM path="/maid/repair" icon={faClipboardList} label="แจ้งซ่อม" />
                            <LinkMenuM path="/maid/material" icon={faClipboardCheck} label="สั่งซื้อครุภัณฑ์" />
                            <li className=" p-0 group  text-sm">
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

export const SidebarRightMaid = ({maxHeight}) =>{
    const listGroup = [
        {title:"unlimit", icon: faWarning, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."}
    ]
    
    return (
        <>
            <div className="card card-body" style={{maxHeight: `${maxHeight/16}rem`, overflow: "auto",}}>
                <h5 className="mb-3 text-base"><FontAwesomeIcon icon={faWarning}/> รายการงานด่วน</h5>
                <ListGroupFlushWithLink lists={listGroup}/>
            </div>
        </>
    )
}
