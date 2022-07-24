import { faCheckCircle, faCircleXmark, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,Suspense } from 'react'
import { TablesStriped } from '../../components/Tables'
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily'

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Event = () => {

  const [dataTable, setDataTable] = useState({
    thead:['รหัส', 'รายละเอียดงาน', 'สถานที่', 'เริ่มวันที่', 'ถึงวันที่', 'สถานะ'],
    tbody:[
      [
        'A315434', 'ทำความสะอาด', 'ตึกA A202', '3/7/2023', '5/7/2023', 
        <div className="flex justify-center gap-2">
          <button className="btn btn-success"><FontAwesomeIcon icon={faCheckCircle}/></button>
          <button className="btn btn-danger"><FontAwesomeIcon icon={faCircleXmark}/></button>
        </div>
      ],
      [
        'A315435', 'ทำความสะอาด', 'ตึกA A202', '3/7/2023', '5/7/2023', 
        <div className="flex justify-center gap-2">
          <button className="btn btn-success"><FontAwesomeIcon icon={faCheckCircle}/></button>
          <button className="btn btn-danger"><FontAwesomeIcon icon={faCircleXmark}/></button>
        </div>
      ],
    ]
  } );
  const [doneTable, setDoneTable] = useState({
    thead:['รหัส', 'รายละเอียดงาน', 'สถานที่', 'เริ่มวันที่', 'ถึงวันที่', 'สถานะ'],
    tbody:[
      [
        'A315433', 'ทำความสะอาด', 'ตึกA A202', '3/7/2023', '5/7/2023', 
        <div className="flex justify-center gap-2">
          <button className="btn btn-success" disabled><FontAwesomeIcon icon={faCheckCircle}/></button>
        </div>
      ],
    ]
  } );

  const workList = (
      <div className="container-fluid">
          <TablesStriped data={dataTable} id="workTable"/>
      </div>
  )
  const doneList = (
      <div className="container-fluid">
          <TablesStriped data={doneTable} id="doneTable"/>
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