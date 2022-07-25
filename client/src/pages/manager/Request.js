import React,{Suspense, useEffect, useRef, useState} from 'react'
import {  faHome, faEye,faCopy,faPencil,faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { CardFillColorNonFooter } from '../../components/Cards'
import { ModalCard,ModalButton } from '../../components/Modals'
import { Bandage } from '../../components/Bandage'
// import { MuiTable  } from '../../components/Tables'
import { Skeleton } from '../../components/Loading'
import { EditDelete } from '../../components/EditDelete'
import { SidebarRightManager } from '../../components/structure/SidebarM'
import { lazily } from 'react-lazily'

const {MuiTable} = lazily(()=>import('../../components/Tables'));
const {CardFillColorNonFooter} = lazily(()=>import('../../components/Cards'));

const Request = () => {

    // const ref = useRef(null)
    // const [height, setHeight] = useState(0);

    

    const acceptCard =(
       <div className="container-fulid">
            <p className="text-3xl m-0 text-start">112</p>
            <p className="text-3xl m-0 text-end">คำขอทั้งหมด</p>
       </div> 
    )
    const totalCard =(
        <div className="container-fulid">
            <p className="text-3xl m-0 text-start">8</p>
            <p className="text-3xl m-0 text-end">ที่ยังไม่เปิด</p>
        </div>
    )
    const waitingCards =(
        <div className="container-fulid">
            <p className="text-3xl m-0 text-start">0</p>
            <p className="text-3xl m-0 text-end">อื่นๆ</p>
        </div>
    )
    const approveCard = (
        <div className="container-fulid">
            <p className="text-3xl m-0 text-start">0</p>
            <p className="text-3xl m-0 text-end">คำขอที่อนุมัติ</p>
        </div>
    )
    const disapprovedCard = (
        <div className="container-fulid">
            <p className="text-3xl m-0 text-start">0</p>
            <p className="text-3xl m-0 text-end">คำขอที่ไม่อนุมัติ</p>
        </div>
    )

    const [modalShow,setModalShow] = useState(false)

    const MuiTableData = {
        data:[
            {id: 'A233456', subject:"เบิกเครื่องมือซ้อม", date:"3/7/2023",status:"processing", ED:<EditDelete/>, view:<ModalButton classBtn="btn btn-outline-primary" setModalShow={setModalShow} icon={faEye}/> },
        ],
        columns: [
            {title: "",field: "ED"},
            {title: "รหัสพนักงาน",field: "id",  },
            {title: "เรื่อง",field: "subject",  },
            {title: "วันที่แจ้ง",field: "date", },
            {title: "สถานะ",field: "status", 
                lookup:{
                    waiting: "รอดำเนินการ", 
                    processing:"กำลังดำเนินการ",
                    success:"ดำเนินการเสร็จสิ้น", 
                    deny:"ปฏิเสธ",
                    unable:"ไม่สามารถดำเนินการได้",
                }
            },
            {title: "",field: "view"},
        ]
    }

    // useEffect(() => {
    //     setHeight(ref.current.clientHeight)
    //     console.log(height);
    // }, [height])

    const tableRequest = (
        <div className="container-fulid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={MuiTableData.data} columns={MuiTableData.columns} title=""/>
            </Suspense>
        </div>
    )

    const Modal = {
        mHead:(
            <>
                <h1 className="m0 text-2xl"><FontAwesomeIcon icon={faCopy}/> รายละเอียด</h1>
            </>
        ),
        mBody:(
            <>
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-12">
                        <ul>
                            <li>รหัสพนักงาน :</li>
                            <li>ชื่อ - นามสกุล :</li>
                            <li>แม่บ้าน / ช่าง :</li>
                            <li>รายละเอียด :</li>
                            <li>วันที่แจ้ง :</li>
                            <li>สถานะ</li>
                        </ul>
                    </div>
                    <div className="col-lg-9 col-md-8 col-12">
                        <ul className="gap-2">
                            <li>A233456</li>
                            <li>unlimit unarn</li>
                            <li>ช่างซ่อม</li>
                            <li>เบิกเครื่องมือซ้อม</li>
                            <li>3/7/2023</li>
                            <li>"กำลังดำเนินการ"</li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
         <h1 className="text-2xl"><FontAwesomeIcon icon={faHome}/> หน้าหลัก</h1>
         <div className="container-fluid">
            <div className="row items-stretch gap-y-2">
                <div className="col-md-4 col-12">
                     <Suspense fallback={<Skeleton/>}>
                        <CardFillColorNonFooter classBody="bg-blue-400  rounded" contentBody={acceptCard} classCard="text-white "/>
                     </Suspense>
                 </div>
                 <div className="col-md-4 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            <CardFillColorNonFooter classBody="bg-green-400  rounded" contentBody={totalCard} classCard="text-white "/>
                        </Suspense>
                 </div>
                    <div className="col-md-4 col-12">
                         <Suspense fallback={<Skeleton/>}>
                            <CardFillColorNonFooter classBody="bg-yellow-400  rounded" contentBody={waitingCards} classCard=""/>
                         </Suspense>
                     </div>
                    {/* <div className="col-lg-6 col-12"> */}
                        <div className="col-md-4 col-12">
                                <Suspense fallback={<Skeleton/>}>
                                    <CardFillColorNonFooter classBody="bg-red-400  rounded" contentBody={approveCard} classCard="text-white "/>
                                </Suspense>
                        </div>
                        <div className="col-md-4 col-12">
                                <Suspense fallback={<Skeleton/>}>
                                    <CardFillColorNonFooter classBody="bg-red-400  rounded" contentBody={disapprovedCard} classCard="text-white "/>
                                </Suspense>
                        </div>
                 {/* </div> */}
            </div>
            <div className="mt-3">
                <Suspense fallback={<Skeleton/>}>
                    <CardFillColorNonFooter contentBody={tableRequest}/>
                </Suspense>
            </div>
            {/* <div className="col-md-4 col-12">
                <SidebarRightManager maxHeight={height}/>
            </div> */}
         </div>
         {/* modal */}
         <ModalCard modalShow={modalShow} setModalShow={setModalShow} modalBody={Modal.mBody} modalHead={Modal.mHead}/>
        </>
    )
}

export default Request