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
import { GetLeaveData, getleaveDataByid, getLeaveType, insertLeave,delectLeaveByid } from '../../controllers/maid/LeaveControllers'
import { delectleaveData } from '../../controllers/maid/LeaveControllers' 

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Leave = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowLeaveDetail, setModalShowLeaveDetail] = useState(false);
  const [modal, setModal] = useState({
    mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faClipboardList}/> ยื่นเรื่องการลา</h1>,
    mBody:<></>
  })
  
const [leaveData, setLeaveData] = useState ([])
const [radioLeaveType, setRadioLeaveType] = useState([])
const [insertData, setInsertData] = useState([])

const [inserttitle ,setInsertTitle] = useState ('')
const [insertLeaveType ,setInsertLeaveType] = useState ('')
const [insertDateStart ,setInsertDateStart] = useState ('')
const [insertDateEnd,setInsetrDateEnd] = useState ('')
const [insertDescription ,setInserDescription] = useState ('')


const setTitle = ({target:{value}})=>setInsertTitle(value) 
const setLeaveType = ({target:{value}})=>setInsertLeaveType(value) 
const setDate_Start = ({target:{value}})=>setInsertDateStart(value) 
const setDate_End = ({target:{value}})=>setInsetrDateEnd(value) 
const setDescription = ({target:{value}})=>setInserDescription(value) 

const fromdata ={
  title:inserttitle,
  leave_type:insertLeaveType,
  date_start:insertDateStart,
  date_end:insertDateEnd,
  description:insertDescription
}
console.log(fromdata);
  const loadleaveData = async() =>{
    const leaveData = await GetLeaveData();
    setLeaveData(leaveData)
  }
  const loadLeaveType = async() =>{
    const leavetype = await getLeaveType();
    console.log(leavetype);
    setRadioLeaveType(leavetype.map((item ,i)=><RadioInline key={i} callback={setLeaveType} id= {`radio${item['leave_type_id']}`} label={item['leave_type_name']} value={item['leave_type_id']} name="leave"/>)
    )
  }
  
  useEffect(()=>{
    loadleaveData();
    loadLeaveType()
  },[])
  const handlesShowModalInsert = async () =>{
    setInsertTitle('') 
    setInsertLeaveType('') 
    setInsertDateStart('') 
    setInsetrDateEnd('') 
    setInserDescription('') 

    setModal({
      mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faClipboardList}/> ยื่นเรื่องการลา</h1>,
      mBody:<>
        <div className="container-fluid">
          
            <div className="row">
              <div className="col-12">
                <InputGroupWithLabel id="title" label="หัวข้อการลา" placeholder="หัวข้อการลา"  callback={setTitle}/>
              </div>
              <div className="col-12">
                <p className="m-0">ประเภทการลา</p>
                {radioLeaveType}
              </div>
              <div className="col-md-6 col-12">
                <InputGroupWithLabel id="date_start" type="date" label="ลาวันที่" callback={setDate_Start}/>
              </div>
              <div className="col-md-6 col-12">
                <InputGroupWithLabel id="date_end" type="date" label="ถึงวันที่" callback={setDate_End}/>
              </div>
              <div className="col-12">
                <TextAreawithlabel id="description" label="รายละเอียดการลา" callback={setDescription}/>
              </div>
            </div>
          
        </div>
      </>
    })
  }
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
          ED:<Delete DeleteFnc={async()=>{
            const bool = await delectLeaveByid({leave_id:item[`leave_id`]})
            if (bool) {
              loadleaveData()
            }
          }}/>, 
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
  return (
    <>
        <h1 className="text-2xl"><FontAwesomeIcon icon={faClipboardList}/> การลา</h1>
        <div className="flex justify-end">
          <ModalButton icon={faPlus} text="ยื่นเรื่องการลา" classBtn="btn btn-outline-primary" setModalShow={setModalShow} callback={()=>{handlesShowModalInsert()}}/>
        </div>
        <div className="mt-3">
          <Suspense fallback={<Skeleton/>}>
            <CardFillColorNonFooterShadow contentBody={tableLeave}/>
          </Suspense>
        </div>
        

        {/* modal */}
        <ModalCardConfirm 
        cancleCallback={()=>{}} 
          confrimCallback={async()=>{
            await insertLeave(fromdata)
            await loadleaveData()
          }
        } 
        modalShow={modalShow} 
        setModalShow={setModalShow} 
        modalHead={modal.mHead} 
        modalBody={modal.mBody} 
        btnOkText="บันทึก" />
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