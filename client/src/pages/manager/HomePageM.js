import React from 'react'
import Card from '../../components/manager/Card'
import Navbar from '../../components/manager/NavbarM'
import { SidebarM } from '../../components/manager/SidebarM'
export const HomePageM = () => {
  return (
    <>
        <div className="bg-blue-100 min-h-screen">
            <Navbar/>
            <div className="row">
                <div className="col-lg-3 col-md-4 col-12">
                    <SidebarM/>
                </div>
                <div className="col-lg-9 col-md-8 col-12">
                    <Card/>
                </div>
            </div>
        </div>
    </>
  )
}
