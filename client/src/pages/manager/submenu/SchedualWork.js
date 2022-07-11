import React, { Suspense, useEffect, useState, useTransition } from 'react'
import { InputGroupWithLabel, SelectOptionWithLabel } from '../../../components/FormElements'
import { CardFillColorHeader, CardFillColorNonFooter, CardFillColorNonFooterShadow } from '../../../components/manager/subComponents/Cards'
import { ModalButton, ModalCard, ModalCardConfirm } from '../../../components/Modals'
import { TablesStripedDataTable } from '../../../components/Tables'
import { faCalendarXmark, faCheck, faClipboardCheck, faXmark, faPencil, faPlus, faSearch, faTable, faTrash, faTrashAlt, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Calendar from '../Calendar'
import { Tab, Tabs } from 'react-bootstrap'
import Spiner from '../../../components/Spiner'
import { Bandage } from '../../../components/manager/subComponents/Bandage'

export const TeamManage = () =>{
    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const spacial_options = [
        {value: '1', text: 'งานประชุม'},
        {value: '2', text: 'งานเลี้ยงรุ่น'}
    ]
    const member = [
        {value: '1', text: 'min'},
        {value: '2', text: 'nik'}
    ]
    const dataTable = {
        thead:['ชื่อทีม', 'กิจกรรมพิเศษ', ''],
        tbody:[
            ['A','งานประชุม', <ModalButton text="จัดการสมาชิก" setModalShow={setShowModal} classBtn="btn btn-info text-white"/>]
        ]
    }
    const dataTableModal = {
        thead:['ชื่อ', 'ตำแหน่ง', ''],
        tbody:[
            [
                'unlimit unarn',
                'ช่างซ่อม',
                <div className="flex justify-center gap-2">
                    <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
                    <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
                </div>
            ]
        ]
    }

    const Modal = {
        mHead: (
            <>
                <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faUsersGear}/> จัดการสมาชิก</h1>
            </>
        ),
        mBody: (
            <>
                <SelectOptionWithLabel options_arr_obj={member} id="member" label="สมาชิกในทีม"/>
                <div className="flex justify-end">
                    <button className="btn btn-outline-success w-1/4">เพิ่ม</button>
                </div>
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<TablesStripedDataTable data={dataTableModal} id="_table2"/>}/>
            </>
        )
    }
    const callback_name = ({target:{value}})=>{
        setName(value)
    }
    const contentBody = (
        <>
            <div className="container-fluid">
                <h1 className="text-xl"><FontAwesomeIcon icon={faUsersGear}/> จัดการทีม</h1>
                <hr />
                <div className="row">
                    <div className="col-md-6 col-12">
                        <InputGroupWithLabel id="name" label="ชื่อทีม" type="text" callback={callback_name}/>
                    </div>
                    <div className="col-md-6 col-12">
                        <SelectOptionWithLabel id="spacial_id" label="กิจกรรมพิเศษ" options_arr_obj={spacial_options}/>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="btn btn-outline-primary w-1/3">บันทึก</button>
                </div>
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<TablesStripedDataTable data={dataTable} id="_table1"/>}/>
            </div>
        </>
    )
    return (
        <>
            <CardFillColorNonFooter contentBody={contentBody}/>
            <ModalCard modalShow={showModal} setModalShow={setShowModal} modalBody={Modal.mBody} modalHead={Modal.mHead}/>
        </>
    )
}

