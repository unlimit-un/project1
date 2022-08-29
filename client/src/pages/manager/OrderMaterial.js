import { faEye, faCopy, faClipboardCheck, faCheck, faXmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Suspense, useState,useEffect,useRef } from 'react'
import { lazily } from 'react-lazily';
import Swal from 'sweetalert2';
import { EditDelete } from '../../components/EditDelete';
import { InputGroupWithLabel, SelectOptionWithLabel, TextAreawithlabel } from '../../components/FormElements';
import { Skeleton } from '../../components/Loading';
import { ModalCard, ModalButton, ModalCardConfirm } from '../../components/Modals';
import { deleteLeave, getLeaveById, getLeaveByManagerIdStatusConsidered, getLeaveByManagerIdStatusWaiting, getLeaveTypeByManagerId, updateLeave, updateLeaveToConsidered, } from '../../controllers/manager/LeaveController';
import { getOrderMaterialByManagerIdStatusConsidered, getOrderMaterialByManagerIdStatusWaiting, updateOrderMaterialToConsidered } from '../../controllers/manager/OrderMaterialController';
import { getTotalLeaveByManagerId, getTotalLeaveByManagerIdGroupByType, getTotalOrderMaterialByManagerId, getTotalOrderMaterialByManagerIdGroupByType } from '../../controllers/manager/RequestController';
const {MuiTable} = lazily(()=>import('../../components/Tables'));
const {CardFillColorNonFooter} = lazily(()=>import('../../components/Cards'));

const OrderMaterial = () => {
    const [total, setTotal] = useState('');
    const [totalApprove, setTotalApprove] = useState('');
    const [totalDeny, setTotalDeny] = useState('');
    const [totalWaiting, setTotalWaiting] = useState('');

    const [orderId, setOrderId] = useState('');
    const [isStock, setIsStock] = useState('');

    const [dataTableOrderMaterialWaiting, setDataTableOrderMaterialWaiting] = useState([]);
    const [dataTableOrderMaterialConsidered, setDataTableOrderMaterialConsidered] = useState([]);

    const [modalShow, setModalShow] = useState(false)
    const [modalShowConsider, setModalShowConsider] = useState(false);
    const [modalShowEdit, setModalShowEdit] = useState(false);

    const refOrderCode = useRef(null);
    const refMaterialCode = useRef(null);

    const loadData = async () =>{

        const orderMaterialGroupType = await getTotalOrderMaterialByManagerIdGroupByType();
        const [{count: totalOrderMaterial}] = await getTotalOrderMaterialByManagerId();
        const orderMaterialConsideredList =  await getOrderMaterialByManagerIdStatusConsidered();
        const orderMaterialWaitingList =  await getOrderMaterialByManagerIdStatusWaiting();

        let positive = 0, negative = 0, bal=0;

        orderMaterialGroupType.forEach(item=>{
            item['type'] === 'positive'? positive +=item['count']: item['type'] === 'negative'?negative += item['count']: bal += item['count']
        })

        setTotal(totalOrderMaterial)
        setTotalApprove(positive)
        setTotalDeny(negative)
        setTotalWaiting(bal)
        
        setDataTableOrderMaterialWaiting(orderMaterialWaitingList)
        setDataTableOrderMaterialConsidered(orderMaterialConsideredList)
    }

    useEffect(()=>{
        loadData()
    },[])

    const showEditModal = async (leave_id) =>{
        
    }

    const reState = () =>{
        loadData();
    }

    const totalCard =(
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
     const denyCard = (
         <div className="container-fulid">
             <p className="text-3xl m-0 text-start">{totalDeny}</p>
             <p className="text-md m-0 text-end">คำขอที่ไม่อนุมัติ</p>
         </div>
     )

    const muiWaiting = {
        data:[
            ...dataTableOrderMaterialWaiting.map(item =>{
                return {
                    checkbox: (
                    <div className="flex gap-2">
                        <ModalButton
                            callback={() => {
                                setIsStock(item['is_stock'])
                                setOrderId(item['order_id'])
                            }}
                            modalShow={modalShowConsider}
                            setModalShow={setModalShowConsider}
                            classBtn="btn btn-success"
                            icon={faCheck}
                        />
                        <button
                            onClick={async () => {
                                Swal.fire({
                                    title: 'ต้องการปฏิเสธใช่หรือไม่',
                                    showCancelButton: true,
                                    confirmButtonText: 'ใช่',
                                    denyButtonText: `ไม่ใช่`,
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        const formData = {
                                            order_id: item['order_id'], 
                                            status: -1, 
                                            is_stock: item['is_stock'].toString(), 
                                        };
                                        await updateOrderMaterialToConsidered(formData)
                                        await reState();
                                    }
                                })
                            }}
                            className="btn btn-outline-danger"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    ),
                    material_name: item['material_name'],
                    requester: item['requester'],
                    quantity: item['quantity'],
                    unit_price: item['unit_price'],
                    order_date: item['order_date'],
                    is_stock: item['is_stock'],
                    status: "รอดำเนินการ",
                    view: (
                        <ModalButton
                            classBtn="btn btn-outline-primary"
                            setModalShow={setModalShow}
                            icon={faEye}
                        />
                    ),
                };
            })
            
        ],
        columns:[
            {title:"",field:"checkbox"},
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
            {title: "สถานะ",field: "status"},
            {title:"",field:"view"},
        ]
    }
    
    const muiConsidered = {
        data:[
            ...dataTableOrderMaterialConsidered.map(item =>{
                return {
                    material_name: item['material_name'],
                    requester: item['requester'],
                    quantity: item['quantity'],
                    unit_price: item['unit_price'],
                    order_date: item['order_date'],
                    is_stock: item['is_stock'],
                    status: item['status'], 
                    ED:<EditDelete
                        EditFnc={()=>{}}
                        DeleteFnc={async()=>{}}
                        setModalShow={setModalShowEdit}
                    />, 
                    view:<ModalButton classBtn="btn btn-outline-primary" setModalShow={setModalShow} callback={()=>{}} icon={faEye}/>
                }
            })
            
        ],
        columns:[
            {title:"",field:"ED"},
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
            {title:"สถานะ",field:"status",
                    lookup:{
                        "1":"ดำเนินการเสร็จสิ้น", 
                        "-1":"ปฏิเสธ",
                    }
            },
            {title:"",field:"view"},
        ]
    }

    const tableWaiting = (
        <div className="container-fluid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={muiWaiting.data} columns={muiWaiting.columns} title="การลาที่รอดำเนินการ"/>
            </Suspense>
        </div>
    )

    const tableLeave = (
        <div className="container-fluid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={muiConsidered.data} columns={muiConsidered.columns} title="การลาทั้งหมด"/>
            </Suspense>
        </div>
    )

    const consideredModal = {
        mHead: (
            <>
                <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCopy}/> พิจารณาคำขอ</h1>
            </>
        ),
        mBody: (
            <>
                <div className="row">
                    {!isStock?<small className="text-danger col-12">*เนื่องจากวัสดุครุภัณฑ์นี้ยังไม่มีในคลัง จึงจำเป็นต้องกรอกรหัสครุภัณฑ์</small>:null}
                    <div className="col-md-6 col-12">
                        <InputGroupWithLabel ref={refOrderCode} placeholder="รหัสรายการสั่งซื้อ" label="รหัสรายการสั่งซื้อ" id="order_material_code"/>
                    </div>
                    {!isStock? 
                    <div className="col-md-6 col-12">
                        <InputGroupWithLabel ref={refMaterialCode} placeholder="รหัสครุภัณฑ์" label="รหัสครุภัณฑ์" id="material_code"/>
                    </div>:
                    null}
                </div>
            </>
        )
    }

    const editModal = {
        mHead: (
            <>
                <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPencil}/> แก้ไขข้อมูล</h1>
            </>
        ),
        mBody: (
            <>
                <div className="row">
                </div>
            </>
        )
    }

    const Modal = {
        mHead: (
            <>
                <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCopy}/> รายละเอียดการลา</h1>
            </>
        ),
        mBody: (
            <>
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-12">
                        <ul>
                            <li>รหัสพนักงาน</li>
                            <li>ชื่อ - นามสกุล</li>
                            <li>แม่บ้าน / ช่าง</li>
                            <li>ประเภทการลา</li>
                            <li>รายละเอียดการลา</li>
                            <li>ลาวันที่ - ถึงวันที่</li>
                            <li>สถานะ</li>
                        </ul>
                    </div>
                    <div className="col-lg-9 col-md-8 col-12">
                        <ul className="gap-2">
                            <li>3456123</li>
                            <li>unlimit unarn</li>
                            <li>ช่างซ่อม</li>
                            <li>ลากิจ</li>
                            <li>ไปธุระต่างจังหวัด</li>
                            <li>1/02/65 - 3/02/65</li>
                            <li>"กำลังดำเนินการ"</li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faClipboardCheck}/> จัดการข้อมูลการลาของพนักงาน</h1>
            <div className="container-fluid">
                <div className="row items-stretch gap-y-2">
                    <div className="col-md-3 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            {total  === ''?<Skeleton/>:<CardFillColorNonFooter classBody="bg-blue-400  rounded" contentBody={totalCard} classCard="text-white "/>}
                        </Suspense>
                    </div>
                    <div className="col-md-3 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            {totalApprove === ''?<Skeleton/>:<CardFillColorNonFooter classBody="bg-green-400  rounded" contentBody={approveCard} classCard="text-white "/>}
                            
                        </Suspense>
                    </div>
                    <div className="col-md-3 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            {totalWaiting  === ''?<Skeleton/>:<CardFillColorNonFooter classBody="bg-yellow-400  rounded" contentBody={waitingCard} classCard="text-black "/>}
                            
                        </Suspense>
                    </div>
                    <div className="col-md-3 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            {totalDeny  === ''?<Skeleton/>:<CardFillColorNonFooter classBody="bg-red-400  rounded" contentBody={denyCard} classCard="text-white "/>}
                        </Suspense>
                    </div>
                </div>
                <div className="mt-3">
                    <Suspense fallback={<Skeleton/>}>
                        <CardFillColorNonFooter contentBody={tableWaiting}/>
                    </Suspense>
                </div>
                <div className="mt-3">
                    <Suspense fallback={<Skeleton/>}>
                        <CardFillColorNonFooter contentBody={tableLeave}/>
                    </Suspense>
                </div>
            </div>
            {/* modal */}
            <ModalCard modalShow={modalShow} setModalShow={setModalShow} modalBody={Modal.mBody} modalHead={Modal.mHead}/>
            <ModalCardConfirm 
                confrimCallback={async ()=>{
                    const formData = {
                        order_id: orderId, 
                        status: 1, 
                        is_stock: isStock.toString(), 
                        order_code: refOrderCode.current.value, 
                        material_code: refMaterialCode.current ? refMaterialCode.current.value : null
                    };
                    console.log(formData);
                    if (await updateOrderMaterialToConsidered(formData)) reState();
                }}
                cancleCallback={reState} hideCallback={reState} modalBody={consideredModal.mBody} modalHead={consideredModal.mHead} modalShow={modalShowConsider} setModalShow={setModalShowConsider}/>
            <ModalCardConfirm 
                confrimCallback={async ()=>{
                    
                }}
                cancleCallback={reState} hideCallback={reState} modalBody={editModal.mBody} modalHead={editModal.mHead} modalShow={modalShowEdit} setModalShow={setModalShowEdit}/>
        </>
    )
}

export default OrderMaterial
// TODO: Next is Update Order