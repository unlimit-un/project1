import React, { lazy, Suspense, useEffect, useState, useTransition } from 'react'
import { CardFillColorNonFooter } from '../../../components/Cards';
import { MuiTable } from '../../../components/Tables';
import { Skeleton, Spiner } from '../../../components/Loading'
import { lazily } from 'react-lazily';
import { EditDelete } from '../../../components/EditDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { InputGroupWithLabel } from '../../../components/FormElements';
import DayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { ModalCard, ModalCardConfirm } from "../../../components/Modals";
import { createFullCalendar, getFullCalendar } from '../../../functions/Calendar';
import FullCalendar from "@fullcalendar/react";
import { getworktData, getworktDataComplete, insertMaidDutyCheck } from '../../../controllers/maid/WorkControllers';
import { Button } from '@material-ui/core';
import { convertTZ } from '../../../functions/ConvertDate';

const { CardFillColorNonFooterShadow, EmptyCard } =lazily(()=>import('../../../components/Cards'))

export const Todo = () => {

  const [dataTableData ,setDataTableData] = useState([])
  const [dataComplete, setDataComplete] = useState ([])

  const loadworkdata = async() =>{
    const WorkDatabel = await getworktData();
    const workComplete = await getworktDataComplete ();

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
            const finished_date = convertTZ(item['finished_date'])
            return{
              id:item['maid_duty_assign_code'],
              description:item['work_description'],
              location:item['location_name'],
              room:item['room_name'],
              day:item['date_week_full_name_th'],
              time_start:item['time_start'],
              time_end:item['time_end'],
              finished_date: `${finished_date.getFullYear()}-${finished_date.getMonth()+1}-${finished_date.getDate()} ${finished_date.getHours()}:${finished_date.getMinutes()}: ${finished_date.getSeconds()}`,
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
    const [isModal, setIsModal] = useState(false);
    const [values, setValues] = useState({
        title: '',
        start: '',
        end: ''
    })
    const [event, setEvent] = useState([])
    const [isPending, startTransition] = useTransition();
    useEffect(() => {
       loadData();
    }, [])

    const loadData = async () =>{
        
        const result = await getFullCalendar()
        startTransition(()=>{
          const data = result.map((item, i)=>{
              return{
                  title: item['calendar_title'],
                  start: item['date_start'],
                  end: item['date_end'],
                  allDay: item['all_day'] === 1 ? true: false,
                  color: item['calendar_id'] >5 ? "red": null
              }
          })
          setEvent([...data, ])
        })
        // {
        //     title:'unlimit',
        //     daysOfWeek: [ '3' ], // these recurrent events move separately
        //     startTime: '11:00:00',
        //     endTime: '11:30:00',
        //     color: 'red'
        //   }
    }

    const handdleSelect = (info) =>{
        console.log(info);
        setIsModal(true)
        setValues({...values,
            start: info.startStr,
            end: info.endStr
        })
    }

    const handleClick = (info) => {
      console.log(info);
    }

    const Modal = {
        mHead: (
            <>
                <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCalendar}/> รายละเอียดงาน</h1>
            </>
        ),
        mBody: (
            <>
            </>
        )
    }
    return (
        <>
          <Suspense fallback={<Skeleton/>}>
            {isPending?<Spiner/>:null}
              <EmptyCard contentBody={
                <FullCalendar
                    plugins={[DayGridPlugin, timeGridPlugin,interactionPlugin]}
                    headerToolbar={{
                        center: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    initialView="dayGridMonth"
                    weekends={true}
                    selectable={true}
                    selectLongPressDelay= "1"
                    select={handdleSelect}
                    events={event}
                    eventDisplay="auto"
                    eventClick={handleClick}
                />
              }
            />
          </Suspense>
          <ModalCard modalShow={isModal} modalHead={Modal.mHead} modalBody={Modal.mBody} setModalShow={setIsModal}/>
        </>
    )
}