// spacial work
export const SpacialWork = () =>{
    const location_options = [
        {value: '1', text: 'งานประชุม'},
        {value: '2', text: 'งานเลี้ยงรุ่น'}
    ]
    const room_options = [
        {value: '1', text: 'A202'},
        {value: '2', text: 'A203'}
    ]
    const [inputData, setInputData] = useState({
        title:'',
        dateStart:'',
        dateEnd:''
    })

    const onChangeTitle = ({target:{ value }})=>{
        setInputData({...inputData, title: value})
    }
    const onChangeStart = ({target:{ value }})=>{
        setInputData({...inputData, dateStart: value})
    }
    const onChangeEnd = ({target:{ value }})=>{
        setInputData({...inputData, dateEnd: value})
    }

    const dataTable = {
        thead:['กิจกรรมพิเศษ', 'สถานที่', 'ห้อง', 'จากวันที่', 'ถึงวันที่',''],
        tbody:[
            [
                'งานประชุม',
                'ตึกA', 
                'A202', 
                '2022-07-04 06:00:00', 
                '2022-07-04 08:00:00', 
                <div className="flex justify-center gap-2">
                    <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
                    <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
                </div>
            ],
        ]
    }
    const contentBody = (
        <>
            <div className="container-fluid">
                <h1 className="text-xl"><FontAwesomeIcon icon={faCalendarXmark}/> จัดการกิจกรรมพิเศษ</h1>
                <hr />
                <div className="row">
                    <div className="col-md-6 col-12">
                        <SelectOptionWithLabel id="location_id" label="สถานที่" options_arr_obj={location_options}/>
                    </div>
                    <div className="col-md-6 col-12">
                        <SelectOptionWithLabel id="room_id" label="ห้อง" options_arr_obj={room_options}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-12">
                        <InputGroupWithLabel id="title" label="ชื่อกิจกรรม" type="text" callback={onChangeTitle} />
                    </div>
                    <div className="col-md-4 col-12">
                        <InputGroupWithLabel id="dateStart" label="จากวันที่" type="datetime-local" callback={onChangeStart} />
                    </div>
                    <div className="col-md-4 col-12">
                        <InputGroupWithLabel id="dateEnd" label="ถึงวันที่" type="datetime-local" callback={onChangeEnd} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="btn btn-outline-primary w-1/3">บันทึก</button>
                </div>
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<TablesStripedDataTable data={dataTable} id="_table1"/>}/>
            
            </div>
        </>
    )
    return (
        <>
            <Tabs defaultActiveKey="calendar" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="calendar" title="ตารางงานพิเศษ">
                    <Calendar/>
                </Tab>
                <Tab eventKey="form" title="จัดการงานพิเศษ">
                    <CardFillColorNonFooter contentBody={contentBody} classCard="mt-3"/>
                </Tab>
            </Tabs>
            {/* <ModalCard modalShow={showModal} setModalShow={setShowModal} modalBody={Modal.mBody} modalHead={Modal.mHead}/> */}
        </>
    )
}

