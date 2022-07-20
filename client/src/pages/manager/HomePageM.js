import { faClipboardList, faHome, faLineChart } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react'
import { CardFillColor } from '../../components/Cards'
import {SidebarRightManager} from '../../components/structure/SidebarM'
import { checkAutoRedirectUser } from '../../functions/AuthFunc'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BarChart, PieChart } from '../../components/Charts'
import { pre_dataBarChart, pre_dataPieChart } from '../../functions/PrepareChartData'
import { TablesStriped } from '../../components/Tables'

const Homepage = () => {
    
    const [dataSetsLeaveRole, setDataSetsLeaveRole ] = useState([]);
    const [dataSetsRepair, setDataSetsRepair ] = useState([]);
    const [height, setHeight] = useState(0);

    const [arr_data] = useState({data: [20,30,50,60,40,80,40,50,90,65,42,35]});
    const navigate = useNavigate();
    
    const {pathname} = useLocation();

    const ref = useRef(null)

    useEffect(() => {
    
        checkAutoRedirectUser(navigate, pathname);
        setDataSetsRepair([
            {
                label: 'รายการที่ซ่อมเสร็จแล้ว',
                data: arr_data.data.map((data)=> data + Math.random()*100),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'รายการที่รอดำเนินการ',
                data: arr_data.data.map((data)=> data + Math.random()*100),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ])
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

        if (ref !== null) {
            setHeight(ref.current.clientHeight)
        }
    },[])

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
    const dataChartRepair = pre_dataPieChart(['รายการที่ซ่อมเสร็จแล้ว', 'รายการที่กำลังดำเนินการ',],'top','แผนภูมิการซ่อมทั้งหมด')
    const dataChartRepairBar = pre_dataBarChart(labels,'top','แผนภูมิการซ่อมทั้งหมด', dataSetsRepair)
  return (
    <>
        <h1 className="text-2xl"><FontAwesomeIcon icon={faHome}/> หน้าหลัก</h1>
        <div className="row ">
            <div className="col-lg-9 col-md-8 col-12"  ref={ref}>
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
                <div className="card my-3">
                    <div className="card-header">
                        <h1 className="text-xl m-0"><FontAwesomeIcon icon={faLineChart}/> การซ่อมทั้งหมด</h1>
                    </div>
                    <div className="card-body row justify-content-stretch">
                        <div className="col-lg-4 col-md-5 col-12">
                            <div className="h-full card card-body">
                                <PieChart data={dataChartRepair.data} options={dataChartRepair.options} height="40vh" />
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-7 col-12">
                            <div className="h-full card card-body">
                                <BarChart data={dataChartRepairBar.data} options={dataChartRepairBar.options} height="40vh" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-xl m-0"><FontAwesomeIcon icon={faLineChart}/> สถิติการลาของพนักงาน</h1>
                        </div>
                        <div className="card-body row justify-content-stretch">
                            <div className="col-12">
                                <div className="h-full">
                                    <BarChart data={dataChartLeave.data} options={dataChartLeave.options} height="40vh"/>
                                </div>
                            </div>
                            <div className="col-12 row mt-2">
                                <div className="col-6">
                                    <BarChart data={dataChartLeaveEngineer.data} options={dataChartLeaveEngineer.options} height="40vh" />
                                </div>
                                <div className="col-6">
                                    <BarChart data={dataChartLeaveMaid.data} options={dataChartLeaveMaid.options} height="40vh" />
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
            <div className="col-lg-3 col-md-4 col-12 p-0 my-4 self-stretch ">
                <SidebarRightManager maxHeight={height}/>
            </div>
        </div>
    </>
  )
}

export default Homepage