import { faCheckCircle, faEye, faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { Suspense, useState } from 'react'
// import { CardFillColorNonFooter } from '../../components/Cards'
import { Skeleton } from '../../../components/Loading'
import { ModalButton, ModalCard } from '../../../components/Modals'
import { MuiTable } from '../../../components/Tables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lazily } from 'react-lazily'

const {CardFillColorNonFooter} = lazily(()=>import('../../../components/Cards'));

export const Workdept = () => {

  const [modalShow, setModalShow] = useState(false)
  const datatableworkdapt = {
      data:[
        {id:"A102",description:"ซ่อมไฟ",location:"ตึก A",room:"A305",date_time:"26/7/2565",view:<button className="btn btn-success "><FontAwesomeIcon icon={faCheckCircle}/></button>},
      ],
      columns:[
        {title:"รหัส",field:"id"},
        {title:"รายละเอียด",field:"description"},
        {title:"สถานที่",field:"location"},
        {title:"ห้อง",field:"room"},
        {title:"เวลาที่แจ้ง",field:"date_time"},
        {title:"",field:"view"}
      ],
  }

  const tableworkdapt = (
      <Suspense fallback={<Skeleton/>}>
        <MuiTable data={datatableworkdapt.data} columns={datatableworkdapt.columns} title="รายการงานแผนก"/>
    </Suspense>
    
  ) 
  
  return (
    <>
        <Suspense fallback={<Skeleton/>}>
          <CardFillColorNonFooter contentBody={tableworkdapt}/>
        </Suspense>
    </>
  )
}

export const Work = () => {
    const datatablework = {
        data:[
          {id:"A102",description:"ซ่อมไฟ",location:"ตึก A",room:"A305",date_time:"26/7/2565",status:"processing"
            ,view:
            <div className="flex gap-2">
                <button className="btn btn-success "><FontAwesomeIcon icon={faCheckCircle}/></button>
                <button className="btn btn-danger "><FontAwesomeIcon icon={faXmark}/></button>
            </div>
          },
        ],
        columns:[
          {title:"รหัส",field:"id"},
          {title:"รายละเอียด",field:"description"},
          {title:"สถานที่",field:"location"},
          {title:"ห้อง",field:"room"},
          {title:"เวลาที่แจ้ง",field:"date_time"},
          {title:"สถานะ",field:"status",
            lookup:{
              processing:"กำลังดำเนินการซ่อม",
              success:"ดำเนินการเสร็จสิ้น", 
              unable:"ไม่สามารถดำเนินการได้",
            }
          },
          {title:"",field:"view"}
        ]
    }

    return(
        <>
            <CardFillColorNonFooter contentBody={<MuiTable data={datatablework.data} columns={datatablework.columns} title="ตารางงาน"/>}/>
        </>
    )
}