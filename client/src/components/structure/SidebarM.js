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
    });
    const navigate = useNavigate()
    const [classTogglePerson, setClassTogglePerson] = useState("");
    const [classToggleSchedual, setClassToggleSchedual] = useState("");
    const [classToggleLeave, setClassToggleLeave] = useState("");
    const [userData, setUserData] = useState({})
    
    const loadUserData = async () =>{
        const userData = await ManagerController.getUserData();
        setUserData(userData[0])
        console.log(userData[0]);
    }

    useEffect(()=>{
        loadUserData();
    },[])
    
    useEffect(()=>{
        open.person.status?setClassTogglePerson("!text-white !bg-blue-500"): setClassTogglePerson("")
        open.schedual.status?setClassToggleSchedual("!text-white !bg-blue-500"): setClassToggleSchedual("")
        open.leave.status?setClassToggleLeave("!text-white !bg-blue-500"): setClassToggleLeave("")
    },[open])    
    
    const resetDropDown = (e) =>{
        setOpen({...open, person:{status: false}, schedual: { status: false}, leave: { status: false}})
    }

    const onToggleMenuPerson = (e) =>{
        setOpen({...open, person:{status: !open.person.status}, schedual: { status: false}, leave:{status: false}})
        
    }
    const onToggleMenuSchedual = (e) =>{
        setOpen({...open, schedual:{status: !open.schedual.status}, person:{status: false}, leave:{status: false}})
        
    }
    const onToggleMenuLeave = (e) =>{
        setOpen({...open, leave:{status: !open.leave.status}, person:{status: false}, schedual:{status: false}})
        
    }

    return (
        <>
            <div className="bg-blue-50 min-h-screen h-full ">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mt-4 mb-3">
                        <img src={Logo} alt="business-man.png" className="w-20 h-20 rounded-circle shadow"/>
                        <p className="m-2 text-lg">{userData['manager_name']} {userData['manager_surname']}</p>
                        <small>??????????????????????????????</small>
                    </div>
                    <div className="w-full">
                        <ul className=" text-sm m-1 p-2">
                            <LinkMenuM path="/manager" icon={faHome} label="????????????????????????" resetDropDown={resetDropDown}/>
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuPerson(e)}
                                        aria-expanded = {open.person.status}
                                        aria-controls = {open.person.id} 
                                        className = {classTogglePerson+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faUserGear}/> ?????????????????????</span> 
                                        <FontAwesomeIcon className={`group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100 ${open.person.status?'rotate-180 ':'rotate-0 '}`} icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.person.status}>
                                    <div id={open.person.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"?????????????????????"} path="/manager/manage_emp/maid"/>
                                            <SubMenuLink label={"????????????????????????"} path="/manager/manage_emp/en"/>
                                            <SubMenuLink label={"??????????????????????????????????????????"} path="/manager/manage_emp/os_en"/>
                                            <SubMenuLink label={"??????????????????????????????????????????????????????"} path="/manager/manage_emp/ins"/>
                                            <SubMenuLink label={"???????????????????????????????????????????????????"} path="/manager/manage_emp/dept"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            
                            <LinkMenuM path="/manager/repair" icon={faBell} label="????????????????????????" resetDropDown={resetDropDown}/>
                            <LinkMenuM path="/manager/material" icon={faScrewdriverWrench} label="???????????????????????????????????????" resetDropDown={resetDropDown}/>

                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuSchedual(e)}
                                        aria-expanded = {open.schedual.status}
                                        aria-controls = {open.schedual.id} 
                                        className = {classToggleSchedual+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faTable}/> ???????????????????????????????????????</span> 
                                        <FontAwesomeIcon className={`group-hover:!text-white group-hover:bg-blue-500 transition-all ease-in-out duration-100 ${open.schedual.status?'rotate-180 ':'rotate-0'}`} icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.schedual.status}>
                                    <div id={open.schedual.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"?????????????????????????????????????????????"} path="/manager/schedual_work/dashboard"/>
                                            <SubMenuLink label={"????????????????????????????????????????????????"} path="/manager/schedual_work/maid"/>
                                            <SubMenuLink label={"??????????????????????????????????????????????????????"} path="/manager/schedual_work/event"/>
                                            <SubMenuLink label={"???????????????????????????"} path="/manager/schedual_work/team"/>
                                            <SubMenuLink label={"???????????????????????????????????????"} path="/manager/schedual_work/urgent"/>
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
                                        <span><FontAwesomeIcon icon={faClipboardList}/> ???????????????</span> 
                                        <FontAwesomeIcon className={`group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100 ${open.leave.status?'rotate-180 ':'rotate-0'}`} icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.leave.status}>
                                    <div id={open.leave.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"?????????????????????????????????"} path="/manager/leave/dashboard"/>
                                            <SubMenuLink label={"?????????????????????????????????"} path="/manager/leave/type"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <LinkMenuM path="/manager/request" icon={faClipboardCheck} label="?????????????????????????????????" resetDropDown={resetDropDown}/>
                            <LinkMenuM path="/manager/location" icon={faBuilding} label="???????????????????????????????????????" resetDropDown={resetDropDown}/>
                            <li className=" p-0 group  text-sm">
                                <button onClick={()=>SignOutFunc(navigate)} className="p-2 px-3 text-gray-600 no-underline w-100 block group-hover:!text-white hover:bg-red-500 ease-in-out duration-300 text-left">
                                    <FontAwesomeIcon icon={faPowerOff} className="text-black group-hover:!text-white ease-in-out duration-300"/> ??????????????????????????????
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
        {title:"unlimit", icon: faUsers, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."}
    ]
    
    return (
        <>
            <div className="card card-body" style={{maxHeight: `${maxHeight/16}rem`, overflow: "auto",}}>
                <h5 className="mb-3 text-base"><FontAwesomeIcon icon={faExclamationCircle}/> ??????????????????????????????????????????</h5>
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
        },
        leave: {
            status: false,
            id: 'leave'
        }
    });
    const navigate = useNavigate()
    const [classToggleWork, setClassToggleWork] = useState("");
    const [classToggleActivity, setClassToggleActivity] = useState("");
    const [classToggleLeave, setClassToggleLeave] = useState("");
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
        open.leave.status?setClassToggleLeave("!text-white !bg-blue-500") : setClassToggleLeave("")
    },[open])

    const onToggleMenuWork = (e) =>{
        setOpen({...open, work:{status: !open.work.status}, event: { status: false}, leave: {status: false}})
    }
    const onToggleMenuActivity = (e) =>{
        setOpen({...open, event:{status: !open.event.status}, work:{status: false}, leave: {status: false}})
    }
    const onToggleMenuLeave = (e) =>{
        setOpen({...open, leave:{status: !open.leave.status}, work:{status: false}, event:{ status: false}})
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
                        <p className="m-2 text-lg">{userdata['maid_name']} {userdata['maid_surname']} </p>
                        <small>?????????????????????</small>
                    </div>
                    <div className="w-full">
                        <ul className=" text-sm m-1 p-2">
                            <LinkMenuM path="/maid" icon={faHome} label="????????????????????????" resetDropDown={resetDropDown}/>
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuWork(e)}
                                        aria-expanded = {open.work.status}
                                        aria-controls = {open.work.id} 
                                        className = {classToggleWork+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faUserGear}/> ????????????????????????</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.work.status}>
                                    <div id={open.work.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"????????????????????????"} path="/maid/work/schedule"/>
                                            <SubMenuLink label={"?????????"} path="/maid/work/todo"/>
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
                                        <span><FontAwesomeIcon icon={faUserGear}/> ????????????????????????????????????</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.event.status}>
                                    <div id={open.event.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"????????????????????????????????????????????????"} path="/maid/event/todo"/>
                                            <SubMenuLink label={"??????????????????????????????????????????????????????????????????"} path="/maid/event/done"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <LinkMenuM path="/maid/urgent" icon={faBell} label="?????????????????????" resetDropDown={resetDropDown} />
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuLeave(e)}
                                        aria-expanded = {open.leave.status}
                                        aria-controls = {open.leave.id} 
                                        className = {classToggleLeave+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faTable}/> ???????????????</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.leave.status}>
                                    <div id={open.leave.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"???????????????????????????"} path="/maid/leave/request"/>
                                            <SubMenuLink label={"????????????????????????????????????"} path="/maid/leave/history"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <LinkMenuM path="/maid/repair" icon={faClipboardList} label="????????????????????????" resetDropDown={resetDropDown}/>
                            <LinkMenuM path="/maid/material" icon={faClipboardCheck} label="????????????????????????????????????????????????" resetDropDown={resetDropDown}/>
                            <li className=" p-0 group  text-sm">
                                <button onClick={()=>SignOutFunc(navigate)} className="p-2 px-3 text-gray-600 no-underline w-100 block group-hover:!text-white hover:bg-red-500 ease-in-out duration-300 text-left">
                                    <FontAwesomeIcon icon={faPowerOff} className="text-black group-hover:!text-white ease-in-out duration-300"/> ??????????????????????????????
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
        {title:"unlimit", icon: faWarning, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."}
    ]
    
    return (
        <>
            <div className="card card-body" style={{maxHeight: `${maxHeight/16}rem`, overflow: "auto",}}>
                <h5 className="mb-3 text-base"><FontAwesomeIcon icon={faWarning}/> ???????????????????????????????????????</h5>
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
        },
        leave: {
            status: false,
            id: 'leave'
        }
    });
    const navigate = useNavigate()
    const [classToggleWork, setClassToggleWork] = useState("");
    const [classToggleActivity, setClassToggleActivity] = useState("");
    const [classToggleLeave, setClassToggleLeave] = useState("");
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
        open.leave.status?setClassToggleLeave("!text-white !bg-blue-500") : setClassToggleLeave("")
    },[open])

    const onToggleMenuWork = (e) =>{
        setOpen({...open, work:{status: !open.work.status}, event: { status: false}, leave: {status: false}})
    }
    const onToggleMenuActivity = (e) =>{
        setOpen({...open, event:{status: !open.event.status}, work:{status: false}, leave: {status: false}})
    }
    const onToggleMenuLeave = (e) =>{
        setOpen({...open, leave:{status: !open.leave.status}, work:{status: false}, event:{ status: false}})
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
                        <p className="m-2 text-lg">{userData['engineer_name']} {userData['engineer_surname']}</p>
                        <small className='text-center'>????????????????????????<br/>{userData['dept_name']}</small>
                    </div>
                    <div className="w-full">
                        <ul className=" text-sm m-1 p-2">
                            <LinkMenuM path="/engineer" icon={faHome} label="????????????????????????" resetDropDown={resetDropDown}/>
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuWork(e)}
                                        aria-expanded = {open.work.status}
                                        aria-controls = {open.work.id} 
                                        className = {classToggleWork+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faUserGear}/> ?????????</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.work.status}>
                                    <div id={open.work.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"???????????????????????????"} path="/engineer/work/dept"/>
                                            <SubMenuLink label={"???????????????????????????"} path="/engineer/work/todo"/>
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
                                        <span><FontAwesomeIcon icon={faUserGear}/> ????????????????????????????????????</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.event.status}>
                                    <div id={open.event.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"????????????????????????????????????????????????"} path="/engineer/event/todo"/>
                                            <SubMenuLink label={"??????????????????????????????????????????????????????????????????"} path="/engineer/event/done"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <LinkMenuM path="/engineer/urgent" icon={faBell} label="?????????????????????" resetDropDown={resetDropDown} />
                            <li className=" p-0">
                                <div className="group">
                                    <button
                                        onClick={(e)=>onToggleMenuLeave(e)}
                                        aria-expanded = {open.leave.status}
                                        aria-controls = {open.leave.id} 
                                        className = {classToggleLeave+" flex justify-between items-center w-100 p-2 px-3 text-start group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-300"}
                                    >
                                        <span><FontAwesomeIcon icon={faTable}/> ???????????????</span> 
                                        <FontAwesomeIcon className="group-hover:!text-white group-hover:bg-blue-500 ease-in-out duration-100" icon={faAngleDown}/>
                                    </button>
                                </div>
                                <Collapse in={open.leave.status}>
                                    <div id={open.leave.id} className="py-2">
                                        <ul className=" px-3 ">
                                            <SubMenuLink label={"???????????????????????????"} path="/engineer/leave/request"/>
                                            <SubMenuLink label={"????????????????????????????????????"} path="/engineer/leave/history"/>
                                        </ul>
                                    </div>
                                </Collapse>
                            </li>
                            <LinkMenuM path="/engineer/material" icon={faClipboardCheck} label="????????????????????????????????????????????????" resetDropDown={resetDropDown}/>
                            <li className=" p-0 group  text-sm">
                                <button onClick={()=>SignOutFunc(navigate)} className="p-2 px-3 text-gray-600 no-underline w-100 block group-hover:!text-white hover:bg-red-500 ease-in-out duration-300 text-left">
                                    <FontAwesomeIcon icon={faPowerOff} className="text-black group-hover:!text-white ease-in-out duration-300"/> ??????????????????????????????
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
        {title:"unlimit", icon: faWarning, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faWarning, path:"/", link_name:"?????????????????????????????????????????????",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."}
    ]
    
    return (
        <>
            <div className="card card-body" style={{maxHeight: `${maxHeight/16}rem`, overflow: "auto",}}>
                <h5 className="mb-3 text-base"><FontAwesomeIcon icon={faWarning}/> ???????????????????????????</h5>
                <ListGroupFlushWithLink lists={listGroup}/>
            </div>
        </>
    )
}
