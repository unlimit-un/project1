import { faCheckCircle, faCircleXmark, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,Suspense } from 'react'
import { MuiTable, TablesStriped } from '../../components/Tables'
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily'
import { Bandage } from '../../components/Bandage'

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Event = () => {

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
  } );

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
    <h1 className="text-2xl"><FontAwesomeIcon icon={faHome}/> งานกิจกรรมที่ทำเสร็จแล้ว</h1>
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