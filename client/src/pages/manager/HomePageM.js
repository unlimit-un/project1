import { faClipboardList, faHome, faLineChart } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { CardFillColor } from '../../components/manager/subComponents/Cards'
import Navbar from '../../components/manager/NavbarM'
import {SidebarLeftManager, SidebarRightManager} from '../../components/manager/SidebarM'
import FooterM from '../../components/manager/FooterM'
import { checkAutoRedirectUser } from '../../functions/AuthFunc'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LineChart } from '../../components/Charts'
import { pre_dataBarChart } from '../../functions/PrepareChartData'
import { TablesStriped } from '../../components/Tables'
import ManageEmp from './ManageEmp'


const HomePageM = () => {
    
    const [open, setOpen] = useState({
        person: {
            status: false,
            id: 'person'
        }
    });
    const [dataSetsLeaveRole, setDataSetsLeaveRole ] = useState([]);

    const [arr_data] = useState({data: [20,30,50,60,40,80,40,50,90,65,42,35]});
    const navigate = useNavigate();
    
    const {pathname} = useLocation();

    useEffect(() => {

        checkAutoRedirectUser(navigate, pathname);
        
        setDataSetsLeaveRole(
            [{
                label: 'ลาป่วย',
                data: arr_data.data.map((data)=> data + Math.random()*100),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                // tension:0.4,
                // fill: true
            },
            {
                label: 'ลากิจ',
                data: arr_data.data.map((data)=> data + Math.random()*100),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                // tension:0.4,
                // fill: true
            },
            {
                label: 'ลาพักผ่อน',
                data: arr_data.data.map((data)=> data + Math.random()*100),
                borderColor: 'rgb(33, 200, 33)',
                backgroundColor: 'rgba(33, 200, 33, 0.5)',
                // tension:0.4,
                // fill: true
            },]
        )
    },[''])
   
    const dataTableModel = {
        thead:['ลำดับ', 'ชื่อ', 'ราคา', 'จำนวน'],
        tbody:[
            ['1', 'โต๊ะไม้ขนาด 100*80', '1,020', '2'],
            ['2', 'ก็อกน้ำ', '120', '4'],
        ]
    }
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dataChartLeave = pre_dataBarChart(labels,'top','สถิติการลาของสมาชิกทั้งหมด')
    const dataChartLeaveEngineer = pre_dataBarChart(labels,'top','สถิติการลาของช่าง', dataSetsLeaveRole)
    const dataChartLeaveMaid = pre_dataBarChart(labels,'top','สถิติการลาของแม่บ้าน', dataSetsLeaveRole)

    const HomePageM = (
        <div className="container-fluid mt-3">
            <h1 className="text-2xl"><FontAwesomeIcon icon={faHome}/> หน้าหลัก</h1>
            <div className="row">
                <div className="col-lg-9 col-12">
                    <div className="row gap-y-5 mt-4">
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
                                <div className="col-12">
                                    <div className="h-full">
                                        <LineChart data={dataChartLeave.data} options={dataChartLeave.options}/>
                                    </div>
                                </div>
                                {/* <hr/> */}
                                <div className="col-12 row mt-2">
                                    <div className="col-6">
                                        <LineChart data={dataChartLeaveEngineer.data} options={dataChartLeaveEngineer.options} height="400rem" />
                                    </div>
                                    <div className="col-6">
                                        <LineChart data={dataChartLeaveMaid.data} options={dataChartLeaveMaid.options} height="400rem" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-4">
                            <div className="card-header">
                                <h1 className="text-xl m-0">
                                    <FontAwesomeIcon icon={faClipboardList}/> ข้อมูลยอดการสั่งซื้อ
                                </h1>
                            </div>
                            <div className="card-body">
                                <TablesStriped data={dataTableModel}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 p-0 my-4 d-lg-block d-none">
                    <SidebarRightManager/>
                </div>
            </div>
        </div>
    )
    return (
        <>
            <div className="bg-white min-h-screen">
                <Navbar/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-xs-12 ps-0 md:block hidden">
                            <div className="bg-blue-200 min-h-screen h-full">
                                <SidebarLeftManager open={open} setOpen={setOpen}/>
                            </div>
                        </div>
                        <div className="col-lg-10 col-md-9 col-xs-12 px-0">
                            {
                                pathname === '/manager' || pathname === '/manager/'?HomePageM:<ManageEmp/>
                            }
                            
                        </div>
                    </div>
                </div>
                <FooterM/>
            </div>
        </>
    )
}

export default HomePageM
