import { faBars, faBell, faBuilding, faChartLine, faClipboardCheck, faHamburger } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import CardFillColorM from '../../components/manager/subComponents/CardFillColorM'
import CardM from '../../components/manager/subComponents/CardM'
import Navbar from '../../components/manager/NavbarM'
import SidebarM from '../../components/manager/SidebarM'
import FooterM from '../../components/manager/FooterM'
import { Collapse } from 'react-bootstrap'
const HomePageM = () => {
    const content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsum, mollitia beatae vero rerum animi vitae dolor dolorem eius optio, molestiae eveniet voluptas expedita iure, quaerat qui fugit ducimus minus?"
    const [open, setOpen] = useState({
        person: {
            status: false,
            id: 'person'
        },
        main_menu:{
            status: true,
            id: 'main_menu'
        }
    });

    useEffect(() => {
      
        window.addEventListener('resize',()=>{
            if (!open.main_menu.status) {
                if (window.innerWidth > 750) {
                    setOpen({person: open.person, main_menu: {status: true}})
                }
            }
        })
    },[window])
    
    return (
        <>
            <div className="bg-white min-h-screen">
                <Navbar open={open} setOpen={setOpen}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-xs-12 p-0">
                            <Collapse in={open.main_menu.status}>
                                <div id={open.main_menu.id} className="bg-blue-200 min-h-screen h-full">
                                    <SidebarM open={open} setOpen={setOpen}/>
                                </div>
                            </Collapse>
                        </div>
                        <div className="col-lg-9 col-md-8 col-xs-12 p-0">
                            <div className="container mt-3">
                                <div className="row gap-y-5">
                                    <div className="col-md-7 col-12">
                                        <CardM label="ขออนุมัติ" icon={faClipboardCheck} content={content} color="green"/>
                                    </div>
                                    <div className="col-md-5 col-12">
                                        <CardM label="แจ้งซ่อมจากบุคคลทั่วไป" icon={faBell} content={content} color="green"/>
                                    </div>
                                    <div className="col-12">
                                        <CardM label="จัดการสถานที่" icon={faBuilding} content={content} color="green"/>
                                    </div>
                                    <div className="col-md-5">
                                        <CardFillColorM title="20" subTitle="จำนวนพนักงาน" caption="ข้อมูลเพิ่มเติม" color="green"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterM/>
            </div>
        </>
    )
}

export default HomePageM
