import React,{Suspense, useEffect, useRef, useState} from 'react'
import {  faHome, faEye,faCopy,faPencil,faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ModalCard,ModalButton } from '../../components/Modals'
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily'
import { getLeaveByManagerId, getOrderMaterialByManagerId, getTotalLeaveByManagerId, getTotalLeaveByManagerIdGroupByType, getTotalNotifyRepairByManagerId, getTotalNotifyRepairByManagerIdGroupByType, getTotalOrderMaterialByManagerId, getTotalOrderMaterialByManagerIdGroupByType } from '../../controllers/manager/RequestController'
import { getNotifyRepairByManagerId } from '../../controllers/manager/ReapairContoller'

const {MuiTable} = lazily(()=>import('../../components/Tables'));
const {CardFillColorNonFooter} = lazily(()=>import('../../components/Cards'));

const Request = () => {

    const [dataTableOrder, setDataTableOrder] = useState([]);    
    const [dataTableLeave, setDataTableLeave] = useState([]);    
    const [dataTableRepair, setDataTableRepair] = useState([]);
    const [total, setTotal] = useState('');
    const [totalApprove, setTotalApprove] = useState('');
    const [totalDeny, setTotalDeny] = useState('');
    const [totalWaiting, setTotalWaiting] = useState('');
    

    const loadData = async () =>{
        const orderList = await getOrderMaterialByManagerId();
        const leaveList = await getLeaveByManagerId();
        const repairList = await getNotifyRepairByManagerId();

        const [{count: totalLeave}] = await getTotalLeaveByManagerId();
        const [{count: totalOrder}] = await getTotalOrderMaterialByManagerId();
        const [{count_notify: totalRepair}] = await getTotalNotifyRepairByManagerId();

        const leaveGroupType = await getTotalLeaveByManagerIdGroupByType();
        const orderGroupType = await getTotalOrderMaterialByManagerIdGroupByType();
        const repairGroupType = await getTotalNotifyRepairByManagerIdGroupByType();
        
        let positive = 0, negative = 0, bal=0;

        leaveGroupType.forEach(item=>{
            item['type'] === 'positive'? positive +=item['count']: item['type'] === 'negative'?negative += item['count']: bal += item['count']
        })
        repairGroupType.forEach(item=>{
            item['type'] === 'positive'? positive +=item['count']: item['type'] === 'negative'?negative += item['count']: bal += item['count']
        })
        orderGroupType.forEach(item=>{
            item['type'] === 'positive'? positive +=item['count']: item['type'] === 'negative'?negative += item['count']: bal += item['count']
        })
        
        setDataTableLeave(leaveList)
        setDataTableOrder(orderList)
        setDataTableRepair(repairList)

        setTotal(totalLeave+totalOrder+totalRepair)
        setTotalApprove(positive)
        setTotalDeny(negative)
        setTotalWaiting(bal)
    }

    useEffect(()=>{
        loadData()
    },[])

    const acceptCard =(
       <div className="container-fulid">
            <p className="text-3xl m-0 text-start">{total}</p>
            <p className="text-md m-0 text-end">คำขอทั้งหมด</p>
       </div> 
    )
    const approveCard = (
        <div className="container-fulid">
            <p className="text-3xl m-0 text-start">{totalApprove}</p>
            <p className="text-md m-0 text-end">คำขอที่อนุมัติ</p>
        </div>
    )
    const waitingCard = (
        <div className="container-fulid">
            <p className="text-3xl m-0 text-start">{totalWaiting}</p>
            <p className="text-md m-0 text-end">คำขอที่รออนุมัติ</p>
        </div>
    )
    const disapprovedCard = (
        <div className="container-fulid">
            <p className="text-3xl m-0 text-start">{totalDeny}</p>
            <p className="text-md m-0 text-end">คำขอที่ไม่อนุมัติ</p>
        </div>
    )

    const MuiTableDataOrder = {
        data:[
            ...dataTableOrder.map(item=>{
                return {
                    material_name: item['material_name'],
                    requester: item['requester'],
                    quantity: item['quantity'],
                    unit_price: item['unit_price'],
                    order_date: item['order_date'],
                    is_stock: item['is_stock'],
                    status: item['status'],
                }
            })
        ],
        columns: [
            {title: "ชื่อผู้ร้องขอ",field: "requester",  },
            {title: "ชื่อครุภัณฑ์",field: "material_name",  },
            {title: "จำนวน",field: "quantity", type:"numeric"},
            {title: "ราคาต่อหน่วย",field: "unit_price", type:"numeric"},
            {title: "วันที่ส่งคำขอ",field: "order_date", },
            {title: "คลัง",field: "is_stock", 
                lookup:{
                    "1": "มี", 
                    "0":"ไม่มี",
                }
            },
            {title: "สถานะ",field: "status", 
                lookup:{
                    "-1": "ปฏิเสธ", 
                    "0":"รอดำเนินการ",
                    "1":"อนุมัติ", 
                }
            },
        ]
    }

    const MuiTableDataLeave = {
        data:[
            ...dataTableLeave.map(item=>{
                return {
                    title: item['title'],
                    requester: item['requester'],
                    leave_type: item['leave_type_name'],
                    description: item['description'],
                    date_start: item['date_start'],
                    date_end: item['date_end'],
                    status: item['status'],
                }
            })
        ],
        columns: [
            {title: "ชื่อผู้ร้องขอ",field: "requester"},
            {title: "หัวข้อการลา",field: "title",  },
            {title: "ประเภทการลา",field: "leave_type",  },
            {title: "รายละเอียด",field: "description"},
            {title: "เริ่มวันที่",field: "date_start"},
            {title: "ถึงวันที่",field: "date_end", },
            {title: "สถานะ",field: "status", 
                lookup:{
                    "-1": "ปฏิเสธ", 
                    "0":"รอดำเนินการ",
                    "1":"อนุมัติ", 
                }
            },
        ]
    }

    const MuiTableDataRepair = {
        data:[
            ...dataTableRepair.map(item=>{
                return {
                    issue: item['description'], 
                    notify_person: item['reporter'], 
                    date: item['notify_repair_date'], 
                    location: item['location_name'], 
                    room: item['room_name'], 
                    status: item['status'], 
                }
            })
        ],
        columns: [
            {title: "ปัญหา",field: "issue", },
            {title: "ผู้แจ้ง",field: "notify_person",},
            {title: "วันที่แจ้ง",field: "date",},
            {title: "สถานที่",field: "location", },
            {title: "ห้อง",field: "room", },
            {title: "สถานะ",field: "status", 
                lookup:{
                    "0": "รอดำเนินการ", 
                    "1": "ผ่านการอนุมัติ",
                    "2":"กำลังดำเนินการซ่อม",
                    "3":"ดำเนินการเสร็จสิ้น", 
                    "-1":"ปฏิเสธ",
                    "-2":"ไม่สามารถดำเนินการได้",
                    "-3":"ไม่ต้องการดำเนินการ",
                }
            },
        ]
    }

    const tableRequest = (
        <div className="container-fulid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={MuiTableDataOrder.data} columns={MuiTableDataOrder.columns} title="ตารางสั่งซื้อครุภัณฑ์"/>
            </Suspense>
        </div>
    )
    const tableLeave = (
        <div className="container-fulid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={MuiTableDataLeave.data} columns={MuiTableDataLeave.columns} title="ตารางการลา"/>
            </Suspense>
        </div>
    )
    const tableRepair = (
        <div className="container-fulid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={MuiTableDataRepair.data} columns={MuiTableDataRepair.columns} title="ตารางการแจ้งซ่อม"/>
            </Suspense>
        </div>
    )

    return (
        <>
         <h1 className="text-2xl"><FontAwesomeIcon icon={faHome}/> หน้าหลัก</h1>
         <div className="container-fluid">
            <div className="row items-stretch gap-y-2">
                <div className="col-md-3 col-12">
                     <Suspense fallback={<Skeleton/>}>
                        {total  === ''?<Skeleton/>:<CardFillColorNonFooter classBody="bg-blue-400  rounded" contentBody={acceptCard} classCard="text-white "/>}
                     </Suspense>
                 </div>
                <div className="col-md-3 col-12">
                    <Suspense fallback={<Skeleton/>}>
                        {totalApprove  === ''?<Skeleton/>:<CardFillColorNonFooter classBody="bg-green-400  rounded" contentBody={approveCard} classCard="text-white "/>}
                        
                    </Suspense>
                </div>
                <div className="col-md-3 col-12">
                    <Suspense fallback={<Skeleton/>}>
                        {totalWaiting  === ''?<Skeleton/>:<CardFillColorNonFooter classBody="bg-yellow-400  rounded" contentBody={waitingCard} classCard="text-black "/>}
                        
                    </Suspense>
                </div>
                <div className="col-md-3 col-12">
                    <Suspense fallback={<Skeleton/>}>
                        {totalDeny  === ''?<Skeleton/>:<CardFillColorNonFooter classBody="bg-red-400  rounded" contentBody={disapprovedCard} classCard="text-white "/>}
                        
                    </Suspense>
                </div>
            </div>
            <div className="mt-3">
                <Suspense fallback={<Skeleton/>}>
                    <CardFillColorNonFooter contentBody={tableRequest}/>
                </Suspense>
            </div>
            <div className="mt-3">
                <Suspense fallback={<Skeleton/>}>
                    <CardFillColorNonFooter contentBody={tableLeave}/>
                </Suspense>
            </div>
            <div className="mt-3">
                <Suspense fallback={<Skeleton/>}>
                    <CardFillColorNonFooter contentBody={tableRepair}/>
                </Suspense>
            </div>
            
         </div>

        </>
    )
}

export default Request