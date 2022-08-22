import React, { lazy, Suspense, useEffect, useState, useTransition } from 'react'
import { CardFillColorNonFooter } from '../../../components/Cards';
import { MuiTable } from '../../../components/Tables';
import { Skeleton, Spiner } from '../../../components/Loading'
import { lazily } from 'react-lazily';
import { EditDelete } from '../../../components/EditDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { InputGroupWithLabel } from '../../../components/FormElements';
import DayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { ModalCard, ModalCardConfirm } from "../../../components/Modals";
import { createFullCalendar, getFullCalendar } from '../../../functions/Calendar';
import FullCalendar from "@fullcalendar/react";
import { getWorkByMaidId, getworktData, getworktDataComplete, insertMaidDutyCheck } from '../../../controllers/maid/WorkControllers';
import { Button } from '@material-ui/core';
import { convertTZ } from '../../../functions/ConvertDate';
import { ArrayColor } from '../../../utils/ArrayColor';

const { CardFillColorNonFooterShadow, EmptyCard } =lazily(()=>import('../../../components/Cards'))

export const Todo = () => {

  const [dataTableData ,setDataTableData] = useState([])
  const [dataComplete, setDataComplete] = useState ([])

  const loadworkdata = async() =>{
    const WorkDatabel = await getworktData();
    const workComplete = await getworktDataComplete ();
    const works = await getWorkByMaidId ();
    

    setDataComplete (workComplete)
    setDataTableData (WorkDatabel)
    // console.log(WorkDatabel);
  }

  useEffect (()=>{
    loadworkdata();    
  },[])
  console.log(dataTableData);
    const dataTable = {
        data:[
          ...dataTableData.map(item=>{;
            if (item['maid_duty_assign_code']) {
              return {
                id:item['maid_duty_assign_code'],
                description:item['work_description'],
                location:item['location_name'],
                room:item['room_name'],
                day:item['date_week_full_name_th'],
                time_start:item['time_start'],
                time_end:item['time_end'],
                view:<button className="btn btn-success" 
                  onClick={async ()=>{if(await insertMaidDutyCheck({maid_duty_assign_id: item['maid_duty_assign_id']})) await loadworkdata()}}>  
                  <FontAwesomeIcon icon={faPlus}/></button>
              }
            }
          })
        ],
        columns:[
          {title:"รหัส",field:"id"},
          {title:"รายละเอียดงาน",field:"description"},
          {title:"สถานที่",field:"location"},
          {title:"ห้อง",field:"room"},
          {title:"วัน",field:"day"},
          {title:"เวลาเริ่ม",field:"time_start"},
          {title:"ถึงเวลา",field:"time_end"},
          {title:"",field:"view"}
        ]
      }
      
      const datatTable1 = {
        data:[
          ...dataComplete.map(item =>{
            return{
              id:item['maid_duty_assign_code'],
              description:item['work_description'],
              location:item['location_name'],
              room:item['room_name'],
              day:item['date_week_full_name_th'],
              time_start:item['time_start'],
              time_end:item['time_end'],
              finished_date: convertTZ.getFullDate(item['finished_date']),
              status:item['status'],
              note: item['note'],
              deny_description: item['deny_description']
            }
          })
        ],
        columns:[
          {title:"รหัส",field:"id"},
          {title:"รายละเอียดงาน",field:"description"},
          {title:"สถานที่",field:"location"},
          {title:"ห้อง",field:"room"},
          {title:"วัน",field:"day"},
          {title:"เวลาเริ่ม",field:"time_start"},
          {title:"ถึงเวลา",field:"time_end"},
          {title:"เวลาที่ทำงานเสร็จ",field:"finished_date"},
          {title:"หมายเหตุ",field:"note"},
          {title:"สถานะ",field:"status",
            lookup:{
              waiting:"รอดำเนินการ",
              success:"ผ่าน",
              fail:"ไม่ผ่าน",
            }
          },
          {title:"สาเหตุ",field:"deny_description"},
          
        ]
      }
     
      const contentTodo = (
        <>
            <div className="container-fluid">
                <h1 className="text-xl"> รายการงาน</h1>
                <hr />
                  <Suspense fallback={<Skeleton/>}>
                    <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<MuiTable data={dataTable.data} columns={dataTable.columns} title=""/>}/>
                  </Suspense>
            </div>
        </>
      )
      const contentDone = (
        <>
            <div className="container-fluid">
              <h1 className="text-xl"> งานที่ทำเสร็จแล้ว</h1>
                <hr />
                <Suspense fallback={<Skeleton/>}>
                  <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<MuiTable data={datatTable1.data} columns={datatTable1.columns} title=""/>}/>
                </Suspense>
            </div>
        </>
      )
      return (
        <>
          <div className="mt-4">
            <CardFillColorNonFooter contentBody={contentTodo}/>
          </div>
          <div className="mt-4">
            <CardFillColorNonFooter contentBody={contentDone}/>
          </div>
      </>
      )
}

export const Schedule = () => {
  const [workCalendar, setWorkClendar] = useState ([])
  let checkName = ''
    let colorIndex = 0;
  const loadworkCalendar = async ()=>{
    const works = await getWorkByMaidId ();
    setWorkClendar ([...works.map((item, i)=>{
      if (checkName !== item['date_week_id']) {
        checkName = item['date_week_id']
        colorIndex = colorIndex+1
    }
    return{
        title: item['work_description'],
        startTime: item['time_start'],
        endTime: item['time_end'],
        daysOfWeek: [item['date_week_id']],
        color: ArrayColor[colorIndex]
    }
    })]) 
  }
 useEffect(()=>{
   loadworkCalendar ()
 },[])
 return (
    <>
          <h1 className="text-2xl"><FontAwesomeIcon icon={faCalendarAlt}/> ปฎิทินกิจกรรม</h1>
          <div className="row "></div>
          <FullCalendar
          plugins={[DayGridPlugin, timeGridPlugin,interactionPlugin]}
          headerToolbar={{
              center: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          events={workCalendar}
          eventDisplay="auto"
        />  
  </>
)
}

