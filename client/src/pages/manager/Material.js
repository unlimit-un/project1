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
        <div className="container-fluid">

          <div className="card card-body mt-4">
              <TablesStripedDataTable data={dataTableModel}/>
          </div>
          <div className="card card-body mt-4">
            <div className="flex flex-column justify-center">
              <h3>เพิ่มรายการวัสดุครุภัณฑ์</h3>
              <from>
                  <div className="row" >
                    <div className="col-sm-4">
                      <label htmlFor="validationCustom01" className="from-label">รหัส </label>
                      <input  className="form-control" id="input_id"  placeholder="" type="text" />
                    </div>
                    <div className="col-sm-4">
                      <label htmlFor="validationCustom02" className="from-label">ชื่อรายการ </label>
                      <input  className="form-control" id="input_name"  placeholder="" type="text" />
                    </div>
                    <div className="col-sm-4">
                      <label htmlFor="validationCustom03" className="from-label">จำนวน </label>
                      <input  className="form-control" id="input_quantity"  placeholder="" type="text" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                        <label htmlFor="validationCustom04" className="form-label">วันที่เพิ่มเข้าระบบ</label>
                        <input  className="form-control" placeholder="" type="date" /> 
                    </div>
                    <div className="col-sm-4">
                        <label htmlFor="validationCustom05" className="form-label ">วันที่ส่ง</label>
                        <input  className="form-control" placeholder="" type="date"/> 
                    </div>
                  </div>
              </from>
            </div>
            <div className="flex justify-start mt-4">
              <button className="!bg-blue-600  text-white text-xl rounded w-25 p-2 ">เพิ่ม</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default Material