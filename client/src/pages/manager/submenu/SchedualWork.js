import React, { useState } from 'react'
import { InputGroupwitlabel, SelectOptionWithLabel } from '../../../components/FormElements'
import { CardFillColorNonFooter, CardFillColorNonFooterShadow } from '../../../components/manager/subComponents/Cards'
import { ModalButton, ModalCard } from '../../../components/Modals'
import { TablesStripedDataTable } from '../../../components/Tables'
import { PageUnderConstrunction } from '../../PageError'
import { faCalendarXmark, faPencil, faTrash, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Calendar from '../Calendar'
import { Tab, Tabs } from 'react-bootstrap'

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
                        <InputGroupwitlabel id="name" label="ชื่อทีม" type="text" callback={callback_name}/>
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
            ]
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
                        <InputGroupwitlabel id="title" label="ชื่อกิจกรรม" type="text" callback={onChangeTitle} />
                    </div>
                    <div className="col-md-4 col-12">
                        <InputGroupwitlabel id="dateStart" label="จากวันที่" type="datetime-local" callback={onChangeStart} />
                    </div>
                    <div className="col-md-4 col-12">
                        <InputGroupwitlabel id="dateEnd" label="ถึงวันที่" type="datetime-local" callback={onChangeEnd} />
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
            ]
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
                        <InputGroupwitlabel id="title" label="ชื่อกิจกรรม" type="text" callback={onChangeTitle} />
                    </div>
                    <div className="col-md-4 col-12">
                        <InputGroupwitlabel id="dateStart" label="จากวันที่" type="datetime-local" callback={onChangeStart} />
                    </div>
                    <div className="col-md-4 col-12">
                        <InputGroupwitlabel id="dateEnd" label="ถึงวันที่" type="datetime-local" callback={onChangeEnd} />
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