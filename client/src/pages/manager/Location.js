import React, { Suspense, useState } from 'react'
import { InputGroupWithLabel, SelectOptionWithLabel } from '../../components/FormElements'
// import { CardFillColorNonFooter, CardFillColorNonFooterShadow } from '../../components/Cards'
// import { ModalButton, ModalCard } from '../../components/Modals'
import { faPencil, faTrash, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily'
import EditDelete from '../../components/EditDelete'
// import { MuiTable } from '../../components/Tables'

const {MuiTable} = lazily(()=>import('../../components/Tables'));
const {ModalButton, ModalCard} = lazily(()=>import('../../components/Modals'));
const {CardFillColorNonFooter, CardFillColorNonFooterShadow} = lazily(()=>import('../../components/Cards'));

const Location = () => {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dataTable = {
      data:[
        {name:"A",ED:<EditDelete/>,view:<ModalButton text="จัดการสมาชิก" setModalShow={setShowModal} classBtn="btn btn-info text-white"/>}
      ],
      columns:[
        {title:"ชื่อสถานที่",field:"name"},
        {title:"",field:"ED"},
        {title:"",field:"view"}
      ]
  }
  const dataTableModal = {
      data:[
        {names:"A1",ED:<EditDelete/>}
      ],
      columns:[
        {title:"ชื่อห้อง",field:"names"},
        {title:"",field:"ED"}
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
              <Suspense fallback={<Skeleton/>}>
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<MuiTable data={dataTableModal.data} columns={dataTableModal.columns} title=""/>}/>
              </Suspense>
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
              <Suspense fallback={<Skeleton/>}>
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<MuiTable data={dataTable.data} columns={dataTable.columns} title=""/>}/>
              </Suspense>
              
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