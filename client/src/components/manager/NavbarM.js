import React from 'react'
import Logo from '../../assets/Logo.jpg'
import Demo from '../../assets/demo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons'

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
                                <button className="bg-blue-300 text-white rounded-circle w-12 h-12 text-xl"><FontAwesomeIcon icon={faBell}/></button>
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