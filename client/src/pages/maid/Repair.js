import { faClipboardList, faEye, faPencil, faPlus, faScrewdriverWrench, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,Suspense, useEffect } from 'react'
import { Bandage } from '../../components/Bandage'
import { InputGroupWithLabel, RadioInline, SelectOptionWithLabel, TextAreawithlabel } from '../../components/FormElements'
import { ModalButton, ModalCardConfirm } from '../../components/Modals'
import { MuiTable, TablesStriped } from '../../components/Tables'
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily'
import { EditDelete } from '../../components/EditDelete'
import { GetRepairData, GetRepairLocation } from '../../controllers/maid/RepairControllers'

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Repair = () => {
  const [modalShow, setModalShow] = useState(false);
  const [optionsLocation, setOptionsLocation] = useState ([{}]);
  // const optionsLocation = [
  //     {value: "1", text: "ตึก A"},
  //     {value: "2", text: "ตึก B"},
  //     {value: "3", text: "ตึก C"},
  // ]
  const optionsRoom = [
    {value: "1", text: "A202"},
    {value: "2", text: "A203"},
    {value: "3", text: "A204"},
  ]
  
  const [dataTableData, setDataTableData] = useState([]);

  const loadRepairTable = async ()=>{
    const repairDataTable = await GetRepairData ()
    setDataTableData(repairDataTable)
  }

  useEffect(()=>{
    loadRepairTable ()
    loadrepairlocation ()
  },[])

  console.log(dataTableData);

  const dataTable = {
   data:[
      ...dataTableData.map(item=>{
          return{
            problem:item['description'],
            location:item['location_id'],
            room:item['room_id'],
            date_time:item['notify_repair_date'],
            status:item['note'],
            ED:<EditDelete/>,
            view:<ModalButton icon={faEye} setModalShow={setModalShow} callback={()=>{}}/>
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
  console.log(optionsLocation);
  const Modal = {
    mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faClipboardList}/> ยื่นเรื่องซ่อม</h1>,
    mBody:<>
      <div className="container-fluid">
        <form>
          <div className="row">
            <div className="col-md-6 col-12">
              <SelectOptionWithLabel id="location" label="สถานที่" options_arr_obj={optionsLocation} />
            </div>
            <div className="col-md-6 col-12">
              <SelectOptionWithLabel id="room" label="ห้อง" options_arr_obj={optionsRoom} />
            </div>
            <div className="col-12">
              <TextAreawithlabel id="description" label="ปัญหา"/>
            </div>
          </div>
        </form>
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
        <ModalCardConfirm cancleCallback={()=>{}} hideCallback={()=>{}} modalShow={modalShow} setModalShow={setModalShow} modalHead={Modal.mHead} modalBody={Modal.mBody} btnOkText="บันทึก" />
    </>
  )
}

export default Repair