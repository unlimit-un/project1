import React, { Suspense, useEffect, useState, useTransition } from 'react'
import { InputGroupWithLabel, SelectOptionWithLabel } from '../../components/FormElements'
import { CardFillColorNonFooter, CardFillColorNonFooterShadow } from '../../components/Cards'
// import { ModalButton, ModalCard } from '../../components/Modals'
import { faArrowCircleLeft, faGears, faPencil, faPlus, faSave, faTrash, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Skeleton, Spiner } from '../../components/Loading'
import { lazily } from 'react-lazily'
import { EditDelete } from '../../components/EditDelete'
// import { MuiTable } from '../../components/Tables'

const {MuiTable} = lazily(()=>import('../../components/Tables'));
const {ModalButton, ModalCard} = lazily(()=>import('../../components/Modals'));

const Location = () => {
    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [modal, setModal] = useState({
        mHead: (<></>),
        mBody: (<></>)
    })
    
    const [dataTable, setDataTable] = useState({
        data:[
            {name:"A",time_reg: "2022-05-23",
                ED:<EditDelete EditFnc={()=>{setModalToEditLocation(setModal)}} setModalShow={setShowModal} />,
                room:<ModalButton 
                        text="จัดการห้อง" 
                        setModalShow={setShowModal} 
                        callback={()=>setModalToRoom(setModal, setShowModal)} 
                        classBtn="btn btn-outline-primary" 
                    />
            }
          ],
          columns:[
            {title:"",field:"ED"},
            {title:"ชื่อสถานที่",field:"name"},
            {title:"วันที่เพิ่มข้อมูล",field:"time_reg"},
            {title:"",field:"room"}
          ]
    })

    const TestAddData = () =>{
        setDataTable({
            ...dataTable,
            data:[...dataTable.data,
                {
                    name:"B",time_reg: "2022-05-25",
                    ED:<EditDelete EditFnc={()=>{setModalToEditLocation(setModal)}} setModalShow={setShowModal} />,
                    room:<ModalButton 
                            text="จัดการห้อง" 
                            setModalShow={setShowModal} 
                            callback={()=>setModalToRoom(setModal, setShowModal)} 
                            classBtn="btn btn-outline-primary" 
                    />
                },
            ]
        })
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
                    <button className="btn btn-success w-1/3" onClick={()=>{TestAddData()}}><FontAwesomeIcon icon={faSave}/> บันทึก</button>
                </div>
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={ <Suspense fallback={<Skeleton/>}><MuiTable data={dataTable.data} columns={dataTable.columns} title="ตารางสถานที่"/> </Suspense>}/>
          </div>
      </>
  )
  return (
    <>   
        <Suspense>
            <CardFillColorNonFooter contentBody={contentBody}/>
            <ModalCard modalShow={showModal} setModalShow={setShowModal} modalBody={modal.mBody} modalHead={modal.mHead}/>
        </Suspense>
    </>
  )
}



const setModalToRoom = (setModal, setModalShow, fromRoom = false) =>{
    
    const dataTableModal = {
        data:[
            {room:"A1",ED:<EditDelete 
            EditFnc={
                ()=>{
                    setModalToEditRoom(setModal, setModalShow)
                }
            } setModalShow={setModalShow} />, location:"ตึก A", time_reg:"2022-02-02 15:32:05"}
        ],
        columns:[
            {title:"",field:"ED"},
            {title:"ชื่อห้อง",field:"room"},
            {title:"สถานที่",field:"location"},
            {title:"วันที่เพิ่มข้อมูล",field:"time_reg"},
        ]

    }
    
    if(fromRoom){
        setModal({
            mHead: (
                <>
                    <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPencil}/> จัดการห้อง</h1>
                </>
            ),
            mBody: (
                <>
                    <Skeleton/>
                </>
            )
        })
        setTimeout(() => {
            setModal({
                mHead: (
                    <>
                        <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faGears}/> จัดการห้อง</h1>
                    </>
                ),
                mBody: (
                    <>
                        <InputGroupWithLabel  label="ห้อง" />
                        <div className="flex justify-end">
                            <button className="btn btn-success w-1/4"><FontAwesomeIcon icon={faSave}/> บันทึก</button>
                        </div>
                        <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<Suspense fallback={<Skeleton/>}><MuiTable data={dataTableModal.data} columns={dataTableModal.columns} title="ตารางห้อง"/></Suspense>}/>
                        
                    </>
                )
            })
        }, 1000);
    }else{
        setModal({
            mHead: (
                <>
                    <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faGears}/> จัดการห้อง</h1>
                </>
            ),
            mBody: (
                <>
                    <InputGroupWithLabel  label="ห้อง" />
                    <div className="flex justify-end">
                        <button className="btn btn-success w-1/4"><FontAwesomeIcon icon={faSave}/> บันทึก</button>
                    </div>
                    <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<Suspense fallback={<Skeleton/>}><MuiTable data={dataTableModal.data} columns={dataTableModal.columns} title="ตารางห้อง"/></Suspense>}/>
                    
                </>
            )
        })
    }
}

const setModalToEditLocation = (setModal) =>{
    
    setModal({
        mHead: (
            <>
                <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPencil}/> แก้ไขสถานที่</h1>
            </>
        ),
        mBody: (
            <>
                <InputGroupWithLabel  label="สถานที่" defaultValue={"ตึก A"}/>
                <div className="flex justify-end">
                    <button className="btn btn-outline-warning w-1/4"><FontAwesomeIcon icon={faSave}/> ยืนยันการแก้ไข</button>
                </div>
            </>
        )
    })
}

const setModalToEditRoom = (setModal, setModalShow) =>{
    setModal({
        mHead: (
            <>
                <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPencil}/> แก้ไขห้อง</h1>
            </>
        ),
        mBody: (
            <>
                <Skeleton/>
            </>
        )
    })
    setTimeout(() => {
        setModal({
            mHead: (
                <>
                    <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPencil}/> แก้ไขห้อง</h1>
                </>
            ),
            mBody: (
                <>
                    <ModalButton classBtn="text-danger" text="ย้อนกลับ" icon={faArrowCircleLeft} setModalShow={setModalShow} callback={()=>{setModalToRoom(setModal, setModalShow, true)}}/>
                    <InputGroupWithLabel  label="ห้อง" defaultValue={"A202"}/>
                    <div className="flex justify-end">
                        <button className="btn btn-outline-warning w-1/4"><FontAwesomeIcon icon={faSave}/> ยืนยันการแก้ไข</button>
                    </div>
                </>
            )
        })
    }, 1000);
}
export default Location