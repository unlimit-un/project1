import React, { Suspense, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FooterM from '../../components/structure/FooterM'
import { NavbarMaid } from '../../components/structure/NavbarM'
import { SidebarLeftMaid } from '../../components/structure/SidebarM'
import { checkAutoRedirectUser } from '../../functions/AuthFunc'
import * as Maid from './ImportMaid'
const Index = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    useEffect(()=>{
        checkAutoRedirectUser(navigate, pathname)
    },[])
    return (
        <>
            <div className="bg-white min-h-screen">
                <NavbarMaid/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-xs-12 ps-0 md:block hidden">
                            <SidebarLeftMaid />
                        </div>
                        <div className="col-lg-10 col-md-9 col-xs-12 px-0">
                            <div className="container-fluid my-3">
                                {
                                    pathname.includes('/maid/work')?<Maid.Work/>:
                                    pathname.includes('/maid/event')?<Maid.Event/>:
                                    pathname.includes('/maid/urgent')?<Maid.Urgent/>:
                                    pathname.includes('/maid/leave')?<Maid.Leave/>:
                                    pathname.includes('/maid/repair')?<Maid.Repair/>:
                                    pathname.includes('/maid/material')?<Maid.Material/>:
                                    pathname.includes('/maid/notify')?<Maid.Notify/>:
                                    <Maid.HomepageMaid/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <FooterM/>
            </div>
        </>
    )
}

export default Index