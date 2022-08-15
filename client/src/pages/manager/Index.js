
import React, { lazy, Suspense, useEffect, useState} from 'react'

import { NavbarManager } from '../../components/structure/NavbarM'
import {SidebarLeftManager} from '../../components/structure/SidebarM'
import FooterM from '../../components/structure/FooterM'
import { checkAutoRedirectUser } from '../../functions/AuthFunc'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Manager from './ImportManager'

const IndexManager = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    
    useEffect(() => {
        checkAutoRedirectUser(navigate, pathname);
    },[])

    if (pathname.includes('/manager/bookmarks')) {
        return(<Manager.Bookmarks/>)
    }
    return (
        <>
            <div className="bg-white min-h-screen">
                <NavbarManager/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-xs-12 ps-0 md:block hidden">
                            <SidebarLeftManager/>
                        </div>
                        <div className="col-lg-10 col-md-9 col-xs-12 px-0">
                            <div className="container-fluid my-3">
                                {
                                    
                                    pathname.includes('/manager/manage_emp')?<Manager.ManageEmp/>:
                                    pathname.includes('/manager/material')?<Manager.Material/>:
                                    pathname.includes('/manager/leave')?<Manager.Leave/>:
                                    pathname.includes('/manager/request')?<Manager.Request/>:
                                    pathname.includes('/manager/repair')?<Manager.Repair/>:
                                    pathname.includes('/manager/schedual_work')?<Manager.SchedualWork/>:
                                    pathname.includes('/manager/notify')?<Manager.Notify/>:
                                    pathname.includes('/manager/location')?<Manager.Location/>:
                                    pathname.includes('/manager/maid_duty')?<Manager.MaidDuty/>:
                                    <Manager.HomepageM/>
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

export default IndexManager
