import React, { useState } from 'react'
import Logo from '../../assets/demo.jpg'
import { Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faHome, faScrewdriverWrench, faUserGear, faTable, faBell, faClipboardList, faClipboardCheck, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { LinkMenuM } from './LinkMenuM';
const SidebarM = () => {
    const [open, setOpen] = useState({
        person: {
            status: false,
            id: 'person'
        }
    });
    return (
        <>
            <div className="bg-blue-200 min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mt-4 mb-2">
                        <img src={Logo} alt="profile.jpg" className="w-20 h-20 rounded-circle"/>
                        <p className="m-0 text-lg">Unlimit unarn</p>
                    </div>
                    <div className="container-fluid">
                        <ul className="list-none bg-white flex flex-col gap-3 py-2 px-0 m-0">
                            <LinkMenuM path="/manager/" icon={faHome} label="หน้าหลัก" />
                            <li>
                                <button
                                    onClick={()=>setOpen({person:{status: !open.person.status}})}
                                    aria-expanded = {open.person.status}
                                    aria-controls = {open.person.id} 
                                    className = "flex justify-between items-center w-100 px-2 border-b-2"
                                >
                                    <span><FontAwesomeIcon icon={faUserGear}/> จัดการข้อมูลพนักงาน</span> 
                                    <FontAwesomeIcon icon={faAngleDown}/>
                                </button>
                                <Collapse in={open.person.status}>
                                    <div id={open.person.id} className="border-b-2 py-1">
                                        <ul className=" px-0">
                                            <li><Link className="px-2 no-underline text-black w-100 block" to="/" as="a">แม่บ้าน </Link></li>
                                            <li><Link className="px-2 no-underline text-black w-100 block" to="/" as="a">ช่างซ่อม </Link></li>
                                            <li><Link className="px-2 no-underline text-black w-100 block" to="/" as="a">ช่างซ่อมภายนอก </Link></li>
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
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SidebarM
