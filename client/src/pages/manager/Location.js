import React, { Suspense, useState } from 'react'
import { InputGroupWithLabel, SelectOptionWithLabel } from '../../components/FormElements'
import { CardFillColorNonFooter, CardFillColorNonFooterShadow } from '../../components/Cards'
// import { ModalButton, ModalCard } from '../../components/Modals'
// import { TablesStriped } from '../../components/Tables'
import { faPencil, faTrash, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily'

const {TablesStriped} = lazily(()=>import('../../components/Tables'));
const {ModalButton, ModalCard} = lazily(()=>import('../../components/Modals'));

const Location = () => {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dataTable = {
      thead:['ชื่อสถานที่','',''],
      tbody:[
          ['A', <ModalButton text="จัดการสมาชิก" setModalShow={setShowModal} classBtn="btn btn-info text-white"/>
            ,<div className="flex justify-center gap-2">
                <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
                <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
            </div>
          ]
      ]
  }
  const dataTableModal = {
      thead:['ชื่อห้อง', ''],
      tbody:[
          [
              'A1',
              
              <div className="flex justify-center gap-2">
                  <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
                  <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
              </div>
          ]
      ]
  }

  const Modal = {
      mHead: (
          <>
              <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faUsersGear}/> จัดการสถานที่</h1>
          </>
      ),
      mBody: (
          <>
              <InputGroupWithLabel  label="ห้อง" />
              <div className="flex justify-end">
                  <button className="btn btn-outline-success w-1/4">เพิ่ม</button>
              </div>
              <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<TablesStriped data={dataTableModal} id="_table2"/>}/>
          </>
      )
  }
  const callback_name = ({target:{value}})=>{
      setName(value)
  }
  const contentBody = (
      <>
          <div className="container-fluid">
              <h1 className="text-xl"><FontAwesomeIcon icon={faUsersGear}/> จัดการสถานที่</h1>
              <hr />
              <div className="row">
                  <div className="col-md-6 col-12">
                      <InputGroupWithLabel id="name" label="ชื่อสถานที่" type="text" callback={callback_name}/>
                  </div>
              </div>
              <div className="flex justify-end">
                  <button className="btn btn-outline-primary w-1/3">บันทึก</button>
              </div>
              <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<TablesStriped data={dataTable} id="_table1"/>}/>
          </div>
      </>
  )
  return (
      <>
        <Suspense fallback={<Skeleton/>}>
            <CardFillColorNonFooter contentBody={contentBody}/>
            <ModalCard modalShow={showModal} setModalShow={setShowModal} modalBody={Modal.mBody} modalHead={Modal.mHead}/>
        </Suspense>
         
      </>
  )
}

export default Location