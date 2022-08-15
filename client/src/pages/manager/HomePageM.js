import { faClipboardList, faHome, faLineChart } from '@fortawesome/free-solid-svg-icons'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import {SidebarRightManager} from '../../components/structure/SidebarM'
import { checkAutoRedirectUser } from '../../functions/AuthFunc'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { pre_dataBarChart, pre_dataPieChart } from '../../functions/PrepareChartData'
import { Skeleton, Spiner } from '../../components/Loading'
import { lazily } from 'react-lazily'
import { getCountMaidByManagerId, getLeaveBarChart, getLeaveRoleEngineerBarChart, getLeaveRoleMaidBarChart, getNotifyRepairBarChart, getNotifyRepairPieChart, getOrderMaterialTableDashboard } from '../../controllers/manager/HomeController'
import { ArrayColor, ArrayColorAlpha } from '../../utils/ArrayColor'
// import {BarChart, PieChart} from '../../components/Charts'

const {CardFillColor} = lazily(()=>import('../../components/Cards'));
const {BarChart, PieChart} = lazily(()=>import('../../components/Charts'));
const { MuiTable }  = lazily(()=>import('../../components/Tables'));

const Homepage = () => {
    
    
    const navigate = useNavigate();
    
    const {pathname} = useLocation();

    const ref = useRef(null)
    
    const [pieChartDataSets, setPieChartDataSets] = useState([])
    const [labelPieChart, setLabelPieChart] = useState([])
    const [dataSetsLeaveRoleMaid, setDataSetsLeaveRoleMaid ] = useState([]);
    const [dataSetsLeaveRoleEn, setDataSetsLeaveRoleEn ] = useState([]);
    const [dataSetsRepair, setDataSetsRepair ] = useState([]);
    const [height, setHeight] = useState(0);
    const [dataSetsLeave, setDataSetsLeave] = useState([]);
    const [muiDataTable, setMuiDataTable] = useState({
        data:[],
        columns: [
            {title: "ลำดับ",field: "order"},
            {title: "ชื่อ",field: "name"},
            {title: "ราคาต่อหน่วย",field: "unitprice",  type: 'numeric' },
            {title: "จำนวน",field: "count", type: 'numeric' },
            {title: "ราคารวม",field: "total_price", type: 'numeric' },
            {title: "วันที่นำแจ้ง",field: "order_date"},
        ]
    });
    const [countMaid, setCountMaid] = useState(0);
    const [countEngineer, setCountEngineer] = useState(0);

    const loadPieChart = async () =>{
        const pieChartData = await getNotifyRepairPieChart();
        if (pieChartData !== undefined) {
            setLabelPieChart([...pieChartData.map(item=>item.note)])
            setPieChartDataSets([
                {
                    data: [...pieChartData.map(item=>item.count)],
                    backgroundColor: [...pieChartData.map((item, i)=> ArrayColorAlpha[i])],
                    borderColor: [...pieChartData.map((item, i)=> ArrayColor[i])],
                    borderWidth: 1,
                }
            ])
        }else{
            setLabelPieChart(['ไม่พบข้อมูล'])
            setPieChartDataSets([
                {
                    data: [1],
                    backgroundColor: [ArrayColorAlpha[0]],
                    borderColor: [ ArrayColor[0]],
                    borderWidth: 1
                }
            ])
        }
    }

    const loadBarChartRepair = async () =>{
        const barChartData = await getNotifyRepairBarChart();
        if (barChartData !== undefined) {
            const prepare = [{
                label: 'รอหัวหน้าดำเนินการ',
                data: barChartData.map(item=>item.length === 0 ? [{count:0}]: item.filter(ele=>ele.note === 'รอหัวหน้าดำเนินการ'??ele))
                    .map(item=>item.length === 0 ? 0:item[0]['count']),
                borderColor: ArrayColor[0],
                backgroundColor: ArrayColorAlpha[0],
            },
            {
                label: 'อนุมัติ',
                data: barChartData.map(item=>{
                    if (item.length === 0) {
                        return [{count: 0}]
                    }else{
                        return item.filter(ele=>ele.note === 'อนุมัติ'??ele)
                    }
                }).map(item=>item.length === 0 ? 0:item[0]['count']),
                borderColor: ArrayColor[1],
                backgroundColor: ArrayColorAlpha[1],
            },
            {
                label: 'ดำเนินการเสร็จสิ้น',
                data: barChartData.map(item=>{
                    if (item.length === 0) {
                        return [{count: 0}]
                    }else{
                        return item.filter(ele=>ele.note === 'ดำเนินการเสร็จสิ้น'??ele)
                    }
                }).map(item=>item.length === 0 ? 0:item[0]['count']),
                borderColor: ArrayColor[2],
                backgroundColor: ArrayColorAlpha[2],
            },
            {
                label: 'ปฏิเสธ',
                data: barChartData.map(item=>{
                    if (item.length === 0) {
                        return [{count: 0}]
                    }else{
                        return item.filter(ele=>ele.note === 'ปฏิเสธ'??ele)
                    }
                }).map(item=>item.length === 0 ? 0:item[0]['count']),
                borderColor: ArrayColor[3],
                backgroundColor: ArrayColorAlpha[3],
            },
            {
                label: 'ไม่สามารถดำเนินการได้',
                data: barChartData.map(item=>{
                    if (item.length === 0) {
                        return [{count: 0}]
                    }else{
                        return item.filter(ele=>ele.note === 'ไม่สามารถดำเนินการได้'??ele)
                    }
                }).map(item=>item.length === 0 ? 0:item[0]['count']),
                borderColor: ArrayColor[4],
                backgroundColor: ArrayColorAlpha[4],
            },
            {
                label: 'ไม่ต้องการดำเนินการแล้ว',
                data: barChartData.map(item=>{
                    if (item.length === 0) {
                        return [{count: 0}]
                    }else{
                        return item.filter(ele=>ele.note === 'ไม่ต้องการดำเนินการแล้ว'??ele)
                    }
                }).map(item=>item.length === 0 ? 0:item[0]['count']),
                borderColor: ArrayColor[5],
                backgroundColor: ArrayColorAlpha[5],
            }
        ]
            setDataSetsRepair(prepare)
        }
    }

    const loadBarChartLeave = async () =>{
        const barChartLeave = await getLeaveBarChart();
        const prepare = [{
            label: 'แม่บ้าน',
            data: barChartLeave.map(item=>{
                if (item.length === 0) {
                    return [{count_maid: 0, count_en: 0}]
                }else{
                    return item
                }
            }).map(item=>item[0]['count_maid']),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'ช่างซ่อม',
            data: barChartLeave.map(item=>{
                if (item.length === 0) {
                    return [{count_maid: 0, count_en: 0}]
                }else{
                    return item
                }
            }).map(item=>item[0]['count_en']),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
        setDataSetsLeave(prepare)
    }

    const loadBarChartLeaveRoleMaid = async () =>{
        const barChartLeaveRoleMaid = await getLeaveRoleMaidBarChart();
        let bool = false;
        barChartLeaveRoleMaid.forEach(item=>{
            if (item.length > 0) {
                bool = true;
            }
        })
        
        if (bool) {
            
            const totalTypeLabel = barChartLeaveRoleMaid[0].map(item=>item['leave_type_name'])
            
            const seperateData = totalTypeLabel.map(label=>{
                return barChartLeaveRoleMaid.map(item=>{
                    return item.filter(item2=>{
                        if (item2['leave_type_name'] === label) {
                            return {label, data: item2['count_maid']}
                        }
                    })
                })
            })
    
            const data = totalTypeLabel.map((label, i)=>{
                return {
                    label: label,
                    data: seperateData.map(item=>item.map(item2=>item2[0]['leave_type_name'] === label?item2[0]['count_maid']:0))[i],
                    borderColor: ArrayColor[i],
                    backgroundColor: ArrayColorAlpha[i],
                }
            })
            setDataSetsLeaveRoleMaid(data)
        }else{
            setDataSetsLeaveRoleMaid([{
                label: 'ไม่พบข้อมูล',
                data: [1],
                borderColor: ArrayColor[0],
                backgroundColor: ArrayColorAlpha[0],
            }])
        }
    }

    const loadBarChartLeaveRoleEn = async () =>{
        const barChartLeaveRoleEn = await getLeaveRoleEngineerBarChart();
        let bool = false;
        barChartLeaveRoleEn.forEach(item=>{
            if (item.length > 0) {
                bool = true;
            }
        })

        if (bool) {
            
            const totalTypeLabel = barChartLeaveRoleEn[0].map(item=>item['leave_type_name'])
            
            const seperateData = totalTypeLabel.map(label=>{
                return barChartLeaveRoleEn.map(item=>{
                    return item.filter(item2=>{
                        if (item2['leave_type_name'] === label) {
                            return {label, data: item2['count_en']}
                        }
                    })
                })
            })
    
            const data = totalTypeLabel.map((label, i)=>{
                return {
                    label: label,
                    data: seperateData.map(item=>item.map(item2=>item2[0]['leave_type_name'] === label?item2[0]['count_en']:0))[i],
                    borderColor: ArrayColor[i],
                    backgroundColor: ArrayColorAlpha[i],
                }
            })
            setDataSetsLeaveRoleEn(data)
        }else{
            setDataSetsLeaveRoleEn([{
                label: 'ไม่พบข้อมูล',
                data: [1],
                borderColor: ArrayColor[0],
                backgroundColor: ArrayColorAlpha[0],
            }])
        }
    }

    const loadTableOrderMaterial = async () =>{
        const tableOrderMaterial = await getOrderMaterialTableDashboard();

        setMuiDataTable({...muiDataTable, 
            data: [...tableOrderMaterial.map((item, i)=>{
                return {
                    order: i+1, 
                    name: item['material_name'], 
                    unitprice: item['unit_price'], 
                    count:item['quantity'], 
                    total_price: item['total_price'], 
                    order_date: item['order_date']
                }
            })]
        })
    }

    const loadCountMaid = async () =>{
        const countMaid = await getCountMaidByManagerId();

    }

    useEffect(() => {
        checkAutoRedirectUser(navigate, pathname);

        loadPieChart();
        loadBarChartLeaveRoleEn();
        loadBarChartLeaveRoleMaid();
        loadBarChartLeave();
        loadBarChartRepair();
        loadTableOrderMaterial();
        
        if (ref !== null) {
            setHeight(ref.current.clientHeight)
        }
    },[])

    const labels = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const dataChartLeave = pre_dataBarChart(labels,'top','สถิติการลาของสมาชิกทั้งหมด', dataSetsLeave) // success 
    const dataChartLeaveEngineer = pre_dataBarChart(labels,'top','สถิติการลาของช่าง', dataSetsLeaveRoleEn) // success 
    const dataChartLeaveMaid = pre_dataBarChart(labels,'top','สถิติการลาของแม่บ้าน', dataSetsLeaveRoleMaid) // success 
    const dataChartRepair = pre_dataPieChart(labelPieChart,'top','แผนภูมิการซ่อมทั้งหมด', pieChartDataSets) // success
    console.log(dataChartRepair);
    // const dataChartRepairBar = pre_dataBarChart(labels,'top','แผนภูมิการซ่อมทั้งหมด', dataSetsRepair) // success

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
                                        <BarChart data={pre_dataBarChart(labels,'top','แผนภูมิการซ่อมทั้งหมด', dataSetsRepair).data} options={pre_dataBarChart(labels,'top','แผนภูมิการซ่อมทั้งหมด', dataSetsRepair).options} height="40vh" />
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
                                    <MuiTable data={muiDataTable.data} columns={muiDataTable.columns} title=""/>
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