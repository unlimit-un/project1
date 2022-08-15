import React, { useState  } from 'react'
import { InputGroupWithLabel, SelectOptionWithLabel } from '../../../components/FormElements'
import { CardFillColorNonFooter, CardFillColorNonFooterShadow } from '../../../components/Cards'
import { ModalButton, ModalCard } from '../../../components/Modals'
import { faCalendarXmark, faTable, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Calendar from '../Calendar'
import { Tab, Tabs } from 'react-bootstrap'
import { MuiTable, TablesStriped } from '../../../components/Tables'
import { EditDelete } from '../../../components/EditDelete'
import FullCalendar from '@fullcalendar/react'
import DayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"


// const TablesStriped = lazy(()=> import('../../../components/Tables').then(module=> ({default: module.TablesStriped})))
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
    const MuiTableData = {
        data:[
            {name_teem: 'A', special_events:'งานประชุม',ED:<EditDelete/>, view:<ModalButton text="จัดการสมาชิก" setModalShow={setShowModal} classBtn="btn btn-info text-white"/>},
        ],
        columns:[
           {title:"ชื่อทีม",field:"name_teem"},
           {title:"งานประชุม",field:"special_events"},
           {title: "",field: "view"}
        ]
    }
    const dataTableModal = {
        data:[
            {name: "unlimit unarn", position: "ช่างซ่อม",ED:<EditDelete/>}
        ],
        columns:[
            {title:"ชื่อ",field:"name"},
            {title:"ตำแหน่ง",field:"position"},
            {title:"",field:"ED"} 
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
                
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<MuiTable data={dataTableModal.data} columns={dataTableModal.columns} title=""/>}/>
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
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<MuiTable data={MuiTableData.data} columns={MuiTableData.columns} title=""/>}/>
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
        data:[
            {special_events:"งานประชุม",location:"ตึกA",room:"A202",date_Start:'2022-07-04 06:00:00',date_End:'2022-07-04 08:00:00',ED:<EditDelete/>}
        ],
        columns:[
            {title:"กิจกรรมพิเศษ",field:"special_events"},
            {title:"สถานที่",field:"location"},
            {title:"ห้อง",field:"room"},
            {title:"จากวันที่",field:"date_Start"},
            {title:"ถึงวันที่",field:"date_End"},
            {title:"",field:"ED"}
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
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<MuiTable data={dataTable.data} columns={dataTable.columns} title=""/>}/>
            
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
        data:[
            {unwell_staff:"Unlimit unarn",replacement_worker:"Nik",job_type:"งานพิเศษ",job_change:"ทีม A งานเลี้ยงรุ่น",ED:<EditDelete/>}
        ],
        columns:[
            {title:"พนักงานที่ไม่สะดวก",field:"unwell_staff"},
            {title:"พนักงานที่แทน",field:"replacement_worker"},
            {title:"ประเภทงาน",field:"job_type"},
            {title:"งานที่เปลี่ยน",field:"job_change"},
            {title:"",field:"ED"}
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
                <CardFillColorNonFooter contentBody={<MuiTable data={dataTableDutyCheck.data} columns={dataTableDutyCheck.columns} title=""/>}/>
            </div>
        </div>
        </>
    )
}

export const SchedualWork = () =>{
    return(
        <FullCalendar
            plugins={[DayGridPlugin, timeGridPlugin,interactionPlugin]}
            headerToolbar={{
                center: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            // events={event}
            eventDisplay="auto"
        />
    )
}