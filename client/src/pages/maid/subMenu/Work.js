import React, { lazy, Suspense, useEffect, useState, useTransition } from 'react'
import { CardFillColorNonFooter } from '../../../components/Cards';
import { MuiTable } from '../../../components/Tables';
import { Skeleton, Spiner } from '../../../components/Loading'
import { lazily } from 'react-lazily';
import { EditDelete } from '../../../components/EditDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { InputGroupWithLabel } from '../../../components/FormElements';
import DayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { ModalCard, ModalCardConfirm } from "../../../components/Modals";
import { createFullCalendar, getFullCalendar } from '../../../functions/Calendar';
import FullCalendar from "@fullcalendar/react";

const { CardFillColorNonFooterShadow, EmptyCard } =lazily(()=>import('../../../components/Cards'))

export const Todo = () => {
    const dataTable = {
        data:[
          {id:"A",description:"B",location:"C",status:"success",ED:<EditDelete />}
        ],
        columns:[
          {title:"รหัส",field:"id"},
          {title:"รายละเอียดงาน",field:"description"},
          {title:"สถานที่",field:"location"},
          {title:"สถานะ",field:"status",
               lookup:{
                  success:"ดำเนินการเสร็จสิ้น", 
                  deny:"ปฏิเสธ",
                  
              }
          },
          {title:"",field:"ED"}
        ]
      }
      const datatTable1 ={
        data:[
          {id:"A",description:"B",location:"C",date_time:"12.00",status:"deny"}
        ],
        columns:[
          {title:"รหัส",field:"id"},
          {title:"รายละเอียดงาน",field:"description"},
          {title:"สถานที่",field:"location"},
          {title:"เวลาเข้า-ออก",field:"date_time"},
          {title:"สถานะ",field:"status",
              lookup:{
                success:"ดำเนินการเสร็จสิ้น", 
                deny:"ปฏิเสธ",
               
              }
          },
    
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

