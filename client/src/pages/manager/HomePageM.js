import React from 'react'
import Navbar from '../../components/manager/NavbarM'
import { SidebarM } from '../../components/manager/SidebarM'
export const HomePageM = () => {
  return (
    <>
        <div className="bg-blue-100 min-h-screen">
            <Navbar/>
            <div className="row">
                <div className="col-lg-2 col-md-3 col-12">
                    <SidebarM/>
                </div>
                <div className="col-lg-10 col-md-9 col-12"></div>
            </div>
        </div>
    </>
  )
}
