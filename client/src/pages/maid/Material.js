import { faBox, faCopy, faEye, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense, useState } from 'react'
import { Bandage } from '../../components/Bandage'
import { CardFillColorNonFooterShadow } from '../../components/Cards'
import { Delete } from '../../components/EditDelete'
import { InputGroupWithLabel } from '../../components/FormElements'
import { ModalButton, ModalCard, ModalCardConfirm } from '../../components/Modals'
import { lazily } from "react-lazily";
import { Skeleton } from '../../components/Loading'

const { MuiTable } = lazily(()=>import('../../components/Tables'))

const Material = () => {
  const [modalShow, setModalShow] = useState(false)
  const [modalConfirmShow, setModalConfirmShow] = useState(false)
  const [modal, setModal] = useState({
      mHead: (
          <>
              <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCopy}/> รายละเอียดการแจ้งซ่อม</h1>
          </>
      ),
      mBody: (
          <>
              <div className="row">
                  <div className="col-lg-3 col-md-4 col-12">
                      <ul>
                          <li>ปัญหา</li>
                          <li>ผู้แจ้ง</li>
                          <li>วันที่แจ้ง</li>
                          <li>สถานที่</li>
                          <li>ห้อง</li>
                          <li>สถานะ</li>
                      </ul>
                  </div>
                  <div className="col-lg-9 col-md-8 col-12">
                      <ul className="gap-2">
                          <li>อ่างล้างหน้าพัง</li>
                          <li>unlimit unarn</li>
                          <li>2022-02-21</li>
                          <li>ตึก A</li>
                          <li>A202</li>
                          <li>"กำลังดำเนินการซ่อม"</li>
                      </ul>
                  </div>
              </div>
          </>
      )
  })

  
  const MuiTableData = {
    data:[
        {order_id:"unlimit unarn", import_date:"2022-02-21", list_item:"น้ำยาเช็ดกระจก", count:10, status:"waiting", ED:<Delete/>, view:<ModalButton callback={()=>handleView(setModal)} classBtn="btn btn-outline-primary" setModalShow={setModalShow} icon={faEye}/> },
    ],
    columns: [
        {title: "",field: "ED"},
        {title: "รหัส",field: "order_id", },
        {title: "รายการ",field: "list_item",},
        {title: "จำนวน",field: "count", type: "numeric"},
        {title: "วันที่นำเข้า",field: "import_date", },
        {title: "สถานะ",field: "status", 
            lookup:{
                waiting: "รออนุมัติ", 
                accept:"อนุมัติ", 
                deny:"ไม่อนุมัติ",
            }
        },
        {title: "",field: "view"},
    ]
}
  
  const tableMaterial = (
    <>
      <Suspense fallback={<Skeleton/>}>
        <MuiTable data={MuiTableData.data} columns={MuiTableData.columns} title="ตารางคำสั่งซื้อครุภัณฑ์"/>
      </Suspense>
    </>
  )
  return (
    <>
        <h1 className="text-2xl"><FontAwesomeIcon icon={faBox}/> สั่งซื้อครุภัณฑ์</h1>
          <div className="flex justify-end">
            <ModalButton icon={faPlus} text="ยื่นเรื่องสั่งซื้อ" classBtn="btn btn-outline-primary" callback={()=>handleShowAdd(setModal)} setModalShow={setModalConfirmShow}/>
          </div>
        <div className="mt-3">
          <CardFillColorNonFooterShadow contentBody={tableMaterial}/>
        </div>
        

        {/* modal */}
        <ModalCard modalShow={modalShow} setModalShow={setModalShow} modalHead={modal.mHead} modalBody={modal.mBody} btnOkText="บันทึก" />
        <ModalCardConfirm cancleCallback={()=>{}} confrimCallback={()=>{}} modalShow={modalConfirmShow} setModalShow={setModalConfirmShow} modalHead={modal.mHead} modalBody={modal.mBody} btnOkText="บันทึก" />
    </>
  )
}

const handleShowAdd = (setModal) =>{
  setModal({
    mHead: (
        <>
            <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faBox}/> ยื่นเรื่องสั่งซื้อ</h1>
        </>
    ),
    mBody: (
        <>
            <div className="row">
                <div className="col-md-6 col-12">
                  <InputGroupWithLabel id="input_material" placeholder="วัสดุครุภัณฑ์ที่ต้องการสั่ง" label="ชื่อวัสดุครุภัณ์"/>
                </div>
                <div className="col-md-6 col-12">
                  <InputGroupWithLabel id="input_count" placeholder="จำนวน" label="จำนวน"/>
                </div>
            </div>
        </>
    )
  })
}

const handleView = (setModal) =>{
  setModal({
      mHead: (
          <>
              <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCopy}/> รายละเอียดคำสั่งซื้อ</h1>
          </>
      ),
      mBody: (
          <>
              <div className="row">
                  <div className="col-lg-3 col-md-4 col-12">
                      <ul>
                          <li>ปัญหา</li>
                          <li>ผู้แจ้ง</li>
                          <li>วันที่แจ้ง</li>
                          <li>สถานที่</li>
                          <li>ห้อง</li>
                          <li>สถานะ</li>
                      </ul>
                  </div>
                  <div className="col-lg-9 col-md-8 col-12">
                      <ul className="gap-2">
                          <li>อ่างล้างหน้าพัง</li>
                          <li>unlimit unarn</li>
                          <li>2022-02-21</li>
                          <li>ตึก A</li>
                          <li>A202</li>
                          <li>"กำลังดำเนินการ"</li>
                      </ul>
                  </div>
              </div>
          </>
      )
  })
}

export default Material