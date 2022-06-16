import React, { useState } from 'react'
import Logo from '../../assets/demo.jpg'
import { Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faHome, faScrewdriverWrench, faUserGear, faTable, faBell, faClipboardList, faClipboardCheck, faBuilding, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { LinkMenuM } from './LinkMenuM';
import SubMenuItem from './SubMenuItem';
const SidebarM = ({ open, setOpen }) => {
    console.log(open.main_menu.status);
    return (
        <>
            
                <div className="bg-blue-200 min-h-screen h-full">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center mt-4 mb-2">
                            <img src={Logo} alt="profile.jpg" className="w-20 h-20 rounded-circle"/>
                            <p className="m-0 text-lg">Unlimit unarn</p>
                        </div>
                        <div className="container-fluid">
                            <ul className="list-group bg-white">
                                <LinkMenuM path="/manager/" icon={faHome} label="หน้าหลัก" />
                                <li className="list-group-item p-0">
                                    <button
                                        onClick={()=>setOpen({person:{status: !open.person.status}, main_menu:open.main_menu})}
                                        aria-expanded = {open.person.status}
                                        aria-controls = {open.person.id} 
                                        className = "flex justify-between items-center w-100 p-2 px-3 bg-blue-500 text-white"
                                    >
                                        <span><FontAwesomeIcon icon={faUserGear}/> จัดการข้อมูลพนักงาน</span> 
                                        <FontAwesomeIcon icon={faAngleDown}/>
                                    </button>
                                    <Collapse in={open.person.status}>
                                        <div id={open.person.id} className="py-1">
                                            <ul className=" px-0">
                                                <SubMenuItem label={"แม่บ้าน"}/>
                                                <SubMenuItem label={"ช่างซ่อม"}/>
                                                <SubMenuItem label={"ช่างซ่อมภายนอก"}/>
                                            </ul>
                                        </div>
                                    </Collapse>
                                </li>
                                
                                <LinkMenuM path="/manager/" icon={faBell} label="แจ้งซ่อม" />
                                <LinkMenuM path="/manager/" icon={faScrewdriverWrench} label="วัสดุครุภัณฑ์" />
                                <LinkMenuM path="/manager/" icon={faTable} label="ตารางงาน" />
                                <LinkMenuM path="/manager/" icon={faClipboardList} label="ประวัติการลา" />
                                <LinkMenuM path="/manager/" icon={faClipboardCheck} label="คำขออนุมัติ" />
                                <LinkMenuM path="/manager/" icon={faBuilding} label="จัดการสถานที่" />
                                <li className="list-group-item p-0 group">
                                    <button className="p-2 px-3 text-gray-600 no-underline w-100 block group-hover:!text-white hover:bg-red-500 ease-in-out duration-300 text-left">
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

export default SidebarM
