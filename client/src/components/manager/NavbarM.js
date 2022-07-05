import React from 'react'
import Logo from '../../assets/Logo.jpg'
import Demo from '../../assets/demo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faExclamationCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { ListGroupDropdownItem, ListGroupFlushWithLink } from './subComponents/ListGroup'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'

const Navbar = () => {
    // console.log(open.main_menu);
    const listGroup = [
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."}
    ]
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-blue-400 sticky-top">
            <div className="container-fluid">
                <div className="row justify-between items-center w-full">
                    <div className="col-7">
                        <img src={Logo} alt="Logo.jpg" className="rounded-circle w-12 h-12"/>
                    </div>
                    <div className="col-5">
                        <div className="flex flex-row items-center w-full justify-end">
                            {/* <div className="flex items-center">
                                <p className="mb-0 ml-5 text-blue-100 bold md:text-2xl text-lg">Unlimit unarn</p>
                            </div> */}
                            <div className="flex items-center gap-x-2">
                                <button 
                                    onClick={()=>{}}
                                    className="bg-blue-300 text-white text-xl rounded-circle w-12 h-12 md:hidden inline-block"
                                >
                                    <FontAwesomeIcon icon={faBars}/>
                                </button>
                                <Dropdown>
                                    <Dropdown.Toggle className="rounded-circle w-12 h-12 !bg-blue-300 text-white !border-blue-300">
                                        <FontAwesomeIcon icon={faBell}/>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{minWidth: "20rem" }} className="max-h-screen overflow-auto">
                                        <Dropdown.ItemText><h5 className="text-base"><FontAwesomeIcon icon={faExclamationCircle}/> รายการแจ้งเตือน</h5></Dropdown.ItemText>
                                        <ListGroupDropdownItem lists={listGroup}/>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <img src={Demo} alt="Demo.jpg" className="rounded-circle w-12 h-12"/>
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