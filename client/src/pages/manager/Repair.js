import { faBell, faCopy, faEye,faPencil,faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { SidebarRightManager } from '../../components/structure/SidebarM'
import { Bandage } from '../../components/Bandage'
// import { CardFillColorNonFooter } from '../../components/Cards'
import { ModalCard, ModalButton } from '../../components/Modals'
// import { TablesStriped } from '../../components/Tables'
import { lazily } from 'react-lazily'
import { Skeleton } from '../../components/Loading'
import EditDelete from '../../components/EditDelete'



const {MuiTable} = lazily(()=>import('../../components/Tables'));
const {CardFillColorNonFooter} = lazily(()=>import('../../components/Cards'));

const Repair = () => {

    const ref = useRef(null)
    const [height, setHeight] = useState(0);


    const totalCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">ทั้งหมด</p>
            <div className="text-end">
                <p className="text-3xl m-0">10</p>
                <p className="text-md m-0">รายการ</p>
            </div>
        </div>
    )

    const successCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">ดำเนินการเสร็จสิ้น</p>
            <div className="text-end">
                <p className="text-3xl m-0">8</p>
                <p className="text-md m-0">รายการ</p>
            </div>
        </div>
    )

    const processCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">กำลังดำเนินการ</p>
            <div className="text-end">
                <p className="text-3xl m-0">2</p>
                <p className="text-md m-0">รายการ</p>
            </div>
        </div>
    )

    const waitingCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">รอดำเนินการ</p>
            <div className="text-end">
                <p className="text-3xl m-0">0</p>
                <p className="text-md m-0">รายการ</p>
            </div>
        </div>
    )
    const [modalShow, setModalShow] = useState(false)
   

    const MuiTableData = {
        data:[
            {issue: 'อ่างล้างหน้าพัง', notify_person:"unlimit unarn", date:"2022-02-21", location:"ตึก A", room:"A202", status:"processing", ED:<EditDelete/>, view:<ModalButton classBtn="btn btn-outline-primary" setModalShow={setModalShow} icon={faEye}/> },
        ],
        columns: [
            {title: "",field: "ED"},
            {title: "ปัญหา",field: "issue",  },
            {title: "ผู้แจ้ง",field: "notify_person",  },
            {title: "วันที่แจ้ง",field: "date", },
            {title: "สถานที่",field: "location", },
            {title: "ห้อง",field: "room", },
            {title: "สถานะ",field: "status", 
                lookup:{
                    waiting: <Bandage classBandage="bg-warning text-dark" text="รอดำเนินการ"/>, 
                    processing:<Bandage classBandage="bg-primary" text="กำลังดำเนินการซ่อม"/>,
                    success:<Bandage classBandage="bg-success" text="ดำเนินการเสร็จสิ้น"/>, 
                    deny:<Bandage classBandage="bg-danger" text="ปฏิเสธ"/>,
                    unable:<Bandage classBandage="bg-red-600 text-dark" text="ไม่สามารถดำเนินการได้"/>,
                }
            },
            {title: "",field: "view"},
        ]
    }

    useEffect(() => {
        setHeight(ref.current.clientHeight)
        console.log(height);
    }, [height])
    const tableLeave = (
        <div className="container-fluid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={MuiTableData.data} columns={MuiTableData.columns} title=""/>
            </Suspense>
        </div>
    )

    const Modal = {
        mHead: (
            <>
                <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCopy}/> รายละเอียดการแจ้งซ่อม</h1>
            </>
        ),
        mBody: (
            <>
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-12">
                        <ul>
                            <li>ปัญหา</li>
                            <li>ผู้แจ้ง</li>
                            <li>วันที่แจ้ง</li>
                            <li>สถานที่</li>
                            <li>ห้อง</li>
                            <li>สถานะ</li>
                        </ul>
                    </div>
                    <div className="col-lg-9 col-md-8 col-12">
                        <ul className="gap-2">
                            <li>อ่างล้างหน้าพัง</li>
                            <li>unlimit unarn</li>
                            <li>2022-02-21</li>
                            <li>ตึก A</li>
                            <li>A202</li>
                            <li><Bandage classBandage="bg-primary" text="กำลังดำเนินการซ่อม"/></li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faBell}/> จัดการข้อมูลการแจ้งซ่อม</h1>
            <div className="container-fluid">
                <div className="row gap-y-3">
                    <div className="col-lg-9 col-md-8 col-12" ref={ref}>
                        <div className="row items-stretch gap-y-2">
                            <div className="col-lg-3 col-md-6 col-12">
                                <Suspense fallback={<Skeleton/>}>
                                    <CardFillColorNonFooter classBody="bg-blue-400  rounded" contentBody={totalCard} classCard="text-white "/>
                                </Suspense>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <Suspense fallback={<Skeleton/>}>
                                    <CardFillColorNonFooter classBody="bg-green-400  rounded" contentBody={successCard} classCard="text-white "/>
                                </Suspense>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <Suspense fallback={<Skeleton/>}>
                                    <CardFillColorNonFooter classBody="bg-yellow-400  rounded" contentBody={processCard} classCard=""/>
                                </Suspense>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <Suspense fallback={<Skeleton/>}>
                                    <CardFillColorNonFooter classBody="bg-red-400  rounded" contentBody={waitingCard} classCard="text-white "/>
                                </Suspense>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Suspense fallback={<Skeleton/>}>
                                <CardFillColorNonFooter contentBody={tableLeave} />
                            </Suspense>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-12">
                        <SidebarRightManager maxHeight={height}/>
                    </div>
                </div>
            </div>

            {/* modal */}
            <ModalCard modalShow={modalShow} setModalShow={setModalShow} modalBody={Modal.mBody} modalHead={Modal.mHead}/>
        </>
    )
}

export default Repair