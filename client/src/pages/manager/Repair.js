import { faBell, faCopy, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { SidebarRightManager } from '../../components/manager/SidebarM'
import { Bandage } from '../../components/manager/subComponents/Bandage'
import { CardFillColorNonFooter } from '../../components/manager/subComponents/Cards'
import { ModalCard, ModalButton } from '../../components/Modals'
import { TablesStripedDataTable } from '../../components/Tables'

const Repair = () => {

    const ref = useRef(null)
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, [])
    

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

    const initial = {
        thead:['ชื่อ', 'ประเภทการลา', 'เรื่อง', 'เริ่มลาวันที่', 'ถึงวันที่', 'สถานะ'],
        tbody:[
            ['unlimit', 'ลากิจ', 'ไปทำธุระต่างจังหวัด', '3/7/2023', '5/7/2023', <div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-success" text="ดำเนินการเสร็จสิ้น"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>],
            ['unlimit', 'ลาพักร้อน', 'ลาไปเที่ยว', '6/7/2023', '12/7/2023', <div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-danger" text="รอดำเนินการ"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>],
            ['unlimit', 'ลาป่วย', 'ป่วยไข้', '7/8/2023', '15/8/2023', <div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-warning" text="กำลังดำเนินการ"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>],
        ]
    }
    const [dataTable, setDataTable] = useState(initial);

    const handleFilterData = (text) =>{
        setDataTable({
                ...initial, 
                tbody:  initial.tbody.filter(item =>{
                    console.log(item);
                if ( item[5].props.children[0].props.text === text ) {
                    return item
                }else if(text === 'ทั้งหมด'){
                    return item
                }
            })
        })
    }
    
    const tableLeave = (
        <div className="container-fluid">
            <TablesStripedDataTable data={dataTable}/>
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
                            <li><Bandage classBandage="bg-success !w-1/4" text="อนุมัติ"/></li>
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
                                <button className="w-full h-full" onClick={()=>handleFilterData('ทั้งหมด')}>
                                    <CardFillColorNonFooter classBody="bg-blue-400 hover:bg-blue-500 transition-all duration-300 rounded" contentBody={totalCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 w-full h-full"/>
                                </button>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <button className="w-full h-full" onClick={()=>handleFilterData('ดำเนินการเสร็จสิ้น')}>
                                    <CardFillColorNonFooter classBody="bg-green-400 hover:bg-green-500 transition-all duration-300 rounded" contentBody={successCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 w-full h-full"/>
                                </button>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <button className="w-full h-full" onClick={()=>handleFilterData('กำลังดำเนินการ')}>
                                    <CardFillColorNonFooter classBody="bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 rounded" contentBody={processCard} classCard="transition-all duration-300 hover:-translate-y-3 w-full h-full"/>
                                </button>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <button className="w-full h-full" onClick={()=>handleFilterData('รอดำเนินการ')}>
                                    <CardFillColorNonFooter classBody="bg-red-400 hover:bg-red-500 transition-all duration-300 rounded" contentBody={waitingCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 w-full h-full"/>
                                </button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <CardFillColorNonFooter contentBody={tableLeave} />
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