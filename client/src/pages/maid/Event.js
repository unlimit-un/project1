import { faCheckCircle, faCircleXmark, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { CardFillColorNonFooterShadow } from '../../components/Cards'
import { TablesStripedDataTable } from '../../components/Tables'

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
          <TablesStripedDataTable data={dataTable} id="workTable"/>
      </div>
  )
  const doneList = (
      <div className="container-fluid">
          <TablesStripedDataTable data={doneTable} id="doneTable"/>
      </div>
  )

  return (
    <>
    <h1 className="text-2xl"><FontAwesomeIcon icon={faHome}/> งานกิจกรรมที่ทำเสร็จแล้ว</h1>
    <div className="row ">
      <div className="col-12">
        <CardFillColorNonFooterShadow contentBody={workList}/>
      </div>
      <div className="col-12 mt-3">
        <CardFillColorNonFooterShadow contentBody={doneList}/>
      </div>
    </div>
    </>
  )
}

export default Event