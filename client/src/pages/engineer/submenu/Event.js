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
import { geteventData, geteventDataStatus, getSpacialEventByEngineerId } from '../../../controllers/engineer/EventControllers';

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
    const [eventData,setEventData] = useState ([])
    const [doneEventDataTable,setDoneEventDataTable] = useState ([])
    const loadEvent = async ()=>{
        const EventData = await geteventData ()
        setEventData (EventData)
    }
    const loaddoneTable = async () =>{
        const doneTabel = await geteventDataStatus ()
        setDoneEventDataTable(doneTabel)
        console.log(doneTabel);
        
    }
    useEffect(()=>{
        loadEvent ();
        loaddoneTable();
    },[])
    const dataTable = {
        data:[
            ...eventData.map(item =>{
              return{
                team:item['team_name'],
                title:item['title'],
                description:item['description'],
                location:item['location_name'],
                room:item['room_name'],
                date_start:item['event_date'],
                date_end:item['finished_date'],
                material:item['material_name'],
                count:item['material_count'],
              }
            })
          ],
          columns:[
            {title:"ทีม",field:"team"},
            {title:"หัวเรื่อง",field:"title"},
            {title:"รายละเอียดงาน",field:"description"},
            {title:"สถานที่",field:"location"},
            {title:"ห้อง",field:"room"},
            {title:"เริ่มวันที่",field:"date_start"},
            {title:"ถึงวันที่",field:"date_end"},
            {title:"ครุภัณฑ์",field:"material"},
            {title:"จำนวนครุภัณฑ์",field:"count"},
          ]
    } 
    const doneTable = {
        data:[
            ...doneEventDataTable.map(item => {
              return{
                team:item['team_name'],
                title:item['title'],
                description:item['description'],
                location:item['location_name'],
                room:item['room_name'],
                date_start:item['event_date'],
                date_end:item['finished_date'],
                material:item['material_name'],
                count:item['material_count'],
              }
            })
          ],
          columns:[
            {title:"ทีม",field:"team"},
            {title:"หัวเรื่อง",field:"title"},
            {title:"รายละเอียดงาน",field:"description"},
            {title:"สถานที่",field:"location"},
            {title:"ห้อง",field:"room"},
            {title:"เริ่มวันที่",field:"date_start"},
            {title:"ถึงวันที่",field:"date_end"},
            {title:"ครุภัณฑ์",field:"material"},
            {title:"จำนวนครุภัณฑ์",field:"count"},
          ]
    }

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

