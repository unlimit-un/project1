import { faClipboardList, faCopy, faEye, faPencil, faPlus, faScrewdriverWrench, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,Suspense, useEffect } from 'react'
import { Bandage } from '../../components/Bandage'
import { InputGroupWithLabel, RadioInline, SelectOptionWithLabel, TextAreawithlabel } from '../../components/FormElements'
import { ModalButton, ModalCard, ModalCardConfirm } from '../../components/Modals'
import { MuiTable, TablesStriped } from '../../components/Tables'
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily'
import { Delete, EditDelete } from '../../components/EditDelete'
import { GetRepairData, getrepairDataById, GetRepairLocation, getroomBylocationId, insertRepair, UpdateRepair } from '../../controllers/maid/RepairControllers'

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Repair = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDetail,setModalShowDetail] = useState (false);
  const [modal , setModal] = useState ({
    mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faClipboardList}/> ยื่นเรื่องการลา</h1>,
    mBody:<></>
  });
  const [optionsLocation, setOptionsLocation] = useState ([{}]);
  const [optionsRoom, setOptionRoom] = useState ([{value:'',text:'กรุณาเลือกข้อมูล'}]);
  const [inputLocationId, setInputLocationId] = useState('');
  const [inputRoomId, setInputRoomId] = useState('');
  const [inputDescript, setInputDescript] = useState ('');
  // const optionsLocation = [
  //     {value: "1", text: "ตึก A"},
  //     {value: "2", text: "ตึก B"},
  //     {value: "3", text: "ตึก C"},
  // ]
  // const optionsRoom = [
  //   {value: "1", text: "A202"},
  //   {value: "2", text: "A203"},
  //   {value: "3", text: "A204"},
  // ]
  const formdata ={
    location_id:inputLocationId,
    room_id:inputRoomId,
    description:inputDescript
  }
  
  const [dataTableData, setDataTableData] = useState([]);

  const loadRepairTable = async ()=>{
    const repairDataTable = await GetRepairData ()
    setDataTableData(repairDataTable)
  }


  useEffect(()=>{
    loadRepairTable ()
    loadrepairlocation ()
  },[])

  useEffect(()=>{
    if (inputLocationId !== '') {
      setInputRoomId ('')
      loadRoom ()
    }
  },[inputLocationId])

  // console.log(dataTableData);

  const dataTable = {
   data:[
      ...dataTableData.map(item=>{
          return{
            problem:item['description'],
            location:item['location_name'],
            room:item['room_name'],
            date_time:item['notify_repair_date'],
            status:item['note'],
            ED:<Delete DeleteFnc = {async () =>{
              const bool = await UpdateRepair ({notify_repair_id:item['notify_repair_id']})
              if (bool ) {
                loadRepairTable ()
              }
            }}
            />,
            view:<ModalButton icon={faEye} setModalShow={setModalShowDetail} callback={()=>handleView(setModal,item['notify_repair_id'])} classBtn="btn btn-outline-primary"/>
          }
      })
    ],
    columns:[
      {title:"ปัญหา",field:"problem"},
      {title:"สถานที่",field:"location"},
      {title:"ห้อง",field:"room"},
      {title:"วันที่แจ้ง",field:"date_time"},
      {title:"สถานะ",field:"status",
        lookup:{
          success:"ดำเนินการเสร็จสิ้น", 
          processing:"กำลังดำเนินการ",
          deny:"ปฏิเสธ",
          waiting:"รอดำเนินการ",
          unable:"ไม่สามารถดำเนินการ",
          needless:"ไม่ต้องการดำเนินการ",
        }
      },
      {title:"",field:"ED"},
      {title:"",field:"view"},
    ]

  } 
  // const arr_obj = [
  //   {value:'ทั้งหมด', text:'สถานะทั้งหมด'},
  //   {value:'อนุมัติ', text:'อนุมัติ'},
  //   {value:'รออนุมัติ', text:'รออนุมัติ'},
  //   {value:'ไม่อนุมัติ', text:'ไม่อนุมัติ'},
  // ]
  
  const loadrepairlocation = async ()=>{
    const repairlocation = await GetRepairLocation ();
     setOptionsLocation  ([{value:'',text:'กรุณาเลือกข้อมูล'},...repairlocation.map(item=>{
      return{value:item['location_id'],text:`${item['location_name']}`}
    })])
  }
  const loadRoom = async ()=>{
    const repairRoom = await getroomBylocationId (inputLocationId)
    setOptionRoom ([{value:'',text:'กรุณาเลือกข้อมูล'},...repairRoom.map(item=>{
      return{value:item['room_id'],text:`${item['room_name']}`}
    })])
  }

  // console.log(optionsLocation);
  const Modal = {
    mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faClipboardList}/> ยื่นเรื่องซ่อม</h1>,
    mBody:<>
      <div className="container-fluid">
        
          <div className="row">
            <div className="col-md-6 col-12">
              <SelectOptionWithLabel id="location" label="สถานที่" 
                options_arr_obj={optionsLocation} 
                callback={({target:{value}}) => {setInputLocationId(value)}} 
                value = {inputLocationId}
              />
            </div>
            <div className="col-md-6 col-12">
              <SelectOptionWithLabel id="room" label="ห้อง" 
                options_arr_obj={optionsRoom} 
                callback={({target:{value}}) => {setInputRoomId(value)}} 
                value = {inputRoomId}
              />
            </div>
            <div className="col-12">
              <TextAreawithlabel id="description" label="ปัญหา"
                callback={({target:{value}}) => {setInputDescript(value)}} 
                value = {inputDescript}
              />
            </div>
          </div>
        
      </div>
    </>
  }

  const tableLeave = (
      <div className="container-fluid">
        {/* <div className="ms-auto w-1/4 text-end text-xl">
          <SelectOptionWithLabel id="leave" label="สถานะ" options_arr_obj={arr_obj} />
        </div> */}
          <MuiTable data={dataTable.data} columns={dataTable.columns} title=""/>
      </div>
  )
  const resetState = () =>{
    setInputLocationId('')
    setInputDescript('')
    setInputRoomId('')
   
  }

  return (
    <>
        <h1 className="text-2xl"><FontAwesomeIcon icon={faScrewdriverWrench}/> แจ้งซ่อม</h1>
          <div className="flex justify-end">
            <ModalButton icon={faPlus} text="ยื่นเรื่องซ่อม" classBtn="btn btn-outline-primary" setModalShow={setModalShow} callback ={()=>{}}/>
          </div>
        <div className="mt-3">
          <Suspense fallback={<Skeleton/>}>
            <CardFillColorNonFooterShadow contentBody={tableLeave}/>
          </Suspense>
        </div>
        

        {/* modal */}
        <ModalCardConfirm 
              confrimCallback={async()=>{
                await insertRepair(formdata)
                await loadRepairTable ()
                await resetState()
              }}
              cancleCallback={resetState} 
              hideCallback={resetState}
              modalShow={modalShow} setModalShow={setModalShow}
              modalHead={Modal.mHead} 
              modalBody={Modal.mBody} 
              btnOkText="บันทึก" 
         />
         <ModalCard modalBody={modal.mBody} modalHead={modal.mHead} modalShow={modalShowDetail} setModalShow={setModalShowDetail}/>
    </>
  ) 
}
const handleView = async (setModal,notify_repair_id) => {

  const [notifyData] = await getrepairDataById (notify_repair_id)
  const [data_reg, time_reg] = notifyData['time_reg'].split(/[\sT\s.]/);
  setModal({
    mHead:<h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCopy}/> รายละเอียดการแจ้งซ้อม</h1>,
    mBody:<>
      <div className= "container-fluid">
        <ul>
          <li>ปัญหา:{notifyData['description']}</li>
          <li>สถานที่:{notifyData['location_name']}</li>
          <li>ห้อง:{notifyData['room_name']}</li>
          <li>วันที่แจ้ง:{notifyData['notify_repair_date']}</li>
          <li>สถานะ:{notifyData['note']}</li>
          <li>วันที่เพิ่มข้อมูล:{`${data_reg} ${time_reg}`}</li>
        </ul>
      </div>
    </>
  })
}

export default Repair