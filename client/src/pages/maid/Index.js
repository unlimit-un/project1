import React, { Suspense, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FooterM from '../../components/structure/FooterM'
import { NavbarMaid } from '../../components/structure/NavbarM'
import { SidebarLeftMaid } from '../../components/structure/SidebarM'
import Spiner from '../../components/Spiner'
import { checkAutoRedirectUser } from '../../functions/AuthFunc'
import * as Maid from './ImportMaid'

const Index = () => {
    const [open, setOpen] = useState({
        work: {
            status: false,
            id: 'work'
        },
        event: {
            status: false,
            id: 'event'
        },
        leave: {
            status: false,
            id: 'leave'
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
                <Suspense fallback={<Spiner/>}><NavbarMaid/></Suspense>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-xs-12 ps-0 md:block hidden">
                            <Suspense fallback={<Spiner/>}><SidebarLeftMaid open={open} setOpen={setOpen}/></Suspense>
                        </div>
                        <div className="col-lg-10 col-md-9 col-xs-12 px-0">
                            <div className="container-fluid my-3">
                                <Suspense fallback={<Spiner/>}>
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