import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { TablesStripedDataTable } from '../../components/Tables'

const Material = () => {

  const dataTableModel = {
      thead:['รหัสครุภัณฑ์', 'รายการ', 'จำนวน', 'วันที่นำเข้า', 'คนที่สั่ง', 'สถานะบุคคล'],
      tbody:[
          ['A3264', 'โต๊ะไม้ขนาด 100*80', '2', '12/02/65', 'Unlimit unarn', 'หัวหน้างาน'],
          ['E4514','ก็อกน้ำ', '4', '13/02/65', 'Unlimit unarn', 'หัวหน้างาน'],
          ['E4514','ก็อกน้ำ', '4', '13/02/65', 'Unlimit unarn', 'หัวหน้างาน'],
          ['E4514','ก็อกน้ำ', '4', '13/02/65', 'Unlimit unarn', 'หัวหน้างาน'],
          ['E4514','ก็อกน้ำ', '4', '13/02/65', 'Unlimit unarn', 'หัวหน้างาน'],
          ['E4514','ก็อกน้ำ', '4', '13/02/65', 'Unlimit unarn', 'หัวหน้างาน'],
          ['E4514','ก็อกน้ำ', '4', '13/02/65', 'Unlimit unarn', 'หัวหน้างาน'],
          ['E4514','ก็อกน้ำ', '4', '13/02/65', 'Unlimit unarn', 'หัวหน้างาน'],
          ['E4514','ก็อกน้ำ', '4', '13/02/65', 'Unlimit unarn', 'หัวหน้างาน'],
          ['E4514','ก็อกน้ำ', '4', '13/02/65', 'Unlimit unarn', 'หัวหน้างาน'],
          ['E4514','ก็อกน้ำ', '4', '13/02/65', 'Unlimit unarn', 'หัวหน้างาน'],
          ['E4514','ก็อกน้ำ', '4', '13/02/65', 'Unlimit unarn', 'หัวหน้างาน'],
      ]
  }
  return (
    <>
        <h1 className="text-2xl"><FontAwesomeIcon icon={faScrewdriverWrench}/> วัสดุครุภัณฑ์</h1>
        <div className="card card-body mt-4">
            <TablesStripedDataTable data={dataTableModel}/>
        </div>
    </>
  )
}

export default Material