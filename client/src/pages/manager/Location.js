import React, { Suspense, useEffect, useRef, useState, useTransition } from 'react'
import { InputGroupWithLabel, SelectOptionWithLabel } from '../../components/FormElements'
import { CardFillColorNonFooter, CardFillColorNonFooterShadow } from '../../components/Cards'
import { ModalButton, ModalCard, ModalCardConfirm } from '../../components/Modals'
import { faArrowCircleLeft, faBuilding, faGears, faPencil, faPlus, faSave, faTrash, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Skeleton, Spiner } from '../../components/Loading'
import { lazily } from 'react-lazily'
import { EditDelete } from '../../components/EditDelete'
import { deleteLocation, deleteRoom, getLocationById, getLocationByManagerId, getRoomById, getRoomByLocationId, insertLocation, insertRoom, updateLocation, updateRoom } from '../../controllers/manager/LocationController'
import { convertTZ } from '../../functions/ConvertDate'
// import { MuiTable } from '../../components/Tables'

const {MuiTable} = lazily(()=>import('../../components/Tables'));

const Location = () => {

    const [defaultLocation, setDefaultLocation] = useState({
        location_name:'',
        location_id: ''
    })
    const [defaultRoom, setDefaultRoom] = useState({
        room_name:'',
        room_id: ''
    })

    const [locationId, setLocationId] = useState('')

    const [showModal, setShowModal] = useState(false);
    const [modalShowRoom, setModalShowRoom] = useState(false);
    const [modalShowRoomEdit, setModalShowRoomEdit] = useState(false);
    
    const [dataTableLocation, setDataTableLocation] = useState([])
    const [dataTableRoom, setDataTableRoom] = useState([])
    
    const refName = useRef();
    const refNameModal = useRef();
    const refRoomName = useRef();
    const refRoomNameEdit = useRef();


    const loadData = async () =>{
        const locationList = await getLocationByManagerId();
        setDataTableLocation(locationList)
    }

    useEffect(()=>{
        loadData();
    },[])

    const showEditModal = async (location_id) =>{
        const [locationData] = await getLocationById(location_id)
        setDefaultLocation({location_name: locationData['location_name'], location_id})
    }

    const showRoomModal = async location_id =>{
        
        const roomData = await getRoomByLocationId(location_id)
        setDataTableRoom(roomData)
    }

    const showEditRoomModal = async room_id =>{
        const [roomData] = await getRoomById(room_id)
        setDefaultRoom({
            room_id: roomData['room_id'],
            room_name: roomData['room_name'],
        })
    }

    const reState = () =>{
        refName.current.value = ''
        loadData();
        if(locationId){
            showRoomModal(locationId)
        }
    }
    
    //set muiTable
    const muiLocation = {
        data:[
            ...dataTableLocation.map(item=>{
                return {
                    ED: <EditDelete
                        EditFnc={()=>{showEditModal(item['location_id'])}}
                        DeleteFnc={async()=>{if(await deleteLocation({location_id: item['location_id']})) reState()}}
                        setModalShow={setShowModal}
                    />,
                    name: item['location_name'],
                    time_reg: convertTZ.getFullDate(item['time_reg']),
                    room: <ModalButton callback={()=>{
                            setLocationId(item['location_id'])
                            showRoomModal(item['location_id'])
                        }} 
                        text="จัดการห้อง" classBtn="btn btn-outline-primary"  modalShow={modalShowRoom} setModalShow={setModalShowRoom}/>
                }
            })
            
          ],
          columns:[
            {title:"",field:"ED"},
            {title:"ชื่อสถานที่",field:"name"},
            {title:"วันที่เพิ่มข้อมูล",field:"time_reg"},
            {title:"",field:"room"}
          ]
    }

    const muiRoom = {
        data:[
            ...dataTableRoom.map(item=>{
                return {
                    ED: <EditDelete
                        EditFnc={()=>{showEditRoomModal(item['room_id']); setModalShowRoom(false)}}
                        DeleteFnc={async ()=> {if (await deleteRoom({room_id: item['room_id']})) reState()}}
                        setModalShow={setModalShowRoomEdit}
                    />,
                    room: item['room_name'],
                    time_reg: convertTZ.getFullDate(item['time_reg'])
                }
            })

        ],
        columns:[
            {title:"",field:"ED"},
            {title:"ชื่อห้อง",field:"room"},
            {title:"วันที่เพิ่มข้อมูล",field:"time_reg"},
        ]
    }
  
    // mui Table
    const tableLocation = (
        <Suspense fallback={<Skeleton/>}>
            <MuiTable data={muiLocation.data} columns={muiLocation.columns} title="ตารางสถานที่"/> 
        </Suspense>
    )

    const tableRoom = (
        <Suspense fallback={<Skeleton/>}>
            <MuiTable data={muiRoom.data} columns={muiRoom.columns} title="ตารางห้อง"/>
        </Suspense>
    )
    
    // modal constructure
    const modal = {
        mHead: <h1 className="text-2xl m-0"><FontAwesomeIcon icon={faPencil}/> แก้ไขสถานที่</h1>,
        mBody: (
            <>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <InputGroupWithLabel key={defaultLocation.location_name} defaultValue={defaultLocation.location_name} ref={refNameModal} id="name_modal" label="ชื่อสถานที่" type="text" placeholder="ชื่อสถานที่"/>
                    </div>
                </div>
            </>
        )
    }

    const modalRoom = {
        mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faGears}/> จัดการห้อง</h1>,
        mBody: (
            <>
                <form onSubmit={async e =>{
                    e.preventDefault();
                    if(await insertRoom({room_name: refRoomName.current.value, location_id: locationId})) reState();
                }}>
                    <InputGroupWithLabel ref={refRoomName} placeholder="ชื่อห้อง" label="ชื่อห้อง" id="room_name" />
                    <div className="flex justify-end">
                        <button className="btn btn-success w-1/4"><FontAwesomeIcon icon={faSave}/> บันทึก</button>
                    </div>
                </form>
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={tableRoom}/>
                
            </>
        )
    }

    const modalRoomEdit = {
        mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPencil}/> แก้ไขห้อง</h1>,
        mBody: (
            <>
                <div className="col-md-6 col-12">
                    <InputGroupWithLabel key={defaultRoom.room_name} defaultValue={defaultRoom.room_name} ref={refRoomNameEdit} placeholder="ชื่อห้อง" label="ชื่อห้อง" id="room_name" />
                </div>
            </>
        )
    }
    return (
        <>   
            
            <h1 className="text-xl"><FontAwesomeIcon icon={faBuilding}/> จัดการสถานที่</h1>
            <hr />
            <form onSubmit={async e=>{
                e.preventDefault()
                if(await insertLocation({location_name: refName.current.value})) reState();
            }}>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <InputGroupWithLabel ref={refName} id="name" label="ชื่อสถานที่" type="text" placeholder="ชื่อสถานที่"/>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="btn btn-success md:w-1/3 w-full"><FontAwesomeIcon icon={faSave}/> บันทึก</button>
                </div>
            </form>
            
            <Suspense>
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={tableLocation}/>
            </Suspense>
            <ModalCardConfirm confrimCallback={async()=>{
                const formData = {
                    location_name: refNameModal.current.value,
                    location_id: defaultLocation.location_id
                }
                if(await updateLocation(formData)) reState(); 
            }} cancleCallback={reState} hideCallback={reState} modalShow={showModal} setModalShow={setShowModal} modalBody={modal.mBody} modalHead={modal.mHead}/>
            <ModalCardConfirm confrimCallback={async()=>{
                const formData = {
                    room_name: refRoomNameEdit.current.value,
                    room_id: defaultRoom.room_id
                }
                if(await updateRoom(formData)) 
                    reState(); 
                    setModalShowRoom(true)
            }} cancleCallback={()=>{reState(); setModalShowRoom(true)}} hideCallback={()=>{reState(); setModalShowRoom(true)}} modalShow={modalShowRoomEdit} setModalShow={setModalShowRoomEdit} modalBody={modalRoomEdit.mBody} modalHead={modalRoomEdit.mHead}/>
            <ModalCard modalBody={modalRoom.mBody} modalHead={modalRoom.mHead} modalShow={modalShowRoom} setModalShow={setModalShowRoom}/>
        </>
    )
}

export default Location