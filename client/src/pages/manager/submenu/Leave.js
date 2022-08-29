import { faPencil, faSave, faTrash, faUserPlus, faEye, faCopy, faClapperboard, faClipboardCheck, faFileAlt, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Suspense, useState,useEffect,useRef } from 'react'
import { lazily } from 'react-lazily';
import Swal from 'sweetalert2';
import { EditDelete } from '../../../components/EditDelete';
import { InputGroupWithLabel, SelectOptionWithLabel, TextAreawithlabel } from '../../../components/FormElements';
import { Skeleton } from '../../../components/Loading';
import { ModalCard, ModalButton, ModalCardConfirm } from '../../../components/Modals';
import { deleteLeave, deleteLeaveType, getLeaveById, getLeaveByManagerIdStatusConsidered, getLeaveByManagerIdStatusWaiting, getLeaveTypeById, getLeaveTypeByManagerId, insertLeaveType, updateLeave, updateLeaveToConsidered, updateLeaveType } from '../../../controllers/manager/LeaveController';
import { getLeaveByManagerId, getTotalLeaveByManagerId, getTotalLeaveByManagerIdGroupByType } from '../../../controllers/manager/RequestController';
import { convertTZ } from '../../../functions/ConvertDate';
const {MuiTable} = lazily(()=>import('../../../components/Tables'));
const {CardFillColorNonFooter} = lazily(()=>import('../../../components/Cards'));

export const LeaveType = () => {

    const refLeaveTypeName = useRef(null)
    const refLeaveTypeNameModal = useRef(null)

    const [dataTableLeaveType, setDataTableLeaveType] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [leaveTypeDataModal, setLeaveTypeDataModal] = useState({
        leave_type_name: '',
        leave_type_id: ''
    })

    const loadData = async () =>{
        const leaveTypeList = await getLeaveTypeByManagerId();

        setDataTableLeaveType(leaveTypeList)
    }

    useEffect(()=>{
        loadData()
    },[])

    const showModalEdit = async (leave_type_id) =>{
        const [leaveTypeData] = await getLeaveTypeById(leave_type_id)
        setLeaveTypeDataModal({leave_type_id: leaveTypeData['leave_type_id'], leave_type_name: leaveTypeData['leave_type_name']})
    }

    const reState = () =>{
        refLeaveTypeName.current.value = ''
        loadData()
    }
   
    const initial = {
        data: [
            ...dataTableLeaveType.map(item=>{
                return {
                    leave_type_name: item['leave_type_name'],
                    time_reg: convertTZ.getFullDate(item['time_reg']),
                    ED: <EditDelete
                        DeleteFnc={async()=>{if(await deleteLeaveType({leave_type_id: item['leave_type_id']})) reState()}}
                        EditFnc={()=>{showModalEdit(item['leave_type_id'])}}
                        setModalShow={setModalShow}
                    />
                }
            })
        ],
        columns: [
            {title: "ประเภทการลา",field: "leave_type_name"},
            {title: "วันที่เพิ่มข้อมูล",field: "time_reg"},
            {title: "",field: "ED"}
        ]
    } 

    const tableForm = (
        <div className="container-fluid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={initial.data} columns={initial.columns} title=""/>
            </Suspense>
        </div>
    )

    const modal = {
        mHead:<h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPencil}/>แก้ไขข้อมูลประเภทการลา</h1>,
        mBody:(
            <>
                <div className="row">
                    <div className="col-12">
                        <InputGroupWithLabel key={leaveTypeDataModal.leave_type_name} defaultValue={leaveTypeDataModal.leave_type_name} ref={refLeaveTypeNameModal} placeholder="ประเภทการลา" label="ประเภทการลา" id="leave_type_name_modal"/>
                    </div>
                </div>
            </>
        )
    }
    
    const template = (
        <div className="flex justify-content flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-lg m-0"><FontAwesomeIcon icon={faFileAlt}/> ประเภทการลา</h2>
            </div>
            <hr />
            <div className="flex flex-col gap-2 max-h-screen overflow-auto">
                <div className="container-fluid">
                    <form onSubmit={ async e =>{
                        e.preventDefault()
                        if(await insertLeaveType({leave_type_name: refLeaveTypeName.current.value})) 
                            reState();
                    }}>
                        <div className="row">
                            <div className="col-md-4 col-12">
                                <InputGroupWithLabel ref={refLeaveTypeName} id="input_leave_type" label="ประเภทการลา" type="text" placeholder="ประเภทการลา" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="btn btn-success w-1/4" ><FontAwesomeIcon icon={faSave}/> บันทึก</button>
                        </div>
                    </form>
                    <div className="mt-3">
                        <Suspense fallback={<Skeleton/>}>
                            <CardFillColorNonFooter contentBody={tableForm}/>
                        </Suspense>
                        
                    </div>
                </div>
            </div>
        </div> 
    )   

    return(
        <>
            <Suspense fallback={<Skeleton/>}>
                <CardFillColorNonFooter contentBody={template} />
            </Suspense>
            <ModalCardConfirm
                confrimCallback={async()=>{
                    const formData={
                        ...leaveTypeDataModal,
                        leave_type_name: refLeaveTypeNameModal.current.value
                    }
                    if(await updateLeaveType(formData)) reState();
                }}
                cancleCallback={reState} hideCallback={reState} modalBody={modal.mBody} modalHead={modal.mHead} modalShow={modalShow} setModalShow={setModalShow}/>
        </>
    )
}

