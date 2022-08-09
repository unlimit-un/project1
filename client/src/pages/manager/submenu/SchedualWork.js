import React, { lazy, Suspense, useEffect, useState, useTransition } from 'react'
import { InputGroupWithLabel, SelectOptionWithLabel } from '../../../components/FormElements'
import { CardFillColorHeader, CardFillColorNonFooter, CardFillColorNonFooterShadow } from '../../../components/Cards'
import { ModalButton, ModalCard, ModalCardConfirm } from '../../../components/Modals'
import { faCalendarXmark, faCheck, faClipboardCheck, faXmark, faPencil, faPlus, faSearch, faTable, faTrash, faTrashAlt, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Calendar from '../Calendar'
import { Tab, Tabs } from 'react-bootstrap'
import {Spiner} from '../../../components/Loading'
import { Bandage } from '../../../components/Bandage'
import { MuiTable, TablesStriped } from '../../../components/Tables'
import { EditDelete } from '../../../components/EditDelete'
import { deleteMaidDuty, getDaysOfWeek, getMaidByManagerId, getMaidDutyById, getMaidDutyByManagerId, insertMaidDuty, updateMaidDuty } from '../../../controllers/manager/SchedualWorkController'
import FullCalendar from '@fullcalendar/react'
import DayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"
import { ArrayColor } from '../../../utils/ArrayColor'

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

// MaidDuty
export const MaidDuty = () =>{

    const [maidOptions, setMaidOptions] = useState([])
    const [daysOfWeekOptions, setDaysOfWeekOptions] = useState([])

    const [maidDutyDataTable, setMaidDutyDataTable] = useState([])
    const [inputData, setInputData] = useState({
        maid_id:'',
        date_week_id:'',
        time_start:'',
        time_end:''
    })
    const [inputKeys, setInputKeys] = useState({
        maid_id:'maid_id',
        date_week_id:'date_week_id',
        time_start:'time_start',
        time_end:'time_end'
    })
    //modal state
    const [maidIdMaidDutyModal, setMaidIdMaidDutyModal] = useState('')
    const [dayMaidDutyModal, setDayIdMaidDutyModal] = useState('')
    const [timeStartMaidDutyModal, setTimeStartMaidDutyModal] = useState('')
    const [timeEndMaidDutyModal, setTimeEndMaidDutyModal] = useState('')
    const [maidDutyIdMaidDutyModal, setMaidDutyIdDutyModal] = useState('')
    // console.log({maidIdMaidDutyModal, dayMaidDutyModal, timeStartMaidDutyModal, timeEndMaidDutyModal, maidDutyIdMaidDutyModal});
    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState({mHead: <></>, mBody:<></>})

    const loadOptionsData = async() =>{
        const maidByManagerId = await getMaidByManagerId();
        const daysOfWeek = await getDaysOfWeek();
        setMaidOptions([{value:'', text: 'เลือกแม่บ้าน'}, ...maidByManagerId.map(item=>{
            return {value:item['maid_id'], text: item['maid_name']}
        })])
        setDaysOfWeekOptions([{value:'', text: 'เลือกวันเวลา'},...daysOfWeek.map(item=>{
            return {value:item['date_week_id'], text: item['date_week_full_name_th']}
        })])
    }

    const [event, setEvent] = useState([])
    const loadMaidDutyDataTable = async () =>{
        const maidDuty = await getMaidDutyByManagerId();
        setMaidDutyDataTable(maidDuty)
        let checkName = ''
        let colorIndex = 0;
        const data = maidDuty.map((item, i)=>{
            if (checkName !== item['maid_name']) {
                checkName = item['maid_name']
                colorIndex = colorIndex+1
            }
            return{
                title: item['maid_name'],
                startTime: item['time_start'],
                endTime: item['time_end'],
                daysOfWeek: [item['date_week_id']],
                color: ArrayColor[colorIndex]
            }
        })
        setEvent([...data])
    }

    const handleMaidSelect = ({target:{ value }})=>{
        setInputData({...inputData, maid_id: value})
    }

    const handleDateSelect = ({target:{ value }})=>{
        setInputData({...inputData, date_week_id: value})
    }
    const onChangeStart = ({target:{ value }})=>{
        setInputData({...inputData, time_start: value})
    }
    const onChangeEnd = ({target:{ value }})=>{
        setInputData({...inputData, time_end: value})
    }

    const formDataUpdateMaidDuty = {
        maid_id: maidIdMaidDutyModal,
        maid_duty_id: maidDutyIdMaidDutyModal,
        date_week_id: dayMaidDutyModal,
        time_start: timeStartMaidDutyModal,
        time_end: timeEndMaidDutyModal
    }

    const reState = () =>{
        setMaidDutyIdDutyModal('')
        setMaidIdMaidDutyModal('')
        setDayIdMaidDutyModal('')
        setTimeStartMaidDutyModal('')
        setTimeEndMaidDutyModal('')
        setInputData({
            maid_id:'',
            date_week_id:'',
            time_start:'',
            time_end:''
        })
        loadMaidDutyDataTable()
    }

    const showEditModalMaidDuty = async (maid_duty_id) =>{
        const [maidDutyById] = await getMaidDutyById(maid_duty_id)
        setMaidDutyIdDutyModal(maidDutyById['maid_duty_id'])
        setMaidIdMaidDutyModal(maidDutyById['maid_id'])
        setDayIdMaidDutyModal(maidDutyById['date_week_id'])
        setTimeStartMaidDutyModal(maidDutyById['time_start'])
        setTimeEndMaidDutyModal(maidDutyById['time_end'])
        setModal({
            mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPencil}/>แก้ไขข้อมูลเวรแม่บ้าน</h1>,
            mBody:(
                <>
                    <div className="row">
                        <div className="col-12">
                            <SelectOptionWithLabel key={maidDutyById['maid_id']} defaultValue={maidDutyById['maid_id']} id="maid_id_modal" label="แม่บ้าน" options_arr_obj={maidOptions} callback={({target:{value}})=>{setMaidIdMaidDutyModal(value)}}/>
                        </div>
                        <div className="col-12">
                            <SelectOptionWithLabel key={maidDutyById['date_week_id']} defaultValue={maidDutyById['date_week_id']} id="date_id_modal" label="วันที่ทำเวร" options_arr_obj={daysOfWeekOptions} callback={({target:{value}})=>{setDayIdMaidDutyModal(value)}} />
                        </div>
                        <div className="col-12">
                            <InputGroupWithLabel key={maidDutyById['time_start']} defaultValue={maidDutyById['time_start']} id="date_start_modal" label="จากวันที่" type="time" callback={({target:{value}})=>{setTimeStartMaidDutyModal(value)}} />
                        </div>
                        <div className="col-12">
                            <InputGroupWithLabel key={maidDutyById['time_end']} defaultValue={maidDutyById['time_end']} id="date_end_modal" label="ถึงวันที่" type="time" callback={({target:{value}})=>{setTimeEndMaidDutyModal(value)}} />
                        </div>
                    </div>
                </>
            )

        })
    }

    useEffect(()=>{
        loadOptionsData()
        loadMaidDutyDataTable()
    },[])

    const dataTable = {
        data:[
            ...maidDutyDataTable.map(item=>{
                return {
                    maid:item['maid_name'],
                    day:item['date_week_full_name_th'],
                    time_work:`${item['time_start']}-${item['time_end']}`,
                    time_reg:`${item['time_reg'].split(/[\s.\sT]/)[0]} ${item['time_reg'].split(/[\s.\sT]/)[1]}`,
                    ED:<EditDelete 
                            DeleteFnc={async ()=>{
                                if(await deleteMaidDuty({maid_duty_id: item['maid_duty_id']})) await reState()
                            }} 
                            EditFnc={()=>{
                                showEditModalMaidDuty(item['maid_duty_id'])
                            }} 
                            setModalShow={setShowModal}
                        />
                    }
            })
            
        ],
        columns:[
            {title:"แม่บ้าน",field:"maid"},
            {title:"วันที่ทำงาน",field:"day"},
            {title:"เวลาเริ่มและสิ้นสุดงาน",field:"time_work"},
            {title:"วันที่เพิ่มข้อมูล",field:"time_reg"},
            {title:"",field:"ED"},
        ]
    }
    
    

    const contentBodys = (
        <>
            <div className="container-fluid">
                <h1 className="text-xl"><FontAwesomeIcon icon={faTable}/> จัดการตารางเวรแม่บ้าน</h1>
                <hr />
                <form 
                    onSubmit={async (e)=>{
                        e.preventDefault();
                        if(await insertMaidDuty(inputData)) await reState(); console.log(inputData);
                    }} 
                >
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <SelectOptionWithLabel key={inputKeys.maid_id} value={inputData.maid_id} id="maid_id" label="แม่บ้าน" options_arr_obj={maidOptions} callback={handleMaidSelect}/>
                        </div>
                        <div className="col-md-6 col-12">
                            <SelectOptionWithLabel key={inputKeys.date_week_id} value={inputData.date_week_id} id="date_id" label="วันที่ทำเวร" options_arr_obj={daysOfWeekOptions} callback={handleDateSelect}/>
                        </div>
                        <div className="col-md-6 col-12">
                            <InputGroupWithLabel key={inputKeys.time_start} value={inputData.time_start} id="dateStart" label="จากวันที่" type="time" callback={onChangeStart} />
                        </div>
                        <div className="col-md-6 col-12">
                            <InputGroupWithLabel key={inputKeys.time_end} value={inputData.time_end} id="dateEnd" label="ถึงวันที่" type="time" callback={onChangeEnd} />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="btn btn-outline-primary w-1/3">บันทึก</button>
                    </div>
                </form>
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<MuiTable data={dataTable.data} columns={dataTable.columns} title="ตารางเวร"/>}/>
                <ModalCardConfirm hideCallback={reState} cancleCallback={reState} confrimCallback={async ()=>{
                    if(await updateMaidDuty(formDataUpdateMaidDuty)) await reState()
                }} modalShow={showModal} setModalShow={setShowModal} modalBody={modal.mBody} modalHead={modal.mHead} />
            </div>
        </>
    )

    

    const dataTableDutyAssign = {
        data:[
            {maid:"Unlimit unarn",day:"วันจันทร์",date_start:"08:00:00",date_end:"16:00:00",ED:<EditDelete/>,view:<ModalButton classBtn={"btn btn-success"} setModalShow={setShowModal} icon={faPlus}/>}
        ],
        columns:[
            {title:"แม่บ้าน",field:"maid"},
            {title:"วันที่ทำงาน",field:"day"},
            {title:"เวลาเริ่มงาน",field:"date_start"},
            {title:"เวลาเสร็จสิ้นงาน",field:"date_end"},
            {title:"",field:"ED"},
            {title:"",field:"view"}
        ]
    }

    const contentDutyAssign = (
        <>
            <div className="container-fluid">
                <h1 className="text-xl"><FontAwesomeIcon icon={faTable}/> จัดการงานแม่บ้าน</h1>                
                <CardFillColorHeader 
                    contentHeader={<h1 className="text-lg m-0">รายชื่อพนักงาน</h1>} 
                    contentBody={<MuiTable data={dataTableDutyAssign.data} columns={dataTableDutyAssign.columns} title=""/>}
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
        ],
        data:[
            {building:"A",room:"A202",description:"กวาด เช็ด ถู",ED:<EditDelete/>}
        ],
        columns:[
            {title:"ตึก",field:"building"},
            {title:"ห้อง",field:"room"},
            {title:"รายละเอียดงาน",field:"description"},
            {title:"",field:"ED"}
            
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
    // const Modal = {
    //     mHead: (
    //         <>
    //             <h1 className="m-0 text-2xl">มอบหมายงาน</h1>
    //         </>
    //     ),
    //     mBody: (
    //         <>
    //             <div className="row">
    //                 <div className="col-md-6 col-12">
    //                     <SelectOptionWithLabel id="location_id" options_arr_obj={location_options} label="ตึก"/>
    //                 </div>
    //                 <div className="col-md-6 col-12">
    //                     <SelectOptionWithLabel id="room_id" options_arr_obj={room_options} label="ห้อง"/>
    //                 </div>
    //             </div>
    //             <InputGroupWithLabel id="description" label="รายละเอียดงาน" type="text"/>
    //             <div className="row">
    //                 <div className="col-md-6 col-12">
    //                     <SelectOptionWithLabel id="location_id" options_arr_obj={material_options} label="วัสุดครุภัณฑ์"/>
    //                 </div>
    //                 <div className="col-md-6 col-12">
    //                     <InputGroupWithLabel id="count" label="จำนวน" type="text"/>
    //                 </div>
    //             </div>
    //             <div className="flex justify-end mb-3">
    //                 <button className="btn btn-success md:w-1/3 w-full">บันทึก</button>
    //             </div>
    //             <CardFillColorHeader contentHeader={<h5 className="m-0">งานทั้งหมด</h5>} contentBody={
    //                 <MuiTable data={dataTableModal.data} columns={dataTableModal.columns} title=""/>
    //             }/>
    //         </>
    //     )
    // }


    // duty check
    const dataTableDutyCheck = {
        data:[
            {maid:"Unlimit unarn",description:"ปัดกวาดเช็ดถู",day:"จันทร์",date_start:"08:00:00",date_end:"16:00:00",date_time:"15:45:00",building:"ตึก A",room:"A202",status:"processing" }
        ],
        columns:[
            {title:"แม่บ้าน",field:"maid"},
            {title:"รายละเอียดงาน",field:"description"},
            {title:"วัน",field:"day"},
            {title:"เวลาเริ่มงาน",field:"date_start"},
            {title:"เวลาที่เสร็จสิ้นงาน",field:"date_end"},
            {title:"เวลาที่กำหนด",field:"date_time"},
            {title:"ตึก",field:"building"},
            {title:"ห้อง",field:"room"},
            {title: "สถานะ",field: "status", 
                lookup:{
                    waiting: "รอดำเนินการ", 
                    processing:"กำลังดำเนินการ",
                    success:"ดำเนินการเสร็จสิ้น", 
                    deny:"ปฏิเสธ",
                    unable:"ไม่สามารถดำเนินการได้",
                }
            }
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
                        <MuiTable data={dataTableDutyCheck.data} columns={dataTableDutyCheck.columns} title=""/>
                    }
                />
            
            </div>
        </>
    )

    const [key, setKey] = useState('calendar');
    
    // {
    //         title:'unlimit',
    //         daysOfWeek: [ '3' ], // these recurrent events move separately
    //         startTime: '11:00:00',
    //         endTime: '11:30:00',
    //         color: 'red'
    //       }
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
                        <FullCalendar
                            plugins={[DayGridPlugin, timeGridPlugin,interactionPlugin]}
                            headerToolbar={{
                                center: 'dayGridMonth,timeGridWeek,timeGridDay',
                            }}
                            initialView="dayGridMonth"
                            events={event}
                            eventDisplay="auto"
                        />
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
            {/* <ModalCardConfirm hideCallback={()=>{}} cancleCallback={()=>{}} confrimCallback={()=>{}} modalShow={showModal} setModalShow={setShowModal} modalBody={modal.mBody} modalHead={modal.mHead} /> */}
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