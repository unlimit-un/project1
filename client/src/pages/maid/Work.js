import React, { useState,Suspense } from 'react'
import { CardFillColorNonFooter } from '../../components/Cards';
import { MuiTable, TablesStriped } from '../../components/Tables';
import { faCheckCircle, faCircleXmark,faPencil,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily';
import { EditDelete } from '../../components/EditDelete';
import { Bandage } from '../../components/Bandage';

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Work = () => {
  const [name,setName] = useState ('');
  const dataTable = {
    data:[
      {id:"A",description:"B",location:"C",status:"success",ED:<EditDelete/>}
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
 
  const contentBody = (
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
  const contentBody1 = (
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
        <CardFillColorNonFooter contentBody={contentBody}/>
      </div>
      <div className="mt-4">
        <CardFillColorNonFooter contentBody={contentBody1}/>
      </div>
  </>
  )
}

export default Work