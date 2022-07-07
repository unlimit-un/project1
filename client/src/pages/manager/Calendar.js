import React, { useEffect, useState } from 'react'
import FullCalendar from "@fullcalendar/react";
import DayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"

import { ModalCardConfirm } from "../../components/Modals";
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputGroupwitlabel } from '../../components/FormElements';
import { createFullCalendar, getFullCalendar } from '../../functions/Calendar';
const Calendar = () => {
    const [isModal, setIsModal] = useState(false);
    const [values, setValues] = useState({
        title: '',
        start: '',
        end: ''
    })
    const [event, setEvent] = useState([])
    
    useEffect(() => {
       loadData();
    }, [])

    const loadData = async () =>{
        
        const result = await getFullCalendar()
        const data = result.map((item, i)=>{
            return{
                title: item['calendar_title'],
                start: item['date_start'],
                end: item['date_end'],
                allDay: item['all_day'] === 1 ? true: false,
                color: item['calendar_id'] >5 ? "red": "blue"
            }
        })
        setEvent([...data])
    }

    const handdleSelect = (info) =>{
        showModal();
        setValues({...values,
            start: info.startStr,
            end: info.endStr
        })
    }

    const showModal = () =>{
        setIsModal(true)
    }
    const handleOk = () =>{
        createFullCalendar(values);
        loadData();
    }
    const handleCancle = () =>{
        setValues({
            title: '',
            start: '',
            end: ''
        })
    }
    
    const setTitle = ({target:{value: val}})=>{
        setValues({...values, title: val})
    }

    const Modal = {
        mHead: (
            <>
                <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCalendar}/> เลือกวันที่</h1>
            </>
        ),
        mBody: (
            <>
                
                <p className="m-0">จากวันที่: {values.start}</p>
                <p className="m-0">ถึงวันที่: {values.end}</p>
                <InputGroupwitlabel label="หัวข้อ" id="title" callback={setTitle}/>
                 
            </>
        )
    }
    return (
        <>
            <div className="container-fluid">
                <div className="">
                    <FullCalendar
                        plugins={[DayGridPlugin, timeGridPlugin,interactionPlugin]}
                        classNames={['bg-red-400', 'bg-blue-500']}
                        headerToolbar={{
                            center: 'dayGridMonth,timeGridWeek,timeGridDay new',
                        }}
                        initialView="dayGridMonth"
                        
                        weekends={true}
                        selectable={true}
                        selectLongPressDelay= "1"
                        select={handdleSelect}
                        events={event}
                        viewClassNames="max-h-screen"
                    />
                </div>
            </div>
            <ModalCardConfirm confrimCallback={handleOk} cancleCallback={handleCancle} modalShow={isModal} modalHead={Modal.mHead} modalBody={Modal.mBody} setModalShow={setIsModal}/>
        </>
    )
}

export default Calendar