import { faClipboardList, faEye, faPlus,faTrash,faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,Suspense } from 'react'
import { Bandage } from '../../components/Bandage'
import { InputGroupWithLabel, RadioInline, SelectOptionWithLabel, TextAreawithlabel } from '../../components/FormElements'
import { ModalButton, ModalCardConfirm } from '../../components/Modals'
import { TablesStriped } from '../../components/Tables'
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily'

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Leave = () => {
  const [modalShow, setModalShow] = useState(false);
  const Modal = {
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
  }

  const initial = {
    thead:['หัวเรื่อง', 'ประเภทการลา', 'รายละเอียด', 'เริ่มลาวันที่', 'ถึงวันที่', 'สถานะ'],
    tbody:[
        ['เดินทางต่างจังหวัด', 'ลากิจ', 'ไปทำธุระต่างจังหวัด', '3/7/2023', '5/7/2023',<div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-success" text="อนุมัติ"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>,
          <div className="flex justify-center gap-2">
            <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
            <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
          </div>
        ],
        ['ลาเที่ยว', 'ลาพักร้อน', 'เที่ยวต่างจังหวัดกับครอบครัว', '6/7/2023', '12/7/2023', <div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-danger" text="ไม่อนุมัติ"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>,
          <div className="flex justify-center gap-2">
            <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
            <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
         </div>
        ],
        ['ไม่สบาย', 'ลาป่วย', 'ไข้สูง ตัวร้อน', '7/8/2023', '15/8/2023', <div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-warning" text="รออนุมัติ"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>,
          <div className="flex justify-center gap-2">
            <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
            <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
         </div>
        ],
    ]
  } 
  const [dataTable, setDataTable] = useState(initial);
 
  const handleFilterData = (text) =>{
      setDataTable({
              ...initial, 
              tbody:  initial.tbody.filter(item =>{
              if ( item[5].props.children[0].props.text === text ) {
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
          <TablesStriped data={dataTable}/>
      </div>
  )

  return (
    <>
        <h1 className="text-2xl"><FontAwesomeIcon icon={faClipboardList}/> การลา</h1>
        <ModalButton icon={faPlus} text="ยื่นเรื่องการลา" classBtn="bg-green-500 text-white " setModalShow={setModalShow}/>
        <div className="mt-3">
          <Suspense fallback={<Skeleton/>}>
            <CardFillColorNonFooterShadow contentBody={tableLeave}/>
          </Suspense>
        </div>
        

        {/* modal */}
        <ModalCardConfirm modalShow={modalShow} setModalShow={setModalShow} modalHead={Modal.mHead} modalBody={Modal.mBody} btnOkText="บันทึก" />
    </>
  )
}

export default Leave