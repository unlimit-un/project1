import React from 'react'
import Logo from '../../assets/demo.jpg'

const Navbar = () => {
  return (
    <>
        <nav class="navbar navbar-expand-lg bg-blue-400 ">
            <div class="container-fluid">
                <div className="row justify-between items-center w-full">
                    <div className="col-7">
                        <img src={Logo} alt="Logo.jpg" className="rounded-circle w-16 h-16"/>
                    </div>
                    <div className="flex items-center col">
                        <img src={Logo} alt="Logo.jpg" className="rounded-circle w-16 h-16"/>
                        <p className="mb-0 ml-5 text-blue-100 bold text-2xl">Unlimit unarn</p>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar