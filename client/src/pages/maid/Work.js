import React, { useState } from 'react'
import { CardFillColorNonFooter, CardFillColorNonFooterShadow } from '../../components/Cards';
import { TablesStriped } from '../../components/Tables';
import { faCheckCircle, faCircleXmark,faPencil,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Work = () => {
  const [name,setName] = useState ('');
  const dataTable = {
    thead:['รหัส','รายละเอียดงาน','สถานที่','สถานะ'],
    tbody:[
      ['A','B','C',
        <div className="flex justify-center gap-2">
          <button className="btn btn-success"><FontAwesomeIcon icon={faCheckCircle}/></button>
          <button className="btn btn-danger"><FontAwesomeIcon icon={faCircleXmark}/></button>
        </div>,
        <div className="flex justify-center gap-2">
          <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
          <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
       </div>
    ],
    ['C','D','E',
      <div className="flex justify-center gap-2">
        <button className="btn btn-success"><FontAwesomeIcon icon={faCheckCircle}/></button>
        <button className="btn btn-danger"><FontAwesomeIcon icon={faCircleXmark}/></button>
     </div>,
      <div className="flex justify-center gap-2">
        <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
        <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
      </div>
    ]
    ]
  }
  const datatTable1 ={
    thead:['รหัส','รายละเอียดงาน','สถานที่','เวลาเข้า-ออก','สถานะ'],
    tbody:[
      ['A','B','C','12.00',
        <div className="flex justify-center gap-2">
          <button className="btn btn-success"><FontAwesomeIcon icon={faCheckCircle}/></button>
      </div>
    ],
    ['C','D','E',11.00,
      <div className="flex justify-center gap-2">
        <button className="btn btn-danger"><FontAwesomeIcon icon={faCircleXmark}/></button>
      </div>]
    ]
  }
 
  const contentBody = (
    <>
        <div className="container-fluid">
            <h1 className="text-xl"> รายการงาน</h1>
            <hr />
            <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<TablesStriped data={dataTable} id="_table1"/>}/>
        </div>
    </>
  )
  const contentBody1 = (
    <>
        <div className="container-fluid">
          <h1 className="text-xl"> งานที่ทำเสร็จแล้ว</h1>
            <hr />
            <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<TablesStriped data={datatTable1} id="_table2"/>}/>
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