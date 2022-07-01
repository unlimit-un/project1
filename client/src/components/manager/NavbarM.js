import React from 'react'
import Logo from '../../assets/Logo.jpg'
import Demo from '../../assets/demo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'react-bootstrap'

const Navbar = () => {
    // console.log(open.main_menu);
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-blue-400 ">
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
                                        <Dropdown.Toggle className="!bg-blue-300 !border-blue-300 text-white rounded-circle w-12 h-12 text-xl" >
                                            <FontAwesomeIcon icon={faBell}/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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