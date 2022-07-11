
import React, { Suspense, useEffect, useState} from 'react'

import Navbar from '../../components/manager/NavbarM'
import {SidebarLeftManager} from '../../components/manager/SidebarM'
import FooterM from '../../components/manager/FooterM'
import { checkAutoRedirectUser } from '../../functions/AuthFunc'
import { useLocation, useNavigate } from 'react-router-dom'
import ManageEmp from './ManageEmp'
import Material from './Material'
import Request from './Request'
import Leave from './Leave'
import Repair from './Repair'
import Notify from './Notify'
import HomePageM from './HomePageM'
import Bookmarks from './Bookmarks'
import Calendar from './Calendar'
import SchedualWork from './SchedualWork'
import Location from './Location'
import Spiner from '../../components/Spiner'

const IndexManager = () => {

    const [open, setOpen] = useState({
        person: {
            status: false,
            id: 'person'
        },
        schedual: {
            status: false,
            id: 'schedual'
        },
    });
   
    const navigate = useNavigate();
    
    const {pathname} = useLocation();
    
    useEffect(() => {
    
        checkAutoRedirectUser(navigate, pathname);
        
    },[])

    if (pathname.includes('/manager/bookmarks')) {
        return(<Bookmarks open={open} setOpen={setOpen}/>)
    }
    return (
        <>
            <div className="bg-white min-h-screen">
                <Suspense fallback={<Spiner/>}><Navbar/></Suspense>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-xs-12 ps-0 md:block hidden">
                            <div className="bg-blue-200 min-h-screen h-full">
                            <Suspense fallback={<Spiner/>}><SidebarLeftManager open={open} setOpen={setOpen}/></Suspense>
                            </div>
                        </div>
                        <div className="col-lg-10 col-md-9 col-xs-12 px-0">
                            <div className="container-fluid my-3">
                                <Suspense fallback={<Spiner/>}>
                                {
                                    
                                    pathname.includes('/manager/manage_emp')?<ManageEmp/>:
                                    pathname.includes('/manager/material')?<Material/>:
                                    pathname.includes('/manager/leave')?<Leave/>:
                                    pathname.includes('/manager/request')?<Request/>:
                                    pathname.includes('/manager/repair')?<Repair/>:
                                    pathname.includes('/manager/schedual_work')?<SchedualWork/>:
                                    pathname.includes('/manager/notify')?<Notify/>:
                                    pathname.includes('/manager/location')?<Location/>:
                                    <HomePageM/>
                                }
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
                <Suspense fallback={<Spiner/>}><FooterM/></Suspense>
            </div>
        </>
    )
}

export default IndexManager
