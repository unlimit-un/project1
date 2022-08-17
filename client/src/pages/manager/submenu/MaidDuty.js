import FullCalendar from '@fullcalendar/react';
import DayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"
import React,{useState, useEffect, useTransition, useRef, forwardRef} from 'react'
import { CardFillColorHeader, CardFillColorNonFooterShadow } from '../../../components/Cards';
import { EditDelete } from '../../../components/EditDelete';
import { InputGroupWithLabel, SelectOptionWithLabel, TextAreawithlabel } from '../../../components/FormElements';
import { ModalButton, ModalCardConfirm } from '../../../components/Modals';
import { MuiTable } from '../../../components/Tables';
import { getLocationByManagerId, getMaidByManagerId } from '../../../controllers/manager/ManageEmpController';
import { deleteMaidDuty, deleteMaidDutyAssign, deleteMaidDutyMaterial, getDaysOfWeek, getMaidDutyAssignById, getMaidDutyAssignByManagerId, getMaidDutyById, getMaidDutyByMaidId, getMaidDutyByManagerId, getMaidDutyMaterialById, getMaidDutyMaterialByManagerId, getMaterialById, getMaterialByManagerId, getRoomByLocationId, getRoomByManagerId, insertMaidDuty, insertMaidDutyAssign, insertMaidDutyMaterial, updateMaidDuty, updateMaidDutyAssgin, updateMaidDutyMaterial } from '../../../controllers/manager/MaidDutyController';
import { ArrayColor } from '../../../utils/ArrayColor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTable, faPlus, faScrewdriverWrench,  } from '@fortawesome/free-solid-svg-icons';
import { useForkRef } from '@material-ui/core';
import { Skeleton, Spiner } from '../../../components/Loading';

export const MaidDutyCalendar = () =>{
    
    const [event, setEvent] = useState([])
    const loadEvent = async() =>{
        const maidDuty = await getMaidDutyByManagerId();
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
    useEffect(()=>{
        loadEvent()
    },[])
    return(
        <FullCalendar
            plugins={[DayGridPlugin, timeGridPlugin,interactionPlugin]}
            headerToolbar={{
                center: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            events={event}
            eventDisplay="auto"
        />
    )
}

export const Schedual = () => {
    const [maidOptions, setMaidOptions] = useState([])
    const [daysOfWeekOptions, setDaysOfWeekOptions] = useState([])

    const [maidDutyDataTable, setMaidDutyDataTable] = useState([])
    const [inputData, setInputData] = useState({
        maid_id:'',
        date_week_id:'',
        time_start:'',
        time_end:''
    })
    //modal state
    const [maidIdMaidDutyModal, setMaidIdMaidDutyModal] = useState('')
    const [dayMaidDutyModal, setDayIdMaidDutyModal] = useState('')
    const [timeStartMaidDutyModal, setTimeStartMaidDutyModal] = useState('')
    const [timeEndMaidDutyModal, setTimeEndMaidDutyModal] = useState('')
    const [maidDutyIdMaidDutyModal, setMaidDutyIdDutyModal] = useState('')

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

    
    const loadMaidDutyDataTable = async () =>{
        const maidDuty = await getMaidDutyByManagerId();
        setMaidDutyDataTable(maidDuty)
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
    
    return (
        <>
            <div className="container-fluid">
                <h1 className="text-xl"><FontAwesomeIcon icon={faTable}/> จัดการตารางเวรแม่บ้าน</h1>
                <hr />
                <form 
                    onSubmit={async (e)=>{
                        e.preventDefault();
                        if(await insertMaidDuty(inputData)) await reState(); 
                    }} 
                >
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <SelectOptionWithLabel key="maid_duty_maid_id" value={inputData.maid_id} id="maid_id" label="แม่บ้าน" options_arr_obj={maidOptions} callback={handleMaidSelect}/>
                        </div>
                        <div className="col-md-6 col-12">
                            <SelectOptionWithLabel key="maid_duty_date_id" value={inputData.date_week_id} id="date_id" label="วันที่ทำเวร" options_arr_obj={daysOfWeekOptions} callback={handleDateSelect}/>
                        </div>
                        <div className="col-md-6 col-12">
                            <InputGroupWithLabel key="maid_duty_time_start" value={inputData.time_start} id="dateStart" label="จากวันที่" type="time" callback={onChangeStart} />
                        </div>
                        <div className="col-md-6 col-12">
                            <InputGroupWithLabel key="maid_duty_time_end" value={inputData.time_end} id="dateEnd" label="ถึงวันที่" type="time" callback={onChangeEnd} />
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
}

export const Duty = () =>{
    const [dutyOptions, setDutyOptions] = useState({
        maid_options: [{text:"",value:""}],
        maid_duty_options: [{text:"เลือกเวรแม่บ้าน",value:""}],
        location_options:[{text:"เลือกสถานที่",value:""}],
        room_options:[{text:"เลือกห้อง",value:""}]
    })

    const [modalShow, setModalShow] = useState(false)
    const [inputDutyAssing, setInputDutyAssign] = useState({
        maid_id:'',
        maid_duty_id: '',
        location_id:'',
        room_id: '',
    })
    const [inputDutyAssingModal, setInputDutyAssignModal] = useState({
        maid_id:'',
        maid_duty_id: '',
        location_id:'',
        room_id: '',
    })

    const [dutyOptionsModal, setDutyOptionsModal] = useState({
        maid_options:[],
        maid_duty_options:[],
        location_options:[],
        room_options:[]
    })

    const [maidDutyAssignById, setMaidDutyAssignById] = useState({})

    const refDescription = useRef(null);
    const refMaidDutyAssignCode = useRef(null);
    const refDescriptionModal = useRef(null);
    const refMaidDutyAssignCodeModal = useRef(null);
    const [dataMaidDutyAssignTable, setDataMaidDutyAssignTable] = useState([])

    const loadMaidDutyAssginTable = async() =>{
        const MaidDutyAssginTable = await getMaidDutyAssignByManagerId();
        setDataMaidDutyAssignTable(MaidDutyAssginTable)
    }

    const loadOptionsData = async() =>{
        
        const maidByManagerId = await getMaidByManagerId();
        setDutyOptions({
            ...dutyOptions,
            maid_options:[{value:'', text: 'เลือกแม่บ้าน'},...maidByManagerId.map(item=> {return {text:item['maid_name'], value:item['maid_id']}})]
            
        })

        if (inputDutyAssing.maid_id) {
            const MaidDutyByMaidId = await getMaidDutyByMaidId(inputDutyAssing.maid_id)
            const locationByManagerId = await getLocationByManagerId();
            setDutyOptions({
                ...dutyOptions,
                maid_duty_options:[{value:'', text: 'เลือกเวรแม่บ้าน'},...MaidDutyByMaidId.map(item=> {return {text:item['date_time_duty'], value:item['maid_duty_id']}})],
                location_options:[{value:'', text: 'เลือกสถานที่'},...locationByManagerId.map(item=> {return {text:item['location_name'], value:item['location_id']}})]
            })
        }

        if (inputDutyAssing.location_id) {
            const roomByLocationId = await getRoomByLocationId(inputDutyAssing.location_id);
            setDutyOptions({
                ...dutyOptions,
                room_options:[{value:'', text: 'เลือกห้อง'},...roomByLocationId.map(item=> {return {text:item['room_name'], value:item['room_id']}})]
            })
        }

        if (modalShow) {
            console.log(modalShow);
            if (inputDutyAssingModal.maid_id) {
                const MaidDutyByMaidId = await getMaidDutyByMaidId(inputDutyAssingModal.maid_id)
                const locationByManagerId = await getLocationByManagerId();
                setDutyOptionsModal({
                    ...dutyOptionsModal,
                    maid_duty_options:[{value:'', text: 'เลือกเวรแม่บ้าน'},...MaidDutyByMaidId.map(item=> {return {text:item['date_time_duty'], value:item['maid_duty_id']}})],
                    location_options:[{value:'', text: 'เลือกสถานที่'},...locationByManagerId.map(item=> {return {text:item['location_name'], value:item['location_id']}})]
                })
            }
    
            if (inputDutyAssingModal.location_id) {
                const roomByLocationId = await getRoomByLocationId(inputDutyAssingModal.location_id);
                
                setDutyOptionsModal({
                    ...dutyOptionsModal,
                    room_options:[{value:'', text: 'เลือกห้อง'},...roomByLocationId.map(item=> {return {text:item['room_name'], value:item['room_id']}})]
                })
            }
        }
        
    }


    const reStateDutyAssign = () =>{

        setInputDutyAssign({
            maid_duty_id: '',
            maid_id: '',
            location_id:'',
            room_id: '',
        })
        loadMaidDutyAssginTable();
        refDescription.current.value = ''
        refMaidDutyAssignCode.current.value = ''
    }

    useEffect(()=>{
        loadMaidDutyAssginTable()
    },[])

    useEffect(()=>{
        loadOptionsData()
    },[inputDutyAssing, inputDutyAssingModal])

    
    
    const loadDataEdit = async(maid_duty_assign_id)=>{
        
            await setDutyOptionsModal({
                maid_options:[],
                maid_duty_options:[],
                location_options:[],
                room_options:[]
            })

            const [maidDutyAssignData] = await getMaidDutyAssignById(maid_duty_assign_id)
            setMaidDutyAssignById({...maidDutyAssignData})
            const maidByManagerId = await getMaidByManagerId()
            const MaidDutyByMaidId = await getMaidDutyByMaidId(maidDutyAssignData['maid_id'])
            const locationByManagerId = await getLocationByManagerId();
            const roomByLocationId = await getRoomByLocationId(maidDutyAssignData['location_id']);


            await setDutyOptionsModal({
                maid_duty_options:[{value:'', text: 'เลือกเวรแม่บ้าน'},...MaidDutyByMaidId.map(item=> {return {text:item['date_time_duty'], value:item['maid_duty_id']}})],
                location_options:[{value:'', text: 'เลือกสถานที่'},...locationByManagerId.map(item=> {return {text:item['location_name'], value:item['location_id']}})],
                room_options:[{value:'', text: 'เลือกห้อง'},...roomByLocationId.map(item=> {return {text:item['room_name'], value:item['room_id']}})],
                maid_options: [{value:'', text: 'เลือกแม่บ้าน'},...maidByManagerId.map(item=> {return {text:item['maid_name'], value:item['maid_id']}})]
            })

            await setInputDutyAssignModal({
                location_id: maidDutyAssignData['location_id'],
                maid_duty_id: maidDutyAssignData['maid_duty_id'],
                maid_id: maidDutyAssignData['maid_id'],
                room_id: maidDutyAssignData['room_id'],
                maid_duty_assign_id: maidDutyAssignData['maid_duty_assign_id'],
            })
        
    }

    const modal = {
        mHead:<h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPencil}/>แก้ไขข้อมูลเวรแม่บ้าน</h1>,
        mBody:(

            (dutyOptionsModal.maid_options.length === 0 || dutyOptionsModal.maid_duty_options.length === 0 || dutyOptionsModal.location_options.length === 0 || dutyOptionsModal.room_options.length === 0) ?<Skeleton/>:
        
            <div className="row">
                <div className="col-md-6 col-12">
                    <SelectOptionWithLabel key={maidDutyAssignById['maid_id']} value={inputDutyAssingModal['maid_id']} id="maid_id_modal" label="แม่บ้าน" options_arr_obj={dutyOptionsModal.maid_options}callback={({target:{value}})=>{setInputDutyAssignModal({...inputDutyAssingModal, maid_id: value, maid_duty_id:'', location_id:'', room_id: ''})}} />
                </div>
                <div className="col-md-6 col-12">
                    <SelectOptionWithLabel disabled={inputDutyAssingModal.maid_id?"":"disabled"} key={maidDutyAssignById['maid_duty_id']} value={inputDutyAssingModal['maid_duty_id']} id="maid_duty_id_modal" label="เวรแม่บ้าน" options_arr_obj={dutyOptionsModal.maid_duty_options} callback={({target:{value}})=>{setInputDutyAssignModal({...inputDutyAssingModal, maid_duty_id: value, room_id: ''})}} />
                </div>
                <div className="col-md-6 col-12">
                    <SelectOptionWithLabel disabled={inputDutyAssingModal.maid_id?"":"disabled"} key={maidDutyAssignById['location_id']} value={inputDutyAssingModal['location_id']} id="location_id_modal" label="สถานที่" options_arr_obj={dutyOptionsModal.location_options} callback={({target:{value}})=>{setInputDutyAssignModal({...inputDutyAssingModal, location_id: value, room_id:'', })}}/>
                </div>
                <div className="col-md-6 col-12">
                    <SelectOptionWithLabel disabled={inputDutyAssingModal.location_id?"":"disabled"} key={maidDutyAssignById['room_id']} value={inputDutyAssingModal['room_id']} id="room_id_modal" label="ห้อง" options_arr_obj={dutyOptionsModal.room_options} callback={({target:{value}})=>{setInputDutyAssignModal({...inputDutyAssingModal, room_id: value})}}/>
                </div>
                <div className="col-md-4 col-12">
                    <InputGroupWithLabel ref={refMaidDutyAssignCodeModal} id="duty_assign_code_modal" label="รหัสงานแม่บ้าน" defaultValue={maidDutyAssignById['maid_duty_assign_code']}/>
                </div>
                <div className="col-12">
                    <TextAreawithlabel ref={refDescriptionModal} label="รายละเอียด" defaultValue={maidDutyAssignById['work_description']}/>
                </div>
            </div> 
            
            
        )
    }    

    const dataTableDutyAssign = {
        data:[
            ...dataMaidDutyAssignTable.map(item=>{
                return {
                    maid_duty_assign_code: item['maid_duty_assign_code'],
                    maid_code: item['maid_code'],
                    maid_name: item['maid_name'],
                    date: item['date_week_full_name_th'],
                    time_duty: item['time_duty'],
                    location_name: item['location_name'],
                    room_name: item['room_name'],
                    work_description: item['work_description'],
                    time_reg: `${item['time_reg'].split(/[\sT\s.]/)[0]} ${item['time_reg'].split(/[\sT\s.]/)[1]}`,
                    ED: <EditDelete
                            EditFnc={()=>{loadDataEdit(item['maid_duty_assign_id'])}}
                            DeleteFnc={async()=>{
                                if(await deleteMaidDutyAssign({maid_duty_assign_id: item['maid_duty_assign_id']})) await reStateDutyAssign()
                            }}
                            setModalShow={setModalShow}
                        />
                }
            })
        ],
        columns:[
            {title:"",field:"ED"},
            {title:"รหัสงานแม่บ้าน",field:"maid_duty_assign_code"},
            {title:"รหัสแม่บ้าน",field:"maid_code"},
            {title:"ชื่อแม่บ้าน",field:"maid_name"},
            {title:"วันที่ทำงาน",field:"date"},
            {title:"เวลาเวร",field:"time_duty"},
            {title:"สถานที่",field:"location_name"},
            {title:"ห้อง",field:"room_name"},
            {title:"รายละเอียดงาน",field:"work_description"},
            {title:"วันที่เพิ่มข้อมูล",field:"time_reg"}
        ]
    }

    
    return (
        <>
            <div className="container-fluid">
                <h1 className="text-xl"><FontAwesomeIcon icon={faTable}/> จัดการงานแม่บ้าน</h1>
                <hr />
                <form 
                    onSubmit={async (e)=>{
                        e.preventDefault();
                        if(await insertMaidDutyAssign({...inputDutyAssing, work_description: refDescription.current.value, maid_duty_assign_code: refMaidDutyAssignCode.current.value})) await reStateDutyAssign();
                    }} 
                >
                    <div className="row">
                        <div className="col-md-4 col-12">
                            <SelectOptionWithLabel  key="duty_assign_maid_id" value={inputDutyAssing.maid_id} id="maid_id" label="แม่บ้าน" options_arr_obj={dutyOptions.maid_options} callback={({target:{value}})=>{setInputDutyAssign({...inputDutyAssing, maid_id: value, maid_duty_id:'', location_id:'', room_id: ''})}}/>
                        </div>
                        <div className="col-md-4 col-12">
                            <SelectOptionWithLabel disabled={inputDutyAssing.maid_id?"":"disabled"} key="duty_assign_maid_duty_id" value={inputDutyAssing.maid_duty_id} id="maid_duty_id" label="เวรแม่บ้าน" options_arr_obj={dutyOptions.maid_duty_options} callback={({target:{value}})=>{setInputDutyAssign({...inputDutyAssing, maid_duty_id: value, room_id: ''})}}/>
                        </div>
                        <div className="col-md-4 col-12">
                            <SelectOptionWithLabel disabled={inputDutyAssing.maid_id?"":"disabled"} key="duty_assign_location_id" value={inputDutyAssing.location_id} id="location_id" label="สถานที่" options_arr_obj={dutyOptions.location_options} callback={({target:{value}})=>{setInputDutyAssign({...inputDutyAssing, location_id: value, room_id:'', })}}/>
                        </div>
                        <div className="col-md-4 col-12">
                            <SelectOptionWithLabel disabled={inputDutyAssing.location_id?"":"disabled"} key="duty_assign_room_id" value={inputDutyAssing.room_id} id="room_id" label="ห้อง" options_arr_obj={dutyOptions.room_options} callback={({target:{value}})=>{setInputDutyAssign({...inputDutyAssing, room_id: value})}}/>
                        </div>
                        <div className="col-md-4 col-12">
                            <InputGroupWithLabel key="duty_assign_code" ref={refMaidDutyAssignCode} id="duty_assign_code" label="รหัสงานแม่บ้าน"/>
                        </div>
                        <div className="col-md-4 col-12">
                            <TextAreawithlabel key="duty_assign_work_desciption" ref={refDescription} id="work_desciption" label="รายละเอียดงาน"/>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="btn btn-outline-primary w-1/3">บันทึก</button>
                    </div>
                </form>        
                <CardFillColorHeader
                    classCard="mt-3"
                    contentHeader={<h1 className="text-lg m-0">รายชื่อพนักงาน</h1>} 
                    contentBody={<MuiTable data={dataTableDutyAssign.data} columns={dataTableDutyAssign.columns} title=""/>}
                />
            
            </div>
            <ModalCardConfirm 
                confrimCallback={async ()=>{
                    const formData = {
                        ...inputDutyAssingModal,
                        work_description: refDescriptionModal.current.value,
                        maid_duty_assign_code: refMaidDutyAssignCodeModal.current.value
                    }
                    if(await updateMaidDutyAssgin(formData)) await reStateDutyAssign();
                }}
                cancleCallback={reStateDutyAssign} hideCallback={reStateDutyAssign} modalBody={modal.mBody} modalHead={modal.mHead} modalShow={modalShow} setModalShow={setModalShow} />
        </>
    )
}

export const MaidDutyMaterial = () =>{

    const [modalShow, setModalShow] = useState(false)
    const [dataDutyMaterial, setDataDutyMaterial] = useState([])
    const [options, setOptions] = useState({
        maid_duty_assign_options: [],
        material_options:[]
    })
    const [inputForm, setInputForm] = useState({
        maid_duty_assign_id: '',
        material_id:''
    })
    const [inputFormModal, setInputFormModal] = useState({
        maid_duty_assign_id: '',
        material_id:'',
        maid_duty_material_id: '',
        material_count: ''
    })
    const [total, setTotal] = useState('')
    const [totalModal, setTotalModal] = useState('')
    const refInputCount = useRef(null);
    const refInputCountModal = useRef(null);

    const loadOptions = async () =>{
        const maidDutyAssignByManagerId = await getMaidDutyAssignByManagerId();
        const materialByManagerId = await getMaterialByManagerId();

        setOptions({
            maid_duty_assign_options: [{value:'', text: 'เลือกงานแม่บ้าน'},...maidDutyAssignByManagerId.map(item=> {return {text:item['maid_duty_assign_code'], value:item['maid_duty_assign_id']}})],
            material_options :[
                {value:'', text: 'เลือกวัสดุครุภัณฑ์'},
            ...materialByManagerId.map(item=> {return {text:`${item['material_code']}-${item['material_name']}`, value:item['material_id']}})],
        })
    }

    const loadDataTableDutyMaterial = async () => {
        const maidDutyMaterialByManagerId = await getMaidDutyMaterialByManagerId();
        setDataDutyMaterial(maidDutyMaterialByManagerId)
    }
    
    const showEditModal = async (mdm_id) =>{
        const [maidDutyMaterialById] = await getMaidDutyMaterialById(mdm_id)

        const [{material_quantity, material_using}] = await getMaterialById(maidDutyMaterialById['material_id'])
        setTotalModal(material_quantity - material_using + maidDutyMaterialById['material_count']< 0 ? 'วัสดุไม่เพียงพอ':material_quantity - material_using + maidDutyMaterialById['material_count'])
        
        await setInputFormModal({
            maid_duty_assign_id: maidDutyMaterialById['maid_duty_assign_id'],
            maid_duty_material_id: maidDutyMaterialById['maid_duty_material_id'],
            material_id: maidDutyMaterialById['material_id'],
            material_count:  maidDutyMaterialById['material_count']
        })
    }
    
    const resetState = ()=>{
        setInputForm({
            maid_duty_assign_id: '',
            material_id:''
        })
        refInputCount.current.value = ''
        loadDataTableDutyMaterial();
    }

    useEffect(()=>{
        loadDataTableDutyMaterial();
        loadOptions();
    },[])
    
    const dataTableDutyMaterial = {
        data:[
            ...dataDutyMaterial.map(item=>{
                return {
                    material_code: item['material_code'],
                    material_name: item['material_name'],
                    material_count: item['material_count'],
                    maid_duty_assign_code: item['maid_duty_assign_code'],
                    time_reg: `${item['time_reg'].split(/[\sT\s.]/)[0]} ${item['time_reg'].split(/[\sT\s.]/)[1]}`,
                    ED: <EditDelete
                            EditFnc={async()=>{
                                showEditModal(item['maid_duty_material_id'])
                            }}
                            DeleteFnc={async()=>{
                                if(await deleteMaidDutyMaterial({maid_duty_material_id: item['maid_duty_material_id']})) await resetState();
                            }}
                            setModalShow={setModalShow}
                        />
                }
            })
        ],
        columns:[
            {title:"",field:"ED"},
            {title:"รหัสครุภัณฑ์",field:"material_code"},
            {title:"รหัสแม่บ้าน",field:"material_name"},
            {title:"จำนวน",field:"material_count", type: "numeric"},
            {title:"รหัสเวรแม่บ้าน",field:"maid_duty_assign_code"},
            {title:"วันที่เพิ่มข้อมูล",field:"time_reg"}
        ]
    }
    const loadTotalMaterial = async (material_id) =>{
        if (modalShow) {
            if (inputFormModal.material_id) {
                const [{material_quantity, material_using}] = await getMaterialById(inputFormModal.material_id)
                console.log(material_quantity, material_using);
                setTotalModal(material_quantity- +refInputCountModal.current.value - material_using< 0 ? 'วัสดุไม่เพียงพอ':material_quantity- +refInputCountModal.current.value - material_using)
            }
    
            if (material_id) {
                const [{material_quantity, material_using}] = await getMaterialById(material_id)
                setTotalModal(material_quantity- +refInputCountModal.current.value - material_using< 0 ? 'วัสดุไม่เพียงพอ':material_quantity- +refInputCountModal.current.value - material_using)
            }
    
            if (material_id === '') {
                setTotalModal('')
            }
        }else{
            if (inputForm.material_id) {
                const [{material_quantity, material_using}] = await getMaterialById(inputForm.material_id)
                setTotal(material_quantity- +refInputCount.current.value - material_using < 0 ? 'วัสดุไม่เพียงพอ':material_quantity- +refInputCount.current.value - material_using)
            }
    
            if (material_id) {
                const [{material_quantity, material_using}] = await getMaterialById(material_id)
                setTotal(material_quantity- +refInputCount.current.value - material_using < 0 ? 'วัสดุไม่เพียงพอ':material_quantity- +refInputCount.current.value - material_using)
            }
    
            if (material_id === '') {
                setTotal('')
            }
        }
    }

    const modal = {
        mHead:<h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPencil}/>แก้ไขข้อมูลวัสดุงานแม่บ้าน</h1>,
        mBody:(

            (options.maid_duty_assign_options.length === 0 || options.material_options.length === 0) ?<Skeleton/>:
        
            <div className="row">
                <div className="col-md-4 col-12">
                    <SelectOptionWithLabel label="รหัสงานแม่บ้าน" value={inputFormModal.maid_duty_assign_id} options_arr_obj={options.maid_duty_assign_options} callback={({target:{value}})=>{setInputFormModal({...inputFormModal, maid_duty_assign_id: value})}}/>
                </div>
                <div className="col-md-4 col-12">
                    <SelectOptionWithLabel label="วัสดุครุภัณฑ์" value={inputFormModal.material_id} options_arr_obj={options.material_options} callback={({target:{value}})=>{ setInputFormModal({...inputFormModal, material_id: value}); loadTotalMaterial(value);}}/>
                </div>
                <div className="col-md-4 col-12">
                    <div className="mb-3">
                        <label className="form-label">จำนวน <small>(คงเหลือ: {totalModal})</small></label>
                        <input className="form-control" required ref={refInputCountModal} key={inputFormModal.material_count}  defaultValue={inputFormModal.material_count}
                            onChange={()=>{
                                    loadTotalMaterial()
                            }}
                        />
                    </div>
                </div>
            </div> 
        )
    }    
    return (
        <>
            <div className="container-fluid">
                <h1 className="text-xl"><FontAwesomeIcon icon={faScrewdriverWrench}/> จัดการวัสดุงานแม่บ้าน</h1>
                <hr />
                <form 
                    onSubmit={async(e)=>{
                        e.preventDefault()
                        if(await insertMaidDutyMaterial({...inputForm, material_count: refInputCount.current.value})) await resetState()
                    }}
                >
                    <div className="row">
                        <div className="col-md-4 col-12">
                            <SelectOptionWithLabel label="รหัสงานแม่บ้าน" key={inputForm.maid_duty_assign_id} value={inputForm.maid_duty_assign_id} options_arr_obj={options.maid_duty_assign_options} callback={({target:{value}})=>{setInputForm({...inputForm, maid_duty_assign_id: value})}}/>
                        </div>
                        <div className="col-md-4 col-12">
                            <SelectOptionWithLabel label="วัสดุครุภัณฑ์" key={inputForm.material_id} value={inputForm.material_id} options_arr_obj={options.material_options} callback={({target:{value}})=>{ setInputForm({...inputForm, material_id: value}); loadTotalMaterial(value);}}/>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="mb-3">
                                <label className="form-label">จำนวน <small>(คงเหลือ: {total})</small></label>
                                <input className="form-control" required ref={refInputCount} 
                                    onChange={()=>{
                                            loadTotalMaterial()
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-end">
                        <button className="btn btn-outline-primary w-1/3">บันทึก</button>
                    </div>
                </form>        
                <CardFillColorHeader
                    classCard="mt-3"
                    contentHeader={<h1 className="text-lg m-0">รายการวัสดุในงานแม่บ้าน</h1>} 
                    contentBody={<MuiTable data={dataTableDutyMaterial.data} columns={dataTableDutyMaterial.columns} title=""/>}
                />
            
            </div>
            <ModalCardConfirm confrimCallback={async()=>{
                const formData = {
                    ...inputFormModal,
                    material_count: refInputCountModal.current.value
                }
                if(await updateMaidDutyMaterial(formData)) await resetState();
            }} cancleCallback={resetState} hideCallback={resetState} modalBody={modal.mBody} modalHead={modal.mHead} modalShow={modalShow} setModalShow={setModalShow} />
        </>
    )
}
