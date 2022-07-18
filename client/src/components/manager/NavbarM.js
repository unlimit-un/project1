import React, { useRef } from 'react'
import Logo from '../../assets/Logo.jpg'

import Demo from '../../assets/business-man.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faExclamationCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { ListGroupDropdownItem, ListGroupFlushWithLink } from './subComponents/ListGroup'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { Link } from 'react-router-dom'

const Navbar = () => {
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

export default Navbar