import { faClipboardList, faHome, faLineChart } from '@fortawesome/free-solid-svg-icons'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import {SidebarRightManager} from '../../components/structure/SidebarM'
import { checkAutoRedirectUser } from '../../functions/AuthFunc'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { pre_dataBarChart, pre_dataPieChart } from '../../functions/PrepareChartData'
import { Skeleton, Spiner } from '../../components/Loading'
import { lazily } from 'react-lazily'
import { getNotifyRepairBarChart, getNotifyRepairPieChart } from '../../controllers/manager/HomeController'

const {CardFillColor} = lazily(()=>import('../../components/Cards'));
const {BarChart, PieChart} = lazily(()=>import('../../components/Charts'));
const { MuiTable }  = lazily(()=>import('../../components/Tables'));

const Homepage = () => {
    
    const [dataSetsLeaveRole, setDataSetsLeaveRole ] = useState([]);
    const [dataSetsRepair, setDataSetsRepair ] = useState([]);
    const [height, setHeight] = useState(0);

    const [arr_data] = useState({data: [20,30,50,60,40,80,40,50,90,65,42,35]});
    const navigate = useNavigate();
    
    const {pathname} = useLocation();

    const ref = useRef(null)
    const [pieChartDataSets, setPieChartDataSets] = useState([])
    const [labelPieChart, setLabelPieChart] = useState([])

    const loadPieChart = async () =>{
        const pieChartData = await getNotifyRepairPieChart();
        setLabelPieChart([...pieChartData.map(item=>item.note)])
        setPieChartDataSets([
            {
                data: [...pieChartData.map(item=>item.count)],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }
        ])
        

        
    }

    const loadBarChartRepair = async () =>{
        const barChartData = await getNotifyRepairBarChart();
        const countData =barChartData.map(item=>item.count);
        const label = barChartData.map(item=>item.note);
        console.log(barChartData);
        let arr = []
        for (let i = 0; i < label.length; i++) {
            arr.push({
                label: label[i],
                data: arr_data.data.map((data)=> data + Math.random()*100),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            })
        }
        console.log(arr);
        setDataSetsRepair(arr)
    }

    useEffect(() => {
        checkAutoRedirectUser(navigate, pathname);

        loadPieChart();
        loadBarChartRepair();
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
    
    const MuiTableData = {
        data:[
            { order: 1, name: "โต๊ะไม้ขนาด 100*80", price: '1,020', count:2, },
            { order: 2, name: "ก็อกน้ำ", price: '120', count:2, },
        ],
        columns: [
            {title: "ลำดับ",field: "order"},
            {title: "ชื่อ",field: "name"},
            {title: "ราคา",field: "price",  type: 'numeric' },
            {title: "จำนวน",field: "count", type: 'numeric' },
        ]
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dataChartLeave = pre_dataBarChart(labels,'top','สถิติการลาของสมาชิกทั้งหมด')
    const dataChartLeaveEngineer = pre_dataBarChart(labels,'top','สถิติการลาของช่าง', dataSetsLeaveRole)
    const dataChartLeaveMaid = pre_dataBarChart(labels,'top','สถิติการลาของแม่บ้าน', dataSetsLeaveRole)
    const dataChartRepair = pre_dataPieChart(labelPieChart,'top','แผนภูมิการซ่อมทั้งหมด', pieChartDataSets)
    const dataChartRepairBar = pre_dataBarChart(labels,'top','แผนภูมิการซ่อมทั้งหมด', dataSetsRepair)
  return (
    <>
        <h1 className="text-2xl"><FontAwesomeIcon icon={faHome}/> หน้าหลัก</h1>
        <div className="row ">
            <div className="col-lg-9 col-md-8 col-12"  ref={ref}>
                <div className="row gap-y-5 mt-4">
                    <div className="col-md-4 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            <CardFillColor colorBody="bg-emerald-400" colorFooter="!bg-emerald-500" title="20" subTitle="จำนวนพนักงาน" caption="ข้อมูลเพิ่มเติม"/>
                        </Suspense>
                    </div>
                    <div className="col-md-4 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            <CardFillColor colorBody="bg-purple-400" colorFooter="!bg-purple-500" title="10" subTitle="จำนวนแม่บ้าน" caption="ข้อมูลเพิ่มเติม"/>
                        </Suspense>
                    </div>
                    <div className="col-md-4 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            <CardFillColor colorBody="bg-slate-400" colorFooter="!bg-slate-500" title="10" subTitle="จำนวนช่าง" caption="ข้อมูลเพิ่มเติม"/>
                        </Suspense>
                    </div>
                </div>
                <div className="card my-3">
                    <div className="card-header">
                        <h1 className="text-xl m-0"><FontAwesomeIcon icon={faLineChart}/> การซ่อมทั้งหมด</h1>
                    </div>
                    <div className="card-body row justify-content-stretch">
                        <div className="col-lg-4 col-md-5 col-12">
                            <div className="h-full card card-body">
                                <Suspense fallback={<Spiner/>}>
                                    <PieChart data={dataChartRepair.data} options={dataChartRepair.options} height="40vh" />
                                </Suspense>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-7 col-12">
                            <div className="h-full card card-body">
                                <Suspense fallback={<Spiner/>}>
                                    <BarChart data={dataChartRepairBar.data} options={dataChartRepairBar.options} height="40vh" />
                                </Suspense>
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
                                    <Suspense fallback={<Spiner/>}>
                                        <BarChart data={dataChartLeave.data} options={dataChartLeave.options} height="40vh"/>
                                    </Suspense>
                                </div>
                            </div>
                            <div className="col-12 row mt-2">
                                <div className="col-6">
                                    <Suspense fallback={<Spiner/>}>
                                        <BarChart data={dataChartLeaveEngineer.data} options={dataChartLeaveEngineer.options} height="40vh" />
                                    </Suspense>
                                </div>
                                <div className="col-6">
                                    <Suspense fallback={<Spiner/>}>
                                        <BarChart data={dataChartLeaveMaid.data} options={dataChartLeaveMaid.options} height="40vh" />
                                    </Suspense>
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
                            <Suspense fallback={<Skeleton/>}>
                                <MuiTable data={MuiTableData.data} columns={MuiTableData.columns} title=""/>
                            </Suspense>
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