export const Leave = () => {
    
    const [total, setTotal] = useState('');
    const [totalApprove, setTotalApprove] = useState('');
    const [totalDeny, setTotalDeny] = useState('');
    const [totalWaiting, setTotalWaiting] = useState('');
    const [leaveId, setLeaveId] = useState('')

    const [leaveTypeId, setLeaveTypeId] = useState('')
    const [status, setStatus] = useState('')

    const [options, setOptions] = useState({
        leaev_type: []
    })

    const [defaultEdit, setDefaultEdit] = useState({
        leave_code:'',
        leave_type_id:'',
        title:'',
        description:'',
        date_start:'',
        date_end:'',
        status:''
    })
    const [defaultView, setDefaultView] = useState(null)

    const [dataTableLeaveWaiting, setDataTableLeaveWaiting] = useState([]);
    const [dataTableLeaveConsidered, setDataTableLeaveConsidered] = useState([]);

    const [modalShow, setModalShow] = useState(false)
    const [modalShowConsider, setModalShowConsider] = useState(false);
    const [modalShowEdit, setModalShowEdit] = useState(false);

    const refLeaveCode = useRef(null);
    const refTitle = useRef(null);
    const refDateStart = useRef(null);
    const refDateEnd = useRef(null);
    const refDescription = useRef(null);

    const loadData = async () =>{

        const leaveGroupType = await getTotalLeaveByManagerIdGroupByType();
        const [{count: totalLeave}] = await getTotalLeaveByManagerId();
        const leaveConsideredList =  await getLeaveByManagerIdStatusConsidered();
        const leaveWaitingList =  await getLeaveByManagerIdStatusWaiting();

        let positive = 0, negative = 0, bal=0;

        leaveGroupType.forEach(item=>{
            item['type'] === 'positive'? positive +=item['count']: item['type'] === 'negative'?negative += item['count']: bal += item['count']
        })

        setTotal(totalLeave)
        setTotalApprove(positive)
        setTotalDeny(negative)
        setTotalWaiting(bal)
        
        setDataTableLeaveWaiting(leaveWaitingList)
        setDataTableLeaveConsidered(leaveConsideredList)
    }

    useEffect(()=>{
        loadData()
    },[])

    const showEditModal = async (leave_id) =>{
        setLeaveId(leave_id)
        if (options.leaev_type.length <= 0) {
            const optionLeaveType = await getLeaveTypeByManagerId()
            setOptions({
                leaev_type:[
                    {text:'เลือกประเภทการลา', value:''},
                    ...optionLeaveType.map(item=>({text: item['leave_type_name'], value: item['leave_type_id']}))
                ]
            })
        }
        const [leaveData] = await getLeaveById(leave_id);
        
        setDefaultEdit({
            date_end: leaveData['date_end'],
            date_start: leaveData['date_start'],
            description: leaveData['description'],
            title: leaveData['title'],
            leave_code: leaveData['leave_code'],
            leave_type_id: leaveData['leave_type_id'],
            status: leaveData['status'],
        })

        setLeaveTypeId(leaveData['leave_type_id'])
        setStatus(leaveData['status'])
    }

    const showViewModal = async leave_id =>{
        const [leaveData] = await getLeaveById(leave_id);
        
        setDefaultView({...leaveData})
    }

    const reState = () =>{
        setLeaveId('');
        loadData();
    }

    const totalCard =(
        <div className="container-fulid">
             <p className="text-3xl m-0 text-start">{total}</p>
             <p className="text-md m-0 text-end">คำขอทั้งหมด</p>
        </div> 
     )
     const approveCard = (
         <div className="container-fulid">
             <p className="text-3xl m-0 text-start">{totalApprove}</p>
             <p className="text-md m-0 text-end">คำขอที่อนุมัติ</p>
         </div>
     )
     const waitingCard = (
         <div className="container-fulid">
             <p className="text-3xl m-0 text-start">{totalWaiting}</p>
             <p className="text-md m-0 text-end">คำขอที่รออนุมัติ</p>
         </div>
     )
     const denyCard = (
         <div className="container-fulid">
             <p className="text-3xl m-0 text-start">{totalDeny}</p>
             <p className="text-md m-0 text-end">คำขอที่ไม่อนุมัติ</p>
         </div>
     )

    const muiWaiting = {
        data:[
            ...dataTableLeaveWaiting.map(item =>{
                return {
                  checkbox: (
                    <div className="flex gap-2">
                      <ModalButton
                        callback={() => {
                          setLeaveId(item["leave_id"]);
                        }}
                        modalShow={modalShowConsider}
                        setModalShow={setModalShowConsider}
                        classBtn="btn btn-success"
                        icon={faCheck}
                      />
                      <button
                        onClick={async () => {
                            Swal.fire({
                                title: 'ต้องการปฏิเสธใช่หรือไม่',
                                showCancelButton: true,
                                confirmButtonText: 'ใช่',
                                denyButtonText: `ไม่ใช่`,
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    await updateLeaveToConsidered({
                                        leave_id: item["leave_id"],
                                        status: -1,
                                    });
                                    await reState();
                                }
                            })
                        }}
                        className="btn btn-outline-danger"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  ),
                  name: item["requester"],
                  leave_type: item["leave_type_name"],
                  title: item["title"],
                  date_start: item["date_start"],
                  date_end: item["date_end"],
                  status: "รอดำเนินการ",
                  view: (
                    <ModalButton
                        callback={()=>{showViewModal(item['leave_id'])}}
                        modalShow={modalShow}
                        classBtn="btn btn-outline-primary"
                        setModalShow={setModalShow}
                        icon={faEye}
                    />
                  ),
                };
            })
            
        ],
        columns:[
            {title:"",field:"checkbox"},
            {title:"ชื่อ",field:"name"},
            {title:"ประเภทการลา",field:"leave_type"},
            {title:"เรื่อง",field:"title"},
            {title:"เริ่มลาวันที่",field:"date_start"},
            {title:"ถึงวันที่",field:"date_end"},
            {title:"สถานะ",field:"status"},
            {title:"",field:"view"},
        ]
    }

    const muiConsidered = {
        data:[
            ...dataTableLeaveConsidered.map(item =>{
                return {
                    leave_code: item['leave_code'], 
                    name: item['requester'], 
                    leave_type: item['leave_type_name'], 
                    title: item['title'], 
                    date_start: item['date_start'], 
                    date_end: item['date_end'], 
                    status: item['status'], 
                    ED:<EditDelete
                        EditFnc={()=>{showEditModal(item['leave_id'])}}
                        DeleteFnc={async()=>{if(await deleteLeave({leave_id: item['leave_id']})) reState();}}
                        setModalShow={setModalShowEdit}
                    />, 
                    view:<ModalButton classBtn="btn btn-outline-primary" setModalShow={setModalShow} callback={()=>{showViewModal(item['leave_id'])}} icon={faEye}/>
                }
            })
            
        ],
        columns:[
            {title:"",field:"ED"},
            {title:"รหัสการลา",field:"leave_code"},
            {title:"ชื่อ",field:"name"},
            {title:"ประเภทการลา",field:"leave_type"},
            {title:"เรื่อง",field:"title"},
            {title:"เริ่มลาวันที่",field:"date_start"},
            {title:"ถึงวันที่",field:"date_end"},
            {title:"สถานะ",field:"status",
                    lookup:{
                        "0": "รอดำเนินการ", 
                        "1":"ดำเนินการเสร็จสิ้น", 
                        "-1":"ปฏิเสธ",
                    }
            },
            {title:"",field:"view"},
        ]
    }

    const tableWaiting = (
        <div className="container-fluid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={muiWaiting.data} columns={muiWaiting.columns} title="การลาที่รอดำเนินการ"/>
            </Suspense>
        </div>
    )

    const tableLeave = (
        <div className="container-fluid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={muiConsidered.data} columns={muiConsidered.columns} title="การลาทั้งหมด"/>
            </Suspense>
        </div>
    )

    const consideredModal = {
        mHead: (
            <>
                <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCopy}/> พิจารณาคำขอ</h1>
            </>
        ),
        mBody: (
            <>
                <div className="row">
                    <div className="col-12">
                        <InputGroupWithLabel ref={refLeaveCode} placeholder="รหัสการลา" label="รหัสการลา" id="leave_code_modal"/>
                    </div>
                </div>
            </>
        )
    }
    // leave_id	leave_code	leave_type_id	title	description	status	date_start	date_end
    const editModal = {
        mHead: (
            <>
                <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCopy}/> พิจารณาคำขอ</h1>
            </>
        ),
        mBody: (
            <>
                <div className="row">
                    <div className="col-md-4 col-12">
                        <InputGroupWithLabel defaultValue={defaultEdit.leave_code} key={defaultEdit.leave_code} ref={refLeaveCode} placeholder="รหัสการลา" label="รหัสการลา" id="leave_code"/>
                    </div>
                    <div className="col-md-4 col-12">
                        <SelectOptionWithLabel callback={({target:{value}})=>{setLeaveTypeId(value)}} defaultValue={defaultEdit.leave_type_id} key={defaultEdit.leave_type_id} options_arr_obj={options.leaev_type} label="ประเภทการลา" id="leave_type"/>
                    </div>
                    <div className="col-md-4 col-12">
                        <SelectOptionWithLabel callback={({target:{value}})=>{setStatus(value)}} defaultValue={defaultEdit.status} key={defaultEdit.status} options_arr_obj={[{text:'เลือกสถานะ', value:''},{text:'รอดำเนินการ', value:'0'},{text:'อนุมัติ', value:'1'},{text:'ไม่อนุมัติ', value:'-1'},]} label="สถานะ" id="status"/>
                    </div>
                    <div className="col-md-4 col-12">
                        <InputGroupWithLabel defaultValue={defaultEdit.title} key={defaultEdit.title} ref={refTitle} placeholder="หัวข้อ" label="หัวข้อ" id="title"/>
                    </div>
                    <div className="col-md-4 col-12">
                        <InputGroupWithLabel defaultValue={defaultEdit.date_start} key={defaultEdit.date_start}  ref={refDateStart} placeholder="เริ่มวันที่" label="เริ่มวันที่" id="date_start" type="date"/>
                    </div>
                    <div className="col-md-4 col-12">
                        <InputGroupWithLabel defaultValue={defaultEdit.date_end} key={defaultEdit.date_end}  ref={refDateEnd} placeholder="ถึงวันที่" label="ถึงวันที่" id="date_end" type="date"/>
                    </div>
                    <div className="col-md-6 col-12">
                        <TextAreawithlabel defaultValue={defaultEdit.description} key={defaultEdit.description} ref={refDescription} placeholder="รายละเอียด" label="รายละเอียด" id="description"/>
                    </div>
                </div>
            </>
        )
    }
    console.log(!defaultView);
    const Modal = {
        mHead: (
            <>
                <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCopy}/> รายละเอียดการลา</h1>
            </>
        ),
        mBody: (
            <>
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-12">
                        <ul>
                            <li>รหัสการลา</li>
                            <li>ชื่อผู้ร้องขอ</li>
                            <li>แม่บ้าน / ช่าง</li>
                            <li>ประเภทการลา</li>
                            <li>หัวข้อ</li>
                            <li>รายละเอียดการลา</li>
                            <li>ลาวันที่ - ถึงวันที่</li>
                            <li>สถานะ</li>
                            <li>วันที่เพิ่มข้อมูล</li>
                        </ul>
                    </div>
                    <div className="col-lg-9 col-md-8 col-12">
                            {
                                defaultView? 
                                    <ul className="gap-2">
                                        <li>{defaultView['leave_code']}</li>
                                        <li>{defaultView['requester']}</li>
                                        <li>{defaultView['maid_id']?"แม่บ้าน":"ช่างซ่อม"}</li>
                                        <li>{defaultView['leave_type_name']}</li>
                                        <li>{defaultView['title']}</li>
                                        <li>{defaultView['description']}</li>
                                        <li>{`${defaultView['date_start']} ถึง ${defaultView['date_end']}`}</li>
                                        <li className={defaultView['status'] === 0 ? "text-warning": defaultView['status'] === 1? "text-success": "text-danger"}>{defaultView['note']}</li>
                                        <li>{convertTZ.getFullDate(defaultView['time_reg'])}</li>
                                    </ul>:
                                <></>
                            }
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faClipboardCheck}/> จัดการข้อมูลการลาของพนักงาน</h1>
            <div className="container-fluid">
                <div className="row items-stretch gap-y-2">
                    <div className="col-md-3 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            {total  === ''?<Skeleton/>:<CardFillColorNonFooter classBody="bg-blue-400  rounded" contentBody={totalCard} classCard="text-white "/>}
                        </Suspense>
                    </div>
                    <div className="col-md-3 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            {totalApprove === ''?<Skeleton/>:<CardFillColorNonFooter classBody="bg-green-400  rounded" contentBody={approveCard} classCard="text-white "/>}
                            
                        </Suspense>
                    </div>
                    <div className="col-md-3 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            {totalWaiting  === ''?<Skeleton/>:<CardFillColorNonFooter classBody="bg-yellow-400  rounded" contentBody={waitingCard} classCard="text-black "/>}
                            
                        </Suspense>
                    </div>
                    <div className="col-md-3 col-12">
                        <Suspense fallback={<Skeleton/>}>
                            {totalDeny  === ''?<Skeleton/>:<CardFillColorNonFooter classBody="bg-red-400  rounded" contentBody={denyCard} classCard="text-white "/>}
                        </Suspense>
                    </div>
                </div>
                <div className="mt-3">
                    <Suspense fallback={<Skeleton/>}>
                        <CardFillColorNonFooter contentBody={tableWaiting}/>
                    </Suspense>
                </div>
                <div className="mt-3">
                    <Suspense fallback={<Skeleton/>}>
                        <CardFillColorNonFooter contentBody={tableLeave}/>
                    </Suspense>
                </div>
            </div>
            {/* modal */}
            <ModalCard modalShow={modalShow} setModalShow={setModalShow} modalBody={Modal.mBody} modalHead={Modal.mHead}/>
            <ModalCardConfirm 
                confrimCallback={async ()=>{
                    const formData = {
                        leave_code: refLeaveCode.current.value,
                        leave_id: leaveId,
                        status: 1
                    }
                    if(await updateLeaveToConsidered(formData)) await reState()
                }}
                cancleCallback={reState} hideCallback={reState} modalBody={consideredModal.mBody} modalHead={consideredModal.mHead} modalShow={modalShowConsider} setModalShow={setModalShowConsider}/>
            <ModalCardConfirm 
                confrimCallback={async ()=>{
                    const formData = {
                        date_end: refDateEnd.current.value,
                        date_start: refDateStart.current.value,
                        description: refDescription.current.value,
                        title: refTitle.current.value,
                        leave_code: refLeaveCode.current.value,
                        leave_id: leaveId,
                        leave_type_id: leaveTypeId,
                        status: status,
                    }
                    console.log(formData);
                    if(await updateLeave(formData)) await reState()
                }}
                cancleCallback={reState} hideCallback={reState} modalBody={editModal.mBody} modalHead={editModal.mHead} modalShow={modalShowEdit} setModalShow={setModalShowEdit}/>
        </>
    )
}
