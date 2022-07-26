import { faEye } from '@fortawesome/free-solid-svg-icons'
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
        {id:"A102",description:"ซ่อมไฟ",location:"ตึก A",room:"A305",date_time:"26/7/2565",view:<ModalButton classBtn="btn btn-outline-primary" setModalShow={setModalShow} callback={()=>{}} icon={faEye}/>},
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

  const Modal = {
    mHead:(
      <>
        <div></div>
      </>
    ),
    mBody:(
      <>
        <div className="row">
          <div className="col-12">
            
              <button className="btn btn-success w-1/4" >ยืนยัน</button>
              <button className="btn btn-danger w-1/4" >ยกเลิก</button>
            
          </div>
        </div>
      </>
    )
  }
  return (
    <>
        <Suspense fallback={<Skeleton/>}>
          <CardFillColorNonFooter contentBody={tableworkdapt}/>
        </Suspense>
          
          <ModalCard modalShow={modalShow} setModalShow={setModalShow} modalBody={Modal.mBody} modalHead={Modal.mHead}/>
        <div>
          <button className="btn btn-success w-1/4" >ยืนยัน</button>
          <button className="btn btn-danger w-1/4" >ยกเลิก</button>
      </div>
    </>
  )
}

export const Work = () => {
    const datatablework = {
        data:[
          {id:"A102",description:"ซ่อมไฟ",location:"ตึก A",room:"A305",date_time:"26/7/2565",status:"processing"},
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
          }
        ]
    }

    return(
        <>
            <CardFillColorNonFooter contentBody={<MuiTable data={datatablework.data} columns={datatablework.columns} title="ตารางงาน"/>}/>
        </>
    )
}