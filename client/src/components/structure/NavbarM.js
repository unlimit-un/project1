import React, { useRef } from 'react'
import Logo from '../../assets/Logo.jpg'
import Demo from '../../assets/business-man.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faExclamationCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'react-bootstrap'
import { ListGroupDropdownItem } from '../ListGroup'
import { Link } from 'react-router-dom'

export const NavbarHomepage = () =>{
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-blue-400">
            <div className="container-fluid transition-all duration-300">
                <Link to="/" className="text-3xl text-white nav-link hover:!text-pink-500 "> หน้าหลัก </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex justify-content-between" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link to="/" className="text-3xl text-white nav-link hover:!text-pink-500"> สถานที่ทั้งหมด </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/" className="text-3xl text-white nav-link hover:!text-pink-500"> ต่อติด </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/" className="text-3xl text-white nav-link hover:!text-pink-500"> เกี่ยวกับ </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link to="/login" className="text-3xl text-white nav-link hover:!text-pink-500"> เข้าสู่ระบบ </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/register" className="text-3xl text-white nav-link hover:!text-pink-500"> สมัครสมาชิก </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export const NavbarManager = () => {
    // console.log(open.main_menu);
    const listGroup = [
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."}
    ]
    const ref = useRef();
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-blue-50 sticky-top shadow-slate-100 shadow-md p-0">
            <div className="container-fluid">
                <div className="row justify-between items-stretch w-full ">
                    <div className="col-lg-2 col-3 px-0 py-0 bg-blue-0">
                        <img src={Logo} alt="Logo.jpg" className="rounded-circle w-12 h-12 my-2 ms-3"/>
                    </div>
                    <div className="col-lg-10 col-9 py-2">
                        <div className="flex flex-row items-center w-full justify-end">
                            {/* <div className="flex items-center">
                                <p className="mb-0 ml-5 text-blue-100 bold md:text-2xl text-lg">Unlimit unarn</p>
                            </div> */}
                            <div className="flex items-center gap-x-2">
                                <Link 
                                    to="/manager/bookmarks"
                                    className="bg-blue-300 text-white text-xl rounded-circle w-12 h-12 md:hidden  flex items-center justify-center"
                                >
                                    <FontAwesomeIcon icon={faBars}/>
                                </Link>
                                <Dropdown>
                                    <Dropdown.Toggle className="rounded-circle w-12 h-12 !bg-blue-300 text-white !border-blue-300">
                                        <FontAwesomeIcon icon={faBell}/>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{minWidth: "20rem" }} className="max-h-screen overflow-auto" ref={ref}>
                                        <Dropdown.ItemText><h5 className="text-base"><FontAwesomeIcon icon={faExclamationCircle}/> รายการแจ้งเตือน</h5></Dropdown.ItemText>
                                        <Dropdown.ItemText className="!w-fit ms-auto">
                                            <Link to="/manager/notify" onClick={()=>ref.current.className=ref.current.className.replace('show','')} ><h5 className="text-sm text-right text-primary m-0"> ดูทั้งหมด</h5></Link>
                                        </Dropdown.ItemText>
                                        <ListGroupDropdownItem lists={listGroup}/>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <img src={Demo} alt="business-man.png" className="rounded-circle w-12 h-12"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}


export const NavbarMaid = () => {
    // console.log(open.main_menu);
    const listGroup = [
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."}
    ]
    const ref = useRef();
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-blue-50 sticky-top shadow-slate-100 shadow-md p-0">
            <div className="container-fluid">
                <div className="row justify-between items-stretch w-full ">
                    <div className="col-lg-2 col-3 px-0 py-0 bg-blue-0">
                        <img src={Logo} alt="Logo.jpg" className="rounded-circle w-12 h-12 my-2 ms-3"/>
                    </div>
                    <div className="col-lg-10 col-9 py-2">
                        <div className="flex flex-row items-center w-full justify-end">
                            {/* <div className="flex items-center">
                                <p className="mb-0 ml-5 text-blue-100 bold md:text-2xl text-lg">Unlimit unarn</p>
                            </div> */}
                            <div className="flex items-center gap-x-2">
                                <Link 
                                    to="/maid/bookmarks"
                                    className="bg-blue-300 text-white text-xl rounded-circle w-12 h-12 md:hidden  flex items-center justify-center"
                                >
                                    <FontAwesomeIcon icon={faBars}/>
                                </Link>
                                <Dropdown>
                                    <Dropdown.Toggle className="rounded-circle w-12 h-12 !bg-blue-300 text-white !border-blue-300">
                                        <FontAwesomeIcon icon={faBell}/>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{minWidth: "20rem" }} className="max-h-screen overflow-auto" ref={ref}>
                                        <Dropdown.ItemText><h5 className="text-base"><FontAwesomeIcon icon={faExclamationCircle}/> รายการแจ้งเตือน</h5></Dropdown.ItemText>
                                        <Dropdown.ItemText className="!w-fit ms-auto">
                                            <Link to="/maid/notify" onClick={()=>ref.current.className=ref.current.className.replace('show','')} ><h5 className="text-sm text-right text-primary m-0"> ดูทั้งหมด</h5></Link>
                                        </Dropdown.ItemText>
                                        <ListGroupDropdownItem lists={listGroup}/>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <img src={Demo} alt="business-man.png" className="rounded-circle w-12 h-12"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}