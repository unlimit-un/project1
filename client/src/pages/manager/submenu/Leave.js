import { faPencil, faSave, faTrash, faUserPlus, faEye, faCopy, faClapperboard, faClipboardCheck, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Suspense, useState,useEffect,useRef } from 'react'
import { lazily } from 'react-lazily';
import { Bandage } from '../../../components/Bandage';
// import { CardFillColorNonFooter } from '../../../components/Cards';
import EditDelete from '../../../components/EditDelete';
import { InputGroupWithLabel, SelectOptionWithLabel } from '../../../components/FormElements';
import { Skeleton } from '../../../components/Loading';
import { ModalCard, ModalButton } from '../../../components/Modals';
import { SidebarRightManager } from '../../../components/structure/SidebarM';
// import { MuiTable, TablesStriped } from '../../../components/Tables';

const {MuiTable} = lazily(()=>import('../../../components/Tables'));
const {CardFillColorNonFooter} = lazily(()=>import('../../../components/Cards'));

export const LeaveType = () => {
   
    const initial = {
        data: [
            {id_dept: 'DEPT220',name_dept:"ช่างทั่วไป",location:"ตึก A",date:"3/7/2023",ED:<EditDelete/>},
            {id_dept: 'DEPT200',name_dept:"ช่างอิเล็กทรอนิกส์",location:"ตึก A",date:"6/7/2023",ED:<EditDelete/>}
        ],
        columns: [
            {title: "รหัสแผนก",field: "id_dept"},
            {title: "ชื่อแผนก",field: "name_dept"},
            {title: "สถานที่",field: "location"},
            {title: "วันที่เพิ่มข้อมูล",field: "date"},
            {title: "",field: "ED"}
        ]
        } 
    // const [dataTable, setDataTable] = useState(initial);
    const tableForm = (
        <div className="container-fluid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={initial.data} columns={initial.columns} title=""/>
            </Suspense>
            
        </div>
    )
    
    const template = (
        <div className="flex justify-content flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-lg m-0"><FontAwesomeIcon icon={faFileAlt}/> ประเภทการลา</h2>
            </div>
            <hr />
            <div className="flex flex-col gap-2 max-h-screen overflow-auto">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 col-12">
                            <InputGroupWithLabel id="input_emp_id" label="รหัสแผนก" type="text" placeholder="รหัสแผนก" />
                        </div>
                        <div className="col-md-4 col-12">
                            <InputGroupWithLabel id="input_emp_id" label="แผนกช่างซ่อม" type="text" placeholder="แผนกช่างซ่อม" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="btn btn-success w-1/4" ><FontAwesomeIcon icon={faSave}/> บันทึก</button>
                    </div>
                    <div className="mt-3">
                        <Suspense fallback={<Skeleton/>}>
                            <CardFillColorNonFooter contentBody={tableForm}/>
                        </Suspense>
                        
                    </div>
                </div>
            </div>
        </div> 
    )   

    return(
        <>
            <Suspense fallback={<Skeleton/>}>
                <CardFillColorNonFooter contentBody={template} />
            </Suspense>
        </>
    )
}

export const Leave = () => {
    // const ref = useRef(null)
    // const [height, setHeight] = useState(0);

    const acceptCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">คำขออนุมัติ</p>
            <div className="text-end">
                <p className="text-3xl m-0">10</p>
                <p className="text-md m-0">คำขอที่ผ่านการอนุมัติ</p>
            </div>
        </div>
    )
    const totalCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">คำขออนุมัติ</p>
            <div className="text-end">
                <p className="text-3xl m-0">10</p>
                <p className="text-md m-0">คำขอทั้งหมด</p>
            </div>
        </div>
    )
    const waitingCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">คำขออนุมัติ</p>
            <div className="text-end">
                <p className="text-3xl m-0">10</p>
                <p className="text-md m-0">คำขอที่รอการอนุมัติ</p>
            </div>
        </div>
    )
    const denyCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">คำขออนุมัติ</p>
            <div className="text-end">
                <p className="text-3xl m-0">10</p>
                <p className="text-md m-0">คำขอที่ไม่ผ่านการอนุมัติ</p>
            </div>
        </div>
    )

    const [modalShow, setModalShow] = useState(false)

    const datainitial = {
        data:[
            {name: 'unlimit', leave_type:"ลากิจ unarn", subject:"ไปทำธุระต่างจังหวัด", date_start:"3/7/2023", date_end:"5/7/2023", status:"processing", ED:<EditDelete/>, view:<ModalButton classBtn="btn btn-outline-primary" setModalShow={setModalShow} icon={faEye}/> },
        ],
        columns:[
            {title:"",field:"ED"},
            {title:"ชื่อ",field:"name"},
            {title:"ประเภทการลา",field:"leave_type"},
            {title:"เรื่อง",field:"subject"},
            {title:"เริ่มลาวันที่",field:"date_start"},
            {title:"ถึงวันที่",field:"date_end"},
            {title:"สถานะ",field:"status",
                lookup:{
                    waiting: "รอดำเนินการ", 
                    processing:"กำลังดำเนินการ",
                    success:"ดำเนินการเสร็จสิ้น", 
                    deny:"ปฏิเสธ",
                    unable:"ไม่สามารถดำเนินการได้",
                }
        },
            {title:"",field:"view"},
        ]
    }
    // useEffect(() => {
    //     setHeight(ref.current.clientHeight)
    //     console.log(height);
    // }, [height])
    const tableLeave = (
        <div className="container-fluid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={datainitial.data} columns={datainitial.columns} title=""/>
            </Suspense>
            
            
        </div>
    )

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
                    <div className="col-lg-3 col-md-6 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            <CardFillColorNonFooter classBody="bg-blue-400 hover:bg-blue-500 transition-all duration-300 rounded" contentBody={totalCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 h-full"/>
                        </Suspense>
                        
                        
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <Suspense fallback={<Skeleton/>}>
                         <CardFillColorNonFooter classBody="bg-green-400 hover:bg-green-500 transition-all duration-300 rounded" contentBody={acceptCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 h-full"/>
                        </Suspense>
                        
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <Suspense fallback={<Skeleton/>}>
                          <CardFillColorNonFooter classBody="bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 rounded" contentBody={waitingCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 h-full"/>
                        </Suspense>
                        
                    </div>
                    
                    <div className="col-lg-3 col-md-6 col-12">
                        <Suspense fallback={<Skeleton/>}>
                         <CardFillColorNonFooter classBody="bg-red-400 hover:bg-red-500 transition-all duration-300 rounded" contentBody={denyCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 h-full"/> 
                        </Suspense>
                        
                    </div>
                </div>
                <div className="mt-3">
                    <Suspense fallback={<Skeleton/>}>
                        <CardFillColorNonFooter contentBody={tableLeave}/>
                    </Suspense>
                </div>
                {/* <div className="col-lg-3 col-md-4 col-12">
                    <SidebarRightManager maxHeight={height}/>
                </div> */}
            </div>
            {/* modal */}
            <ModalCard modalShow={modalShow} setModalShow={setModalShow} modalBody={Modal.mBody} modalHead={Modal.mHead}/>
        </>
    )
}
