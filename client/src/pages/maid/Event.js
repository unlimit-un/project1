import { faCheckCircle, faCircleXmark, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,Suspense, useEffect } from 'react'
import { MuiTable, TablesStriped } from '../../components/Tables'
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily'
import { Bandage } from '../../components/Bandage'
import { geteventData, geteventDataStatus } from '../../controllers/maid/EventControllers'

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Event = () => {

const [eventDataTabel, setEventDataTable] = useState ([])
const [eventDataByStatus, setEventDataByStatus] = useState ([])
const loadData = async () =>{
  const EventData = await geteventData ()
  setEventDataTable(EventData)
  console.log(EventData);
  
}
const loadDatadoneTable = async () =>{
  const eventDataStatus = await geteventDataStatus ()
  setEventDataByStatus (eventDataStatus)
  console.log(eventDataStatus);
}
useEffect(()=>{
  loadData ();
  loadDatadoneTable();
},[])

  const dataTable = {
    data:[
      ...eventDataTabel.map(item =>{
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
      ...eventDataByStatus.map(item => {
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
    <h1 className="text-2xl"><FontAwesomeIcon icon={faHome}/> งานกิจกรรม</h1>
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

export default Event