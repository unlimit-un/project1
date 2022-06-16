import React from 'react'
import Logo from '../../assets/Logo.jpg'
import Demo from '../../assets/demo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ open, setOpen}) => {
    // console.log(open.main_menu);
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-blue-400 ">
            <div className="container-fluid">
                <div className="row justify-between items-center w-full">
                    <div className="col-7">
                        <img src={Logo} alt="Logo.jpg" className="rounded-circle md:w-16 md:h-16 w-12 h-12"/>
                    </div>
                    <div className="col-5">
                        <div className="flex flex-row items-center w-full justify-between">
                            <div className="flex items-center">
                                <img src={Demo} alt="Demo.jpg" className="rounded-circle md:w-16 md:h-16 w-12 h-12"/>
                                <p className="mb-0 ml-5 text-blue-100 bold md:text-2xl text-lg">Unlimit unarn</p>
                            </div>
                            <button 
                            onClick={()=>setOpen({main_menu: {status: !open.main_menu.status} , person:open.person})}
                            aria-expanded = {open.main_menu.status}
                            aria-controls = {open.main_menu.id} 
                            className="bg-blue-300 text-white rounded-circle w-10 h-10 md:hidden inline-block"><FontAwesomeIcon icon={faBars}/></button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar