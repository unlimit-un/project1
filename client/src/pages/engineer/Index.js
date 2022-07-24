import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FooterM from '../../components/structure/FooterM'
import { NavbarEn } from '../../components/structure/NavbarM'
import { SidebarLeftEn } from '../../components/structure/SidebarM'
import { checkAutoRedirectUser } from '../../functions/AuthFunc'
import * as En from './ImportEn'
const Index = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    useEffect(()=>{
        checkAutoRedirectUser(navigate, pathname)
    },[])
    return (
        <>
            <div className="bg-white min-h-screen">
                <NavbarEn/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-xs-12 ps-0 md:block hidden">
                            <SidebarLeftEn />
                        </div>
                        <div className="col-lg-10 col-md-9 col-xs-12 px-0">
                            <div className="container-fluid my-3">
                                {
                                    pathname.includes('/engineer/work')?<En.Work/>:
                                    pathname.includes('/engineer/event')?<En.Event/>:
                                    pathname.includes('/engineer/urgent')?<En.Urgent/>:
                                    pathname.includes('/engineer/leave')?<En.Leave/>:
                                    pathname.includes('/engineer/repair')?<En.Repair/>:
                                    pathname.includes('/engineer/material')?<En.Material/>:
                                    pathname.includes('/engineer/notify')?<En.Notify/>:
                                    <En.Homepage/>
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