import { faBell, faBuilding, faClipboardCheck, faHome, faLineChart } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { CardLineAfter, CardFillColor } from '../../components/manager/subComponents/Cards'
import Navbar from '../../components/manager/NavbarM'
import SidebarM from '../../components/manager/SidebarM'
import FooterM from '../../components/manager/FooterM'
import { Collapse } from 'react-bootstrap'
import { authUser } from '../../functions/LoginFunc'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LineChart } from '../../components/Charts'
import { pre_dataLineChart } from '../../functions/PrepareChartData'
const HomePageM = () => {
    const content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsum, mollitia beatae vero rerum animi vitae dolor dolorem eius optio, molestiae eveniet voluptas expedita iure, quaerat qui fugit ducimus minus?"
    const [open, setOpen] = useState({
        person: {
            status: false,
            id: 'person'
        }
    });

    const navigate = useNavigate();
    useEffect(() => {
      
        window.addEventListener('resize',()=>{
            if (!open.main_menu.status) {
                if (window.innerWidth > 750) {
                    setOpen({person: open.person, main_menu: {status: true}})
                }
            }
        })

        authUser(navigate);
    },[])

    const dataChart = pre_dataLineChart(['jan','feb','m'],'top','title')
    return (
        <>
            <div className="bg-white min-h-screen">
                <Navbar/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-xs-12 p-0 md:block hidden">
                            <div className="bg-blue-200 min-h-screen h-full">
                                <SidebarM open={open} setOpen={setOpen}/>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-xs-12 p-0">
                            <div className="container mt-3">
                                <h1 className="text-2xl"><FontAwesomeIcon icon={faHome}/> หน้าหลัก</h1>
                                <div className="row gap-y-5">
                                    <div className="col-md-4 col-12">
                                        <CardFillColor colorBody="bg-emerald-400" colorFooter="!bg-emerald-500" title="20" subTitle="จำนวนพนักงาน" caption="ข้อมูลเพิ่มเติม"/>
                                    </div>
                                    <div className="col-md-4 col-12">
                                        <CardFillColor colorBody="bg-purple-400" colorFooter="!bg-purple-500" title="10" subTitle="จำนวนแม่บ้าน" caption="ข้อมูลเพิ่มเติม"/>
                                    </div>
                                    <div className="col-md-4 col-12">
                                        <CardFillColor colorBody="bg-slate-400" colorFooter="!bg-slate-500" title="10" subTitle="จำนวนช่าง" caption="ข้อมูลเพิ่มเติม"/>
                                    </div>
                                </div>
                                <div className="my-3">
                                    <div className="card">
                                        <div className="card-header">
                                            <h1 className="text-xl m-0"><FontAwesomeIcon icon={faLineChart}/> สถิติการลาของพนักงาน</h1>
                                        </div>
                                        <div className="card-body row justify-content-stretch">
                                            <div className="col-lg-6 col-12">
                                                <div className="h-full">
                                                    <LineChart data={dataChart.data} options={dataChart.options} height="250rem"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12 row">
                                                <div className="col-12">
                                                    <LineChart data={dataChart.data} options={dataChart.options}/>
                                                </div>
                                                <div className="col-12">
                                                    <LineChart data={dataChart.data} options={dataChart.options}/>
                                                </div>
                                            </div>
                                        </div>
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
