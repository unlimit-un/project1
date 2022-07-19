import { faClipboardList, faEye, faPencil, faPlus, faScrewdriverWrench, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Bandage } from '../../components/Bandage'
import { CardFillColorNonFooterShadow } from '../../components/Cards'
import { InputGroupWithLabel, RadioInline, SelectOptionWithLabel, TextAreawithlabel } from '../../components/FormElements'
import { ModalButton, ModalCardConfirm } from '../../components/Modals'
import { TablesStripedDataTable } from '../../components/Tables'

const Repair = () => {
  const [modalShow, setModalShow] = useState(false);
  const optionsLocation = [
      {value: "1", text: "ตึก A"},
      {value: "2", text: "ตึก B"},
      {value: "3", text: "ตึก C"},
  ]
  const optionsRoom = [
    {value: "1", text: "A202"},
    {value: "2", text: "A203"},
    {value: "3", text: "A204"},
  ]

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

  const initial = {
    thead:['ปัญหา', 'สถานที่', 'ห้อง', 'วันที่แจ้ง', 'สถานะ', ''],
    tbody:[
        ['อ่างล้างหน้าแตก', 'ตึก A', 'A202', '3/7/2023', 
        <div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-success" text="อนุมัติ"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>, 
        <div className="flex justify-center gap-2"><FontAwesomeIcon icon={faPencil} className="text-green-500"/><FontAwesomeIcon className="text-danger" icon={faTrashAlt}/></div>],
        
    ]
  } 
  const [dataTable, setDataTable] = useState(initial);
 
  const handleFilterData = (text) =>{
      setDataTable({
              ...initial, 
              tbody:  initial.tbody.filter(item =>{
              if ( item[4].props.children[0].props.text === text ) {
                  return item
              }else if(text === 'ทั้งหมด'){
                  return item
              }
          })
      })
  }
  const arr_obj = [
    {value:'ทั้งหมด', text:'สถานะทั้งหมด'},
    {value:'อนุมัติ', text:'อนุมัติ'},
    {value:'รออนุมัติ', text:'รออนุมัติ'},
    {value:'ไม่อนุมัติ', text:'ไม่อนุมัติ'},
  ]

  const tableLeave = (
      <div className="container-fluid">
        <div className="ms-auto w-1/4 text-end text-xl">
          <SelectOptionWithLabel id="leave" label="สถานะ" options_arr_obj={arr_obj} callback={handleFilterData}/>
        </div>
          <TablesStripedDataTable data={dataTable}/>
      </div>
  )

  return (
    <>
        <h1 className="text-2xl"><FontAwesomeIcon icon={faScrewdriverWrench}/> แจ้งซ่อม</h1>
        <ModalButton icon={faPlus} text="ยื่นเรื่องซ่อม" classBtn="bg-green-500 text-white " setModalShow={setModalShow}/>
        <div className="mt-3">
          <CardFillColorNonFooterShadow contentBody={tableLeave}/>
        </div>
        

        {/* modal */}
        <ModalCardConfirm modalShow={modalShow} setModalShow={setModalShow} modalHead={Modal.mHead} modalBody={Modal.mBody} btnOkText="บันทึก" />
    </>
  )
}

export default Repair