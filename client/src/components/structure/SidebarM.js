import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/business-man.png'
import { Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faHome, faScrewdriverWrench, faUserGear, faTable, faBell, faClipboardList, faClipboardCheck, faBuilding, faPowerOff, faExclamationCircle, faUsers, faWarning } from "@fortawesome/free-solid-svg-icons";
import { LinkMenuM, SubMenuLink } from '../LinkMenuM';
import {SignOutFunc} from '../../functions/AuthFunc'
import { useNavigate } from 'react-router-dom';
import { ListGroupFlushWithLink } from '../ListGroup';
import * as EngineerController from '../../controllers/engineer/UserControllers'
import * as MaidControllers from '../../controllers/maid/UserControllers'
import * as ManagerController from '../../controllers/manager/UsersController'

export const SidebarLeftManager = () => {
    const [open, setOpen] = useState({
        person: {
            status: false,
            id: 'person'
        },
        schedual: {
            status: false,
            id: 'schedual'
        },
        leave: {
            status: false,
            id: 'leave'
        },
        maid_duty: {
            status: false,
            id: 'maid_duty'
        },
    });
    const navigate = useNavigate()
    const [classTogglePerson, setClassTogglePerson] = useState("");
    const [classToggleSchedual, setClassToggleSchedual] = useState("");
    const [classToggleLeave, setClassToggleLeave] = useState("");
    const [classToggleMaidDuty, setClassToggleMaidDuty] = useState("");
    const [userData, setUserData] = useState({});
    const [userImage, setUserImage] = useState(null);
    
    const loadUserData = async () =>{
        const userData = await ManagerController.getUserData();
        const userImg = await ManagerController.getImageOfUser();
        setUserImage(userImg)
        setUserData(userData[0])
    }

    useEffect(()=>{
        loadUserData();
    },[])
    
    useEffect(()=>{
        open.person.status?setClassTogglePerson("!text-white !bg-blue-500"): setClassTogglePerson("")
        open.schedual.status?setClassToggleSchedual("!text-white !bg-blue-500"): setClassToggleSchedual("")
        open.leave.status?setClassToggleLeave("!text-white !bg-blue-500"): setClassToggleLeave("")
        open.maid_duty.status?setClassToggleMaidDuty("!text-white !bg-blue-500"): setClassToggleMaidDuty("")
    },[open])    
    
    const resetDropDown = (e) =>{
        setOpen({...open, person:{status: false}, schedual: { status: false}, leave: { status: false}})
    }

    const onToggleMenuPerson = (e) =>{
        setOpen({...open, person:{status: !open.person.status}, schedual: { status: false}, leave:{status: false}, maid_duty:{status: false}})
        
    }
    const onToggleMenuSchedual = (e) =>{
        setOpen({...open, schedual:{status: !open.schedual.status}, person:{status: false}, leave:{status: false}, maid_duty:{status: false}})
        
    }
    const onToggleMenuLeave = (e) =>{
        setOpen({...open, leave:{status: !open.leave.status}, person:{status: false}, schedual:{status: false}, maid_duty:{status: false}})
        
    }
    const onToggleMenuMaidDuty = (e) =>{
        setOpen({...open, maid_duty:{status: !open.maid_duty.status}, person:{status: false}, schedual:{status: false}, leave:{status: false}})
        
    }
    return (
        <>
            <div className="bg-blue-50 min-h-screen h-full ">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mt-4 mb-3">
                        
                        <img src={userImage} alt="business-man.png" className="w-20 h-20 rounded-circle shadow"/>
                        <p className="m-2 text-lg truncate w-40 text-center">{userData['manager_name']} {userData['manager_surname']}</p>
                        <small>หัวหน้างาน</small>
                    </div>
                    <div className="w-full">
                        <ul className=" text-sm m-1 p-2">
                            <LinkMenuM path="/manager" icon={faHome} label="หน้าหลัก" resetDropDown={resetDropDown}/>
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuPerson(e)}
                                        aria-expanded = {open.person.status}
                                        aria-controls = {open.person.id} 
                                        className = {classTogglePerson+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faUserGear}/> พนักงาน</span> 
                                        <FontAwesomeIcon className={`group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100 ${open.person.status?'rotate-180 ':'rotate-0 '}`} icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.person.status}>
                                    <div id={open.person.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"แม่บ้าน"} path="/manager/manage_emp/maid"/>
                                            <SubMenuLink label={"ช่างซ่อม"} path="/manager/manage_emp/en"/>
                                            <SubMenuLink label={"ช่างซ่อมภายนอก"} path="/manager/manage_emp/os_en"/>
                                            <SubMenuLink label={"เพิ่มพนักงานในระบบ"} path="/manager/manage_emp/ins"/>
                                            <SubMenuLink label={"เพิ่มแผนกช่างซ่อม"} path="/manager/manage_emp/dept"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            
                            <LinkMenuM path="/manager/repair" icon={faBell} label="แจ้งซ่อม" resetDropDown={resetDropDown}/>
                            <LinkMenuM path="/manager/material" icon={faScrewdriverWrench} label="วัสดุครุภัณฑ์" resetDropDown={resetDropDown}/>
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuMaidDuty(e)}
                                        aria-expanded = {open.maid_duty.status}
                                        aria-controls = {open.maid_duty.id} 
                                        className = {classToggleMaidDuty+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faTable}/> งานแม่บ้าน</span> 
                                        <FontAwesomeIcon className={`group-hover:!text-white group-hover:bg-blue-500 transition-all ease-in-out duration-100 ${open.maid_duty.status?'rotate-180 ':'rotate-0'}`} icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.maid_duty.status}>
                                    <div id={open.maid_duty.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"ปฏิทินแม่บ้าน"} path="/manager/maid_duty/calendar"/>
                                            <SubMenuLink label={"เวรแม่บ้าน"} path="/manager/maid_duty/schedule"/>
                                            <SubMenuLink label={"งานแม่บ้าน"} path="/manager/maid_duty/duty"/>
                                            <SubMenuLink label={"อุปกรณ์งานแม่บ้าน"} path="/manager/maid_duty/material"/>
                                            <SubMenuLink label={"ตรวจสอบงาน"} path="/manager/maid_duty/check"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuSchedual(e)}
                                        aria-expanded = {open.schedual.status}
                                        aria-controls = {open.schedual.id} 
                                        className = {classToggleSchedual+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faTable}/> งานและกิจกรรม</span> 
                                        <FontAwesomeIcon className={`group-hover:!text-white group-hover:bg-blue-500 transition-all ease-in-out duration-100 ${open.schedual.status?'rotate-180 ':'rotate-0'}`} icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.schedual.status}>
                                    <div id={open.schedual.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"ตารางงานทั้งหมด"} path="/manager/schedual_work/dashboard"/>
                                            <SubMenuLink label={"จัดงานกิจกรรมพิเศษ"} path="/manager/schedual_work/event"/>
                                            <SubMenuLink label={"จัดการทีม"} path="/manager/schedual_work/team"/>
                                            <SubMenuLink label={"จัดการงานด่วน"} path="/manager/schedual_work/urgent"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuLeave(e)}
                                        aria-expanded = {open.leave.status}
                                        aria-controls = {open.leave.id} 
                                        className = {classToggleLeave+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faClipboardList}/> การลา</span> 
                                        <FontAwesomeIcon className={`group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100 ${open.leave.status?'rotate-180 ':'rotate-0'}`} icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.leave.status}>
                                    <div id={open.leave.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"ข้อมูลการลา"} path="/manager/leave/dashboard"/>
                                            <SubMenuLink label={"ประเภทการลา"} path="/manager/leave/type"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <LinkMenuM path="/manager/request" icon={faClipboardCheck} label="คำขออนุมัติ" resetDropDown={resetDropDown}/>
                            <LinkMenuM path="/manager/location" icon={faBuilding} label="จัดการสถานที่" resetDropDown={resetDropDown}/>
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

export const SidebarLeftMaid = () => {
    const [open, setOpen] = useState({
        work: {
            status: false,
            id: 'work'
        },
        event: {
            status: false,
            id: 'event'
        }
    });
    const navigate = useNavigate()
    const [classToggleWork, setClassToggleWork] = useState("");
    const [classToggleActivity, setClassToggleActivity] = useState("");
    const [userdata ,setUserData] = useState({})

    const loadUserData = async () =>{
        const userData = await MaidControllers.GetUserData();
        setUserData(userData[0])
    }
    
   
    useEffect(()=>{
        loadUserData();
    },[])
    
    useEffect(()=>{
        open.work.status?setClassToggleWork("!text-white !bg-blue-500") : setClassToggleWork("")
        open.event.status?setClassToggleActivity("!text-white !bg-blue-500") : setClassToggleActivity("")
    },[open])

    const onToggleMenuWork = (e) =>{
        setOpen({...open, work:{status: !open.work.status}, event: { status: false}})
    }
    const onToggleMenuActivity = (e) =>{
        setOpen({...open, event:{status: !open.event.status}, work:{status: false}})
    }
    const resetDropDown = (e) =>{
        setOpen({...open, work:{status: false}, event: { status: false}})
    }

    return (
        <>
            <div className="bg-blue-50 min-h-screen h-full ">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mt-4 mb-3">
                        <img src={Logo} alt="business-man.png" className="w-20 h-20 rounded-circle shadow"/>
                        <p className="m-2 text-lg truncate w-40 text-center">{userdata['maid_name']} {userdata['maid_surname']} </p>
                        <small>แม่บ้าน</small>
                    </div>
                    <div className="w-full">
                        <ul className=" text-sm m-1 p-2">
                            <LinkMenuM path="/maid" icon={faHome} label="หน้าหลัก" resetDropDown={resetDropDown}/>
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
                                            <SubMenuLink label={"ตารางเวร"} path="/maid/work/schedule"/>
                                            <SubMenuLink label={"งาน"} path="/maid/work/todo"/>
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
                                            <SubMenuLink label={"ปฏิทิน"} path="/maid/event/calendar"/>
                                            <SubMenuLink label={"กิจกรรมที่ต้องทำ"} path="/maid/event/todo"/>
                                            <SubMenuLink label={"งานกิจกรรมที่เสร็จแล้ว"} path="/maid/event/done"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <LinkMenuM path="/maid/urgent" icon={faBell} label="งานด่วน" resetDropDown={resetDropDown} />
                            <LinkMenuM path="/maid/leave" icon={faTable} label="การลา" resetDropDown={resetDropDown} />
                            <LinkMenuM path="/maid/repair" icon={faClipboardList} label="แจ้งซ่อม" resetDropDown={resetDropDown}/>
                            <LinkMenuM path="/maid/material" icon={faClipboardCheck} label="สั่งซื้อครุภัณฑ์" resetDropDown={resetDropDown}/>
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

export const SidebarLeftEn = () => {
    const [open, setOpen] = useState({
        work: {
            status: false,
            id: 'work'
        },
        event: {
            status: false,
            id: 'event'
        }
    });
    const navigate = useNavigate()
    const [classToggleWork, setClassToggleWork] = useState("");
    const [classToggleActivity, setClassToggleActivity] = useState("");
    const [userData, setUserData] = useState({})

    const LoadUserData = async () =>{
        const userData = await EngineerController.getUserData();
        setUserData(userData[0]);
        console.log(userData[0]);
    }

    useEffect(()=>{
        LoadUserData();
    },[])

    useEffect(()=>{
        open.work.status?setClassToggleWork("!text-white !bg-blue-500") : setClassToggleWork("")
        open.event.status?setClassToggleActivity("!text-white !bg-blue-500") : setClassToggleActivity("")
    },[open])

    const onToggleMenuWork = (e) =>{
        setOpen({...open, work:{status: !open.work.status}, event: { status: false}})
    }
    const onToggleMenuActivity = (e) =>{
        setOpen({...open, event:{status: !open.event.status}, work:{status: false}})
    }
    const resetDropDown = (e) =>{
        setOpen({...open, work:{status: false}, event: { status: false}, leave: { status: false}})
    }

    return (
        <>
            <div className="bg-blue-50 min-h-screen h-full ">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mt-4 mb-3">
                        <img src={Logo} alt="business-man.png" className="w-20 h-20 rounded-circle shadow"/>
                        <p className="my-2 text-lg truncate w-40 text-center">{userData['engineer_name']} {userData['engineer_surname']}</p>
                        <small className='text-center'>ช่างซ่อม<br/>{userData['dept_name']}</small>
                    </div>
                    <div className="w-full">
                        <ul className=" text-sm m-1 p-2">
                            <LinkMenuM path="/engineer" icon={faHome} label="หน้าหลัก" resetDropDown={resetDropDown}/>
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuWork(e)}
                                        aria-expanded = {open.work.status}
                                        aria-controls = {open.work.id} 
                                        className = {classToggleWork+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faUserGear}/> งาน</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.work.status}>
                                    <div id={open.work.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"งานในแผนก"} path="/engineer/work/dept"/>
                                            <SubMenuLink label={"งานของฉัน"} path="/engineer/work/todo"/>
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
                                            <SubMenuLink label={"ปฏิทิน"} path="/engineer/event/calendar"/>
                                            <SubMenuLink label={"กิจกรรมที่ต้องทำ"} path="/engineer/event/todo"/>
                                            <SubMenuLink label={"งานกิจกรรมที่เสร็จแล้ว"} path="/engineer/event/done"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <LinkMenuM path="/engineer/urgent" icon={faBell} label="งานด่วน" resetDropDown={resetDropDown} />
                            <LinkMenuM path="/engineer/leave" icon={faTable} label="การลา" resetDropDown={resetDropDown} />
                            <LinkMenuM path="/engineer/material" icon={faClipboardCheck} label="สั่งซื้อครุภัณฑ์" resetDropDown={resetDropDown}/>
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

export const SidebarRightEn = ({maxHeight}) =>{
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
                <h5 className="mb-3 text-base"><FontAwesomeIcon icon={faWarning}/> งานในแผนก</h5>
                <ListGroupFlushWithLink lists={listGroup}/>
            </div>
        </>
    )
}
