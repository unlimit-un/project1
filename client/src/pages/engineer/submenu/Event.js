import FullCalendar from '@fullcalendar/react';
import DayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"
import { faCalendarAlt, faTable } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState, Suspense } from 'react'
import { ArrayColor } from '../../../utils/ArrayColor';
import { MuiTable } from '../../../components/Tables';
import { Skeleton } from '../../../components/Loading';

import { lazily } from 'react-lazily'
import { getSpacialEventByEngineerId } from '../../../controllers/engineer/EventControllers';

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../../components/Cards'))

export const EventCalendar = () => {

    const [event, setEvent] = useState([]);

    const loadCalendar = async () =>{
        const events = await getSpacialEventByEngineerId();
        setEvent([...events.map((item, i)=>{
            return{
                title: item['title'],
                start: item['event_date'],
                end: item['finished_date'],
                color: ArrayColor[i]
            }
        })])
    }
    
    useEffect(()=>{

        loadCalendar();

    },[])

    
    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faCalendarAlt}/> ปฏิทินกิจกรรม</h1>
            <div className="row ">
                <FullCalendar
                    plugins={[DayGridPlugin, timeGridPlugin,interactionPlugin]}
                    headerToolbar={{
                        center: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    initialView="dayGridMonth"
                    events={event}
                    eventDisplay="auto"
                />
            </div>
        </>
    )
}

export const EventTodo = () => {
    const [dataTable, setDataTable] = useState({
        data:[
            {id:"A315434",description:"ทำความสะอาด",location:"ตึกA A202",date_start:"3/7/2023",date_end:"5/7/2023",status:"success"}
        ],
        columns:[
            {title:"รหัส",field:"id"},
            {title:"รายละเอียดงาน",field:"description"},
            {title:"สถานที่",field:"location"},
            {title:"เริ่มวันที่",field:"date_start"},
            {title:"ถึงวันที่",field:"date_end"},
            {title:"สถานะ",field:"status",
                lookup:{
                    success:"ดำเนินการเสร็จสิ้น", 
                    deny:"ปฏิเสธ",
                    
                }
            },
        ]

    } );
    const [doneTable, setDoneTable] = useState({
        data:[
            {id:"A315434",description:"ทำความสะอาด",location:"ตึกA A202",date_start:"3/7/2023",date_end:"5/7/2023",status:"success"}
        ],
        columns:[
            {title:"รหัส",field:"id"},
            {title:"รายละเอียดงาน",field:"description"},
            {title:"สถานที่",field:"location"},
            {title:"เริ่มวันที่",field:"date_start"},
            {title:"ถึงวันที่",field:"date_end"},
            {title:"สถานะ",field:"status",
            lookup:{
                success:"ดำเนินการเสร็จสิ้น", 
                deny:"ปฏิเสธ",
                
            }
            },
        ]
    });

    const workList = (
        <div className="container-fluid">
            <MuiTable data={dataTable.data} columns={dataTable.columns} title="งานที่ต้องทำ"/>
        </div>
    )
    const doneList = (
        <div className="container-fluid">
            <MuiTable data={doneTable.data} columns={doneTable.columns} title="งานที่ทำเสร็จ"/>
        </div>
    )

    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faTable}/> งานกิจกรรม</h1>
            <div className="row ">
                <div className="col-12">
                <Suspense fallback={<Skeleton/>}>
                    <CardFillColorNonFooterShadow contentBody={workList}/>
                </Suspense>
                </div>
                <div className="col-12 mt-3">
                <Suspense fallback={<Skeleton/>}>
                    <CardFillColorNonFooterShadow contentBody={doneList}/>
                </Suspense>
                </div>
            </div>
        </>
    )
}

