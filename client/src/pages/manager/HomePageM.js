import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import CardM from '../../components/manager/CardM'
import Navbar from '../../components/manager/NavbarM'
import SidebarM from '../../components/manager/SidebarM'
export const HomePageM = () => {
    const content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsum, mollitia beatae vero rerum animi vitae dolor dolorem eius optio, molestiae eveniet voluptas expedita iure, quaerat qui fugit ducimus minus?"
    return (
        <>
            <div className="bg-blue-100 min-h-screen">
                <Navbar/>
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-xs-12 p-0">
                            <SidebarM/>
                        </div>
                        <div className="col-lg-9 col-md-4 col-xs-12 p-0">
                            <div className="container mt-3">
                                <CardM label="ขออนุมัติ" icon={faClipboardCheck} content={content} color="green"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
