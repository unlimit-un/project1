import { faPencil, faSave, faTrash, faUserPlus, faEye, faCopy, faClapperboard, faClipboardCheck, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Bandage } from '../../../components/Bandage';
import { CardFillColorNonFooter } from '../../../components/Cards';
import { InputGroupWithLabel, SelectOptionWithLabel } from '../../../components/FormElements';
import { ModalCard, ModalButton } from '../../../components/Modals';
import { TablesStripedDataTable } from '../../../components/Tables';

export const LeaveType = () => {
    const initial = {
        thead:['รหัสแผนก', 'ชื่อแผนก', 'สถานที่', 'วันที่เพิ่มข้อมูล', ''],
        tbody:[
            ['DEPT220', 'ช่างทั่วไป', 'ตึก A', '3/7/2023', <div className="flex justify-center gap-2">
            <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
            <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
        </div>],
            ['DEPT200', 'ช่างอิเล็กทรอนิกส์', 'ตึก A', '6/7/2023', <div className="flex justify-center gap-2">
            <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
            <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
        </div>],
        ]
        } 
    const [dataTable, setDataTable] = useState(initial);
    const tableForm = (
        <div className="container-fluid">
            <TablesStripedDataTable data={dataTable}/>
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
                        <CardFillColorNonFooter contentBody={tableForm}/>
                    </div>
                </div>
            </div>
        </div> 
    )   

    return(
        <>
            <CardFillColorNonFooter contentBody={template} />
        </>
    )
}

export const Leave = () => {
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

    const initial = {
        thead:['ชื่อ', 'ประเภทการลา', 'เรื่อง', 'เริ่มลาวันที่', 'ถึงวันที่', 'สถานะ'],
        tbody:[
            ['unlimit', 'ลากิจ', 'ไปทำธุระต่างจังหวัด', '3/7/2023', '5/7/2023', <div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-success" text="อนุมัติ"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>],
            ['unlimit', 'ลาพักร้อน', 'ลาไปเที่ยว', '6/7/2023', '12/7/2023', <div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-danger" text="ไม่อนุมัติ"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>],
            ['unlimit', 'ลาป่วย', 'ป่วยไข้', '7/8/2023', '15/8/2023', <div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-warning" text="รออนุมัติ"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>],
        ]
    }
    const [dataTable, setDataTable] = useState(initial);

    const handleFilterData = (text) =>{
        setDataTable({
                ...initial, 
                tbody:  initial.tbody.filter(item =>{
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
                            <li><Bandage classBandage="bg-success !w-1/4" text="อนุมัติ"/></li>
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
                        <button className="w-full h-full" onClick={()=>handleFilterData('ทั้งหมด')}>
                            <CardFillColorNonFooter classBody="bg-blue-400 hover:bg-blue-500 transition-all duration-300 rounded" contentBody={totalCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 h-full"/>
                        </button>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <button className="w-full h-full" onClick={()=>handleFilterData('อนุมัติ')}>
                            <CardFillColorNonFooter classBody="bg-green-400 hover:bg-green-500 transition-all duration-300 rounded" contentBody={acceptCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 h-full"/>
                        </button>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <button className="w-full h-full" onClick={()=>handleFilterData('รออนุมัติ')}>
                            <CardFillColorNonFooter classBody="bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 rounded" contentBody={waitingCard} classCard="transition-all duration-300 hover:-translate-y-3 h-full"/>
                        </button>
                    </div>
                    
                    <div className="col-lg-3 col-md-6 col-12">

                        <button className="w-full h-full" onClick={()=>handleFilterData('ไม่อนุมัติ')}>
                            <CardFillColorNonFooter classBody="bg-red-400 hover:bg-red-500 transition-all duration-300 rounded" contentBody={denyCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 h-full"/>
                        </button>
                    </div>
                </div>
                <div className="mt-3">
                    <CardFillColorNonFooter contentBody={tableLeave} />
                </div>
            </div>
            {/* modal */}
            <ModalCard modalShow={modalShow} setModalShow={setModalShow} modalBody={Modal.mBody} modalHead={Modal.mHead}/>
        </>
    )
}
