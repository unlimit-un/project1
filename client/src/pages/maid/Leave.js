import { faClipboardList, faEye, faPlus,faTrash,faPencil, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,Suspense, useEffect } from 'react'
import { Bandage } from '../../components/Bandage'
import { InputGroupWithLabel, RadioInline, SelectOptionWithLabel, TextAreawithlabel } from '../../components/FormElements'
import { ModalButton, ModalCard, ModalCardConfirm } from '../../components/Modals'
import { MuiTable, TablesStriped } from '../../components/Tables'
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily'
import { Delete } from '../../components/EditDelete'
import { GetLeaveData, getleaveDataByid } from '../../controllers/maid/LeaveControllers'
import { delectleaveData } from '../../controllers/maid/LeaveControllers' 

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Leave = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowLeaveDetail, setModalShowLeaveDetail] = useState(false);
  const [modal, setModal] = useState({
    mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faClipboardList}/> ยื่นเรื่องการลา</h1>,
    mBody:<>
      <div className="container-fluid">
        <form>
          <div className="row">
            <div className="col-12">
              <InputGroupWithLabel id="title" label="หัวข้อการลา" placeholder="หัวข้อการลา" />
            </div>
            <div className="col-12">
              <p className="m-0">ประเภทการลา</p>
              <RadioInline id="affair" label="ลากิจ" value="0" name="leave"/>
              <RadioInline id="sick" label="ลาป่วย" value="0" name="leave"/>
              <RadioInline id="vacation" label="ลาพักผ่อน" value="0" name="leave"/>
            </div>
            <div className="col-md-6 col-12">
              <InputGroupWithLabel id="date_start" type="date" label="ลาวันที่"/>
            </div>
            <div className="col-md-6 col-12">
              <InputGroupWithLabel id="date_end" type="date" label="ถึงวันที่"/>
            </div>
            <div className="col-12">
              <TextAreawithlabel id="description" label="รายละเอียดการลา"/>
            </div>
          </div>
        </form>
      </div>
    </>
  })
  
const [leaveData, setLeaveData] = useState ([])
const MuiTableData = {
  data:[
    ...leaveData.map(item=>{
       return{
        title:item["title"], 
        type:item["leave_type_name"], 
        detail:item["description"], 
        date_start:item["date_start"], 
        date_end:item["date_end"],
        status:item["note"], 
        ED:<Delete DeleteFnc={delectleaveData}/>, 
        view:<ModalButton callback={()=>handleView(setModal,item[`leave_id`] )} classBtn="btn btn-outline-primary" setModalShow={setModalShowLeaveDetail} icon={faEye}/>
      }
    })
  ],
  columns: [
    {title: "",field: "ED"},
    {title: "หัวเรื่อง",field: "title", },
    {title: "ประเภทการลา",field: "type",},
    {title: "รายละเอียด",field: "detail",},
    {title: "เริ่มลาวันที่",field: "date_start", },
    {title: "ถึงวันที่",field: "date_end", },
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
const tableLeave = (
  <div className="container-fluid">
      <MuiTable data={MuiTableData.data} columns={MuiTableData.columns} title="ข้อมูลการลา"/>
  </div>
)
  const loadleaveData = async() =>{
    const leaveData = await GetLeaveData();
    setLeaveData(leaveData)
  }
  useEffect(()=>{
    loadleaveData()
  },[])

  return (
    <>
        <h1 className="text-2xl"><FontAwesomeIcon icon={faClipboardList}/> การลา</h1>
        <div className="flex justify-end">
          <ModalButton icon={faPlus} text="ยื่นเรื่องการลา" classBtn="btn btn-outline-primary" setModalShow={setModalShow} callback={()=>{}}/>
        </div>
        <div className="mt-3">
          <Suspense fallback={<Skeleton/>}>
            <CardFillColorNonFooterShadow contentBody={tableLeave}/>
          </Suspense>
        </div>
        

        {/* modal */}
        <ModalCardConfirm modalShow={modalShow} setModalShow={setModalShow} modalHead={modal.mHead} modalBody={modal.mBody} btnOkText="บันทึก" />
        <ModalCard modalShow={modalShowLeaveDetail} setModalShow={setModalShowLeaveDetail} modalHead={modal.mHead} modalBody={modal.mBody}/>
    </>
  )
}

const handleView = async (setModal,leave_id) =>{
  
 const [LeaveData] =  await getleaveDataByid(leave_id)
 const [data_reg, time_reg] = LeaveData['time_reg'].split(/[\sT\s.]/);


  setModal({
    mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCopy}/> รายละเอียดการลา</h1>,
    mBody:<>
      <div className="container-fluid">
        <ul>
          <li>หัวเรื่อง:{LeaveData['title']}</li>
          <li>ประเภทการลา:{LeaveData['leave_type_name']}</li>
          <li>ชื่อ-สกุล:{LeaveData['Name']}</li>
          <li>รายละเอียด:{LeaveData['description']}</li>
          <li>เริ่มลาวันที่:{LeaveData['date_start']}</li>
          <li>ถึงวันที่:{LeaveData['date_end']}</li>
          <li>สถานะ:{LeaveData['note']}</li>
          <li>วันที่เพิ่มข้อมูล:{`${data_reg} ${time_reg}`}</li>
        </ul>
       
      </div>
    </>
  })
}

export default Leave