// MaidDuty
export const MaidDuty = () =>{
    const [isPending, startTransition] = useTransition();
    const maid_options = [
        {value: '1', text: 'Nik'},
        {value: '2', text: 'Min'}
    ]
    const days_options = [
        {value: '1', text: 'วันจันทร์'},
        {value: '2', text: 'วันอังคาร'}
    ]
    const [inputData, setInputData] = useState({
        title:'',
        dateStart:'',
        dateEnd:''
    })

    const onChangeTitle = ({target:{ value }})=>{
        setInputData({...inputData, title: value})
    }
    const onChangeStart = ({target:{ value }})=>{
        setInputData({...inputData, dateStart: value})
    }
    const onChangeEnd = ({target:{ value }})=>{
        setInputData({...inputData, dateEnd: value})
    }

    const dataTable = {
        thead:['แม่บ้าน', 'วันที่ทำงาน', 'เวลาเริ่มงาน', 'เวลาเสร็จสิ้นงาน', ''],
        tbody:[
            [
                'Unlimit unarn',
                'วันจันทร์', 
                '08:00:00', 
                '16:00:00', 
                <div className="flex justify-center gap-2">
                    <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
                    <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
                </div>
            ],
        ]
    }
    
    const contentBodys = (
        <>
            <div className="container-fluid">
                <h1 className="text-xl"><FontAwesomeIcon icon={faTable}/> จัดการตารางเวรแม่บ้าน</h1>
                <hr />
                <div className="row">
                    <div className="col-md-6 col-12">
                        <SelectOptionWithLabel id="maid_id" label="แม่บ้าน" options_arr_obj={maid_options}/>
                    </div>
                    <div className="col-md-6 col-12">
                        <SelectOptionWithLabel id="date_id" label="วันที่ทำเวร" options_arr_obj={days_options}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <InputGroupWithLabel id="dateStart" label="จากวันที่" type="datetime-local" callback={onChangeStart} />
                    </div>
                    <div className="col-md-6 col-12">
                        <InputGroupWithLabel id="dateEnd" label="ถึงวันที่" type="datetime-local" callback={onChangeEnd} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="btn btn-outline-primary w-1/3">บันทึก</button>
                </div>
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<TablesStripedDataTable data={dataTable} id="_table1"/>}/>
            
            </div>
        </>
    )


    const [showModal, setShowModal] = useState(false)
    const dataTableDutyAssign = {
        thead:['แม่บ้าน', 'วันที่ทำงาน', 'เวลาเริ่มงาน', 'เวลาเสร็จสิ้นงาน', ''],
        tbody:[
            [
                'Unlimit unarn',
                'วันจันทร์', 
                '08:00:00', 
                '16:00:00', 
                <div className="flex gap-2">
                    <ModalButton setModalShow={setShowModal} icon={faPlus} classBtn="text-white bg-green-500 hover:bg-green-400 p-2 rounded-circle"/>
                    <button className="text-white bg-amber-500 hover:bg-amber-400 p-2 rounded-circle"><FontAwesomeIcon  icon={faPencil} /></button>
                    <button className="text-white bg-red-500 hover:bg-red-400 p-2 rounded-circle"><FontAwesomeIcon  icon={faTrashAlt} /></button>
                </div>
            ],
        ]
    }

    const contentDutyAssign = (
        <>
            <div className="container-fluid">
                <h1 className="text-xl"><FontAwesomeIcon icon={faTable}/> จัดการตารางเวรแม่บ้าน</h1>
                <hr />
                <div className="row items-center">
                    <div className="col-md-8 col-12">
                        <SelectOptionWithLabel id="date_id" label="วันที่ทำเวร" options_arr_obj={days_options}/>
                    </div>
                    <div className="col-md-4 col-12">
                        <button className="btn btn-outline-primary w-full mt-3"><FontAwesomeIcon icon={faSearch}/> ค้นหา</button>
                    </div>
                </div>
                
                <CardFillColorHeader 
                    contentHeader={<h1 className="text-lg m-0">รายชื่อพนักงาน</h1>} 
                    contentBody={
                        <TablesStripedDataTable 
                            data={dataTableDutyAssign} 
                            id="_table2"
                        />
                    }
                />
            
            </div>
        </>
    )
    const dataTableModal =  {
        thead:['ตึก', 'ห้อง', 'รายละเอียดงาน', ''],
        tbody:[
            [
                'A',
                'A202', 
                'กวาด เช็ด ถู',
                <div className="flex gap-2">
                    <ModalButton setModalShow={setShowModal} icon={faPencil} classBtn="text-white bg-amber-500 hover:bg-amber-400 p-2 rounded-circle"/>
                    <button className="text-white bg-red-500 hover:bg-red-400 p-2 rounded-circle"><FontAwesomeIcon  icon={faTrashAlt} /></button>
                </div>
            ],
        ]
    }
    const room_options = [
        {value: '1', text: 'A202'},
        {value: '2', text: 'A203'}
    ]
    const location_options = [
        {value: '1', text: 'ตึก A'},
        {value: '2', text: 'ตึก B'}
    ]
    const material_options = [
        {value: '1', text: 'ไม้กวาด'},
        {value: '2', text: 'ไม้ถูพื้น'}
    ]
    const Modal = {
        mHead: (
            <>
                <h1 className="m-0 text-2xl">มอบหมายงาน</h1>
            </>
        ),
        mBody: (
            <>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <SelectOptionWithLabel id="location_id" options_arr_obj={location_options} label="ตึก"/>
                    </div>
                    <div className="col-md-6 col-12">
                        <SelectOptionWithLabel id="room_id" options_arr_obj={room_options} label="ห้อง"/>
                    </div>
                </div>
                <InputGroupWithLabel id="description" label="รายละเอียดงาน" type="text"/>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <SelectOptionWithLabel id="location_id" options_arr_obj={material_options} label="วัสุดครุภัณฑ์"/>
                    </div>
                    <div className="col-md-6 col-12">
                        <InputGroupWithLabel id="count" label="จำนวน" type="text"/>
                    </div>
                </div>
                <div className="flex justify-end mb-3">
                    <button className="btn btn-success md:w-1/3 w-full">บันทึก</button>
                </div>
                <CardFillColorHeader contentHeader={<h5 className="m-0">งานทั้งหมด</h5>} contentBody={
                    <TablesStripedDataTable 
                        data={dataTableModal} 
                        id="_tableModal"
                    />
                }/>
            </>
        )
    }


    // duty check
    const dataTableDutyCheck = {
        thead:['แม่บ้าน', 'รายละเอียดงาน', 'วัน', 'เวลาเริ่มงาน', 'เวลาที่เสร็จสิ้นงาน', 'เวลาที่กำหนด', 'ตึก', 'ห้อง', 'สถานะ', ''],
        tbody:[
            [
                'Unlimit unarn',
                'ปัดกวาดเช็ดถู', 
                'จันทร์', 
                '08:00:00', 
                '16:00:00', 
                '15:45:00', 
                'ตึก A', 
                'A202', 
                <Bandage classBandage="bg-amber-500" text="รอดำเนินการ"/>, 
                <div className="flex gap-2">
                    <button className="text-white bg-green-500 hover:bg-green-400 p-2 rounded-circle"><FontAwesomeIcon  icon={faCheck} /></button>
                    <button className="text-white bg-red-500 hover:bg-red-400 p-2 rounded-circle"><FontAwesomeIcon  icon={faXmark} /></button>
                </div>
            ],
        ]
    }
    const contentDutyCheck = (
        <>
            <div className="container-fluid">
                <h1 className="text-xl"><FontAwesomeIcon icon={faClipboardCheck}/> ตรวจสอบงานแม่บ้าน</h1>
                <hr />
                <CardFillColorHeader 
                    contentHeader={<h1 className="text-lg m-0">รายชื่อพนักงาน</h1>} 
                    contentBody={
                        <TablesStripedDataTable 
                            data={dataTableDutyCheck} 
                            id="_tableDutyCheck"
                        />
                    }
                />
            
            </div>
        </>
    )

    const [key, setKey] = useState('calendar');
    return (
        <>
            <Tabs 
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="calendar" title="ตารางเวรทั้งหมด">
                    <Suspense fallback={<Spiner/>}>
                        <Calendar/>
                    </Suspense>
                </Tab>
                <Tab eventKey="duty" title="จัดการตารางเวร">
                    <Suspense fallback={<Spiner/>}>
                        <CardFillColorNonFooter contentBody={contentBodys} classCard="mt-3"/>
                    </Suspense>
                </Tab>
                <Tab eventKey="duty_assign" title="จัดการงานแม่บ้าน">
                    <Suspense fallback={<Spiner/>}>
                        <CardFillColorNonFooter contentBody={contentDutyAssign} classCard="mt-3"/>
                    </Suspense>
                </Tab>
                <Tab eventKey="duty_assign_material" title="ตรวจสอบงานแม่บ้าน">
                    <Suspense fallback={<Spiner/>}>
                        <CardFillColorNonFooter contentBody={contentDutyCheck} classCard="mt-3"/>
                    </Suspense>
                </Tab>
            </Tabs>
            <ModalCard modalShow={showModal} setModalShow={setShowModal} modalBody={Modal.mBody} modalHead={Modal.mHead} />
        </>
    )
}

export const UrgentWork = () =>{
    const employees_options = [
        {value: '1', text: 'Min'},
        {value: '2', text: 'Nik'}
    ]
    const type_options = [
        {value: '1', text: 'เวรแม่บ้าน'},
        {value: '2', text: 'งานพิเศษ'}
    ]
    const work_options = [
        {value: '1', text: 'วันจันทร์ 08.00-16.00'},
        {value: '2', text: 'วันอังคาร 08.00-16.00'},
        {value: '3', text: 'ทีม A งานเลี้ยงรุ่น'},
    ]

    const dataTableDutyCheck = {
        thead:['พนักงานที่ไม่สะดวก', 'พนักงานที่แทน', 'ประเภทงาน', 'งานที่เปลี่ยน', ''],
        tbody:[
            [
                'Unlimit unarn',
                'Nik', 
                'งานพิเศษ',
                'ทีม A งานเลี้ยงรุ่น', 
                <div className="flex gap-2">
                    <button className="text-white bg-green-500 hover:bg-green-400 p-2 rounded-circle"><FontAwesomeIcon  icon={faCheck} /></button>
                    <button className="text-white bg-red-500 hover:bg-red-400 p-2 rounded-circle"><FontAwesomeIcon  icon={faXmark} /></button>
                </div>
            ],
        ]
    }
    return(
        <>
            <div className="container-fluid">
            <h1 className="text-xl"><FontAwesomeIcon icon={faTable}/> จัดการงานด่วน</h1>
            <hr />
            <div className="row">
                <div className="col-md-4 col-12">
                    <SelectOptionWithLabel label="ชื่อแม่บ้าน/ช่าง" options_arr_obj={employees_options}/>
                </div>
                <div className="col-md-4 col-12">
                    <SelectOptionWithLabel label="ประเภทงาน" options_arr_obj={type_options} />
                </div>
                <div className="col-md-4 col-12">
                    <SelectOptionWithLabel label="งานที่ต้องการเปลี่ยน" options_arr_obj={work_options} />
                </div>
                <div className="col-md-4 col-12">
                    <SelectOptionWithLabel label="คนที่มาแทน" options_arr_obj={employees_options} />
                </div>
            </div>
            <div className="row justify-end">
                <div className="col-md-4 col-12">
                    <button className="btn btn-success w-full">บันทึก</button>
                </div>
            </div>
            <div className="mt-3">
                <CardFillColorNonFooter contentBody={<TablesStripedDataTable data={dataTableDutyCheck} id="_table"/>}/>
            </div>
        </div>
        </>
    )
}