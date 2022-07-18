import React, { Suspense, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FooterM from '../../components/manager/FooterM'
import { NavbarManager } from '../../components/NavbarM'
import { SidebarLeftMaid } from '../../components/SidebarM'
import Spiner from '../../components/Spiner'
import { checkAutoRedirectUser } from '../../functions/AuthFunc'
import Activity from './Activity'
import HomepageMaid from './HomePageMaid'
import Leave from './Leave'
import Material from './Material'
import Repair from './Repair'
import Urgent from './Urgent'
import Work from './Work'

const Index = () => {
    const [open, setOpen] = useState({
        work: {
            status: false,
            id: 'person'
        },
        activity: {
            status: false,
            id: 'schedual'
        },
        leave: {
            status: false,
            id: 'schedual'
        },
    });
    const navigate = useNavigate();
    const {pathname} = useLocation();
    console.log(pathname);
    useEffect(()=>{
        checkAutoRedirectUser(navigate, pathname)
    },[])
    return (
        <>
            <div className="bg-white min-h-screen">
                <Suspense fallback={<Spiner/>}><NavbarManager/></Suspense>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-xs-12 ps-0 md:block hidden">
                            <Suspense fallback={<Spiner/>}><SidebarLeftMaid open={open} setOpen={setOpen}/></Suspense>
                        </div>
                        <div className="col-lg-10 col-md-9 col-xs-12 px-0">
                            <div className="container-fluid my-3">
                                <Suspense fallback={<Spiner/>}>
                                {
                                    pathname.includes('/maid/work/')?<Work/>:
                                    pathname.includes('/maid/spacial/')?<Activity/>:
                                    pathname.includes('/maid/urgent')?<Urgent/>:
                                    pathname.includes('/maid/leave/')?<Leave/>:
                                    pathname.includes('/maid/repair')?<Repair/>:
                                    pathname.includes('/maid/material')?<Material/>:
                                    <HomepageMaid/>
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

export default Index