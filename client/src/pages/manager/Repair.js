import { faBell, faCheck, faCopy, faEye,faPencil,faPlus,faTrash, faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { SidebarRightManager } from '../../components/structure/SidebarM'
import { Bandage } from '../../components/Bandage'
import { CardFillColorNonFooter } from '../../components/Cards'
import { ModalCard, ModalButton, ModalCardConfirm } from '../../components/Modals'
// import { TablesStriped } from '../../components/Tables'
import { lazily } from 'react-lazily'
import { Skeleton } from '../../components/Loading'
import { EditDelete } from '../../components/EditDelete'
import { getNotifyRepairByManagerIdStatusWaiting, getTotalNotifyRepairByManagerId, getTotalNotifyRepairByManagerIdAndStatus } from '../../controllers/manager/HomeController'
import { InputGroupWithLabel, SelectOptionWithLabel } from '../../components/FormElements'
import { getMaterialById, getMaterialByManagerId, getRoomByLocationId } from '../../controllers/manager/MaidDutyController'
import { getEngineerByManagerId, getEngineerDeptByManagerId, getLocationByManagerId } from '../../controllers/manager/ManageEmpController'
import { ListGroupFlush } from '../../components/ListGroup'
import Swal from 'sweetalert2'
import { deleteNotifyRepairMaterial, getEngineerByDeptId, getNotifyRepairAndMaterialByNotifyRepairId, getNotifyRepairById, getNotifyRepairByManagerId, getNotifyRepairMaterialByRepairId, insertNotifyRepairMaterial, updateNotifyRepair, updateNotifyRepairToAccept, updateNotifyRepairToDeny } from '../../controllers/manager/ReapairContoller'
import { convertTZ } from '../../functions/ConvertDate'
import { faJava } from '@fortawesome/free-brands-svg-icons'

const {MuiTable} = lazily(()=>import('../../components/Tables'));
// const {CardFillColorNonFooter} = lazily(()=>import('../../components/Cards'));

const Repair = () => {

    const [cardData, setCardData] = useState({
        total:'',
        success:'',
        process:'',
        accept:'',
        waiting:'',
        deny:'',
        unable:'',
        needless:'',
    })

    const [modalShow, setModalShow] = useState(false)
    const [assignModalShow, setAssignModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [modal, setModal] = useState({mHead:<></>,mBody: <></>})
    const [notifyRepairId, setNotifyRepairId] = useState('')
    const [dataTableWaiting, setDataTableWaiting] = useState([])
    const [dataTableHistory, setDataTableHistory] = useState([])
    const [options, setOptions] = useState({
        material_options:[],
        dept_options:[],
    })
    const [inputForm, setInputForm] = useState({
        dept_id: '',
        material_id:''
    })
    const [materialUseList, setMaterialUseList] = useState([])
    const [materialUseListEdit, setMaterialUseListEdit] = useState([])
    const [total, setTotal] = useState('')

    const [optionsLocation, setOptionsLocation] = useState ([]);
    const [optionsRoom, setOptionRoom] = useState ([]);
    const [optionsEngineer, setOptionEngineer] = useState ([]);
    const [inputEditForm, setInputEditForm] = useState({
        location_id: '',
        room_id: '',
        description: '',
        dept_id: '',
        engineer_id: '',
        define_date: '',
        unable_message: '',
        status: '',
        notify_repair_code: '',
        material_id:''
    })
    
    const refInputCode = useRef(null);
    const refInputCount = useRef(null);
    
    const refInputCodeEdit = useRef(null)
    const refInputDescriptionEdit = useRef(null)
    const refInputDefineDateEdit = useRef(null)
    const refInputUnableEdit = useRef(null)
    const refInputCountEdit = useRef(null);
    
    const loadRoom = async (location_id)=>{
        setInputEditForm({...inputEditForm, room_id: ''})
        const repairRoom = await getRoomByLocationId (location_id)
        setOptionRoom ([{value:'',text:'กรุณาเลือกข้อมูล'},...repairRoom.map(item=>{
          return{value:item['room_id'],text:`${item['room_name']}`}
        })])
    }

    const loadEngineer = async (dept_id)=>{
        setInputEditForm({...inputEditForm, engineer_id: ''})
        const engineer = await getEngineerByDeptId(dept_id)
        setOptionEngineer ([{value:'',text:'กรุณาเลือกข้อมูล'},...engineer.map(item=>{
          return{value:item['engineer_id'],text:`${item['engineer_code']}-${item['engineer_name']}`}
        })])
    }

    const loadData = async () =>{
        const [{count_notify: total}] = await getTotalNotifyRepairByManagerId();
        const [{count_notify: success}]= await getTotalNotifyRepairByManagerIdAndStatus(3);
        const [{count_notify: process}]= await getTotalNotifyRepairByManagerIdAndStatus(2);
        const [{count_notify: accept}]= await getTotalNotifyRepairByManagerIdAndStatus(1);
        const [{count_notify: waiting}]= await getTotalNotifyRepairByManagerIdAndStatus(0);
        const [{count_notify: deny}]= await getTotalNotifyRepairByManagerIdAndStatus(-1);
        const [{count_notify: unable}] = await getTotalNotifyRepairByManagerIdAndStatus(-2);
        const [{count_notify: needless}]= await getTotalNotifyRepairByManagerIdAndStatus(-3);

        const notifyRepairByManagerIdStatusWaiting = await getNotifyRepairByManagerIdStatusWaiting();
        const notifyRepairByManagerId = await getNotifyRepairByManagerId();

        setCardData({total, success, process, accept, deny, needless, unable, waiting})
        setDataTableWaiting(notifyRepairByManagerIdStatusWaiting)
        setDataTableHistory(notifyRepairByManagerId)
    }

    useEffect(()=>{
        loadData();
    },[])

    const totalCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">ทั้งหมด</p>
            <div className="text-end">
                <p className="text-3xl m-0">{cardData.total}</p>
                <p className="text-md m-0">รายการ</p>
            </div>
        </div>
        
    )
    const successCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">ดำเนินการเสร็จสิ้น</p>
            <div className="text-end">
                <p className="text-3xl m-0">{cardData.success}</p>
                <p className="text-md m-0">รายการ</p>
            </div>
        </div>
    )
    const processCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">กำลังดำเนินการ</p>
            <div className="text-end">
                <p className="text-3xl m-0">{cardData.process}</p>
                <p className="text-md m-0">รายการ</p>
            </div>
        </div>
    )
    const waitingCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">รอดำเนินการ</p>
            <div className="text-end">
                <p className="text-3xl m-0">{cardData.waiting}</p>
                <p className="text-md m-0">รายการ</p>
            </div>
        </div>
    )
    const acceptCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">ผ่านการอนุมัติ</p>
            <div className="text-end">
                <p className="text-3xl m-0">{cardData.accept}</p>
                <p className="text-md m-0">รายการ</p>
            </div>
        </div>
    )
    const denyCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">ไม่ผ่านการอนุมัติ</p>
            <div className="text-end">
                <p className="text-3xl m-0">{cardData.deny}</p>
                <p className="text-md m-0">รายการ</p>
            </div>
        </div>
    )
    const unableCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">ไม่สามารถซ่อมได้</p>
            <div className="text-end">
                <p className="text-3xl m-0">{cardData.unable}</p>
                <p className="text-md m-0">รายการ</p>
            </div>
        </div>
    )
    const needlessCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">ไม่ต้องการ</p>
            <div className="text-end">
                <p className="text-3xl m-0">{cardData.needless}</p>
                <p className="text-md m-0">รายการ</p>
            </div>
        </div>
    )

    const handleView = async (notify_repair_id) =>{
        const notifyRepairById = await getNotifyRepairAndMaterialByNotifyRepairId(notify_repair_id);
        const status = +notifyRepairById[0]['status'] === 0 ?"text-warning":
                        +notifyRepairById[0]['status'] > 0 ? "text-success": "text-danger"
        setModal({
            mHead: (
                <>
                    <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCopy}/> รายละเอียดการแจ้งซ่อม</h1>
                </>
            ),
            mBody: (
                <>
                    
                    <div className="container-fluid">
                        <ul className= "row">
                            <li className="col-lg-3 col-md-4 col-12">รหัสการซ่อม</li>
                            <li className="col-lg-9 col-md-8 col-12">{notifyRepairById[0]['notify_repair_code']}</li>
                            <li className="col-lg-3 col-md-4 col-12">ปัญหา</li>
                            <li className="col-lg-9 col-md-8 col-12">{notifyRepairById[0]['description']}</li>
                            <li className="col-lg-3 col-md-4 col-12">ผู้แจ้ง</li>
                            <li className="col-lg-9 col-md-8 col-12">{notifyRepairById[0]['reporter']}</li>
                            <li className="col-lg-3 col-md-4 col-12">วันที่แจ้ง</li>
                            <li className="col-lg-9 col-md-8 col-12">{notifyRepairById[0]['notify_repair_date']}</li>
                            <li className="col-lg-3 col-md-4 col-12">สถานที่</li>
                            <li className="col-lg-9 col-md-8 col-12">{notifyRepairById[0]['location_name']}</li>
                            <li className="col-lg-3 col-md-4 col-12">ห้อง</li>
                            <li className="col-lg-9 col-md-8 col-12">{notifyRepairById[0]['room_name']}</li>
                            <li className="col-lg-3 col-md-4 col-12">สถานะ</li>
                            <li className={`col-lg-9 col-md-8 col-12 ${status}`}>{notifyRepairById[0]['note']}</li>
                            <li className="col-lg-3 col-md-4 col-12">แผนกช่าง</li>
                            <li className="col-lg-9 col-md-8 col-12">{notifyRepairById[0]['dept_name']}</li>
                            <li className="col-lg-3 col-md-4 col-12">ช่างที่รับงาน</li>
                            <li className="col-lg-9 col-md-8 col-12">{notifyRepairById[0]['engineer_name']}</li>
                            <li className="col-lg-3 col-md-4 col-12">กำหนดระยะเวลาโดยช่าง</li>
                            <li className="col-lg-9 col-md-8 col-12">{notifyRepairById[0]['define_date_by_engineer']}</li>
                            <li className="col-lg-3 col-md-4 col-12">ข้อความจากช่าง</li>
                            <li className="col-lg-9 col-md-8 col-12">{notifyRepairById[0]['unable_message']}</li>
                            <li className="col-lg-3 col-md-4 col-12">วันที่เพิ่มข้อมูล</li>
                            <li className="col-lg-9 col-md-8 col-12">{convertTZ.getFullDate(notifyRepairById[0]['time_reg'])}</li>
                            <li className="col-lg-3 col-md-4 col-12">ข้อมูลแก้ไขเมื่อ</li>
                            <li className="col-lg-9 col-md-8 col-12">{convertTZ.getFullDate(notifyRepairById[0]['update_at'])}</li>
                        </ul>
                        <div className="mt-3">
                            <CardFillColorNonFooter contentBody={(
                                <>
                                    <h1 className="m-0 text-lg">ตารางวัสดุครุภัณฑ์ที่ใช้ในการซ่อม</h1>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>รหัส</th>
                                                <th>ชื่อ</th>
                                                <th>จำนวน</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                notifyRepairById.length !== 0 ? notifyRepairById.map((item, i)=>{
                                                    return (
                                                        <tr key={'notifyRepairById'+i}>
                                                            <td>{item['material_code']}</td>
                                                            <td>{item['material_name']}</td>
                                                            <td>{item['material_count']}</td>
                                                        </tr>
                                                    )
                                                }):<></>
                                            }
                                        </tbody>
                                    </table>
                                </>
                            )}/>
                        </div>
                    </div>
                </>
            )
        })
    }

    const MuiTableData = {
        data:[
            ...dataTableWaiting.map(item=>{
                return {
                    checkbox: <div className="flex gap-2">
                        <ModalButton callback={()=>{showAssignModal(item['notify_repair_id'])}} classBtn="btn btn-success" icon={faCheck} modalShow={assignModalShow} setModalShow={setAssignModalShow}/>
                        <button className="btn btn-outline-danger" onClick={async ()=>{if(await updateNotifyRepairToDeny({notify_repair_id: item['notify_repair_id']})) await reState()}}><FontAwesomeIcon icon={faXmark}/></button>
                    </div>,
                    issue: item['description'], 
                    notify_person: item['reporter'], 
                    date: item['notify_repair_date'], 
                    location: item['location_name'], 
                    room: item['room_name'], 
                    status:"รอดำเนินการ"
                }
            })
        ],
        columns: [
            {title: "",field: "checkbox", },
            {title: "ปัญหา",field: "issue", },
            {title: "ผู้แจ้ง",field: "notify_person",},
            {title: "วันที่แจ้ง",field: "date",},
            {title: "สถานที่",field: "location", },
            {title: "ห้อง",field: "room", },
            {title: "สถานะ",field: "status"},
        ]
    }

    const MuiTableDataHistory = {
        data:[
            ...dataTableHistory.map(item=>{
                return {
                    issue: item['description'], 
                    notify_person: item['reporter'], 
                    date: item['notify_repair_date'], 
                    location: item['location_name'], 
                    room: item['room_name'], 
                    status: item['status'], 
                    update_at: convertTZ.getFullDate(item['update_at']), 
                    view:<ModalButton callback={()=>{handleView(item['notify_repair_id'])}} classBtn="btn btn-outline-primary" setModalShow={setModalShow} icon={faEye}/>,
                    ED:<EditDelete
                        EditFnc={()=>{showEditModal(item['notify_repair_id'])}}
                        DeleteFnc={()=>{}}
                        setModalShow={setEditModalShow}
                    />
                }
            })
        ],
        columns: [
            {title: "ปัญหา",field: "issue", },
            {title: "ผู้แจ้ง",field: "notify_person",},
            {title: "วันที่แจ้ง",field: "date",},
            {title: "สถานที่",field: "location", },
            {title: "ห้อง",field: "room", },
            {title: "สถานะ",field: "status", 
                lookup:{
                    "0": "รอดำเนินการ", 
                    "1": "ผ่านการอนุมัติ",
                    "2":"กำลังดำเนินการซ่อม",
                    "3":"ดำเนินการเสร็จสิ้น", 
                    "-1":"ปฏิเสธ",
                    "-2":"ไม่สามารถดำเนินการได้",
                    "-3":"ไม่ต้องการดำเนินการ",
                }
            },
            {title: "ข้อมูลเมื่อ",field: "update_at"},
            {title: "",field: "view"},
            {title: "",field: "ED"},
        ]
    }


    const loadTotalMaterial = async (material_id) =>{
        
        if (inputForm.material_id) {
            const [{material_quantity, material_using}] = await getMaterialById(inputForm.material_id)
            setTotal(material_quantity- +refInputCount.current.value - material_using < 0 ? 'วัสดุไม่เพียงพอ':material_quantity- +refInputCount.current.value - material_using)
        }

        if (material_id) {
            const [{material_quantity, material_using}] = await getMaterialById(material_id)
            setTotal(material_quantity- +refInputCount.current.value - material_using < 0 ? 'วัสดุไม่เพียงพอ':material_quantity- +refInputCount.current.value - material_using)
        }

        if (material_id === '') {
            setTotal('')
        }
    }
    const loadTotalMaterialEdit = async (material_id) =>{
        
        if (inputEditForm.material_id) {
            const [{material_quantity, material_using}] = await getMaterialById(inputEditForm.material_id)
            setTotal(material_quantity- +refInputCountEdit.current.value - material_using < 0 ? 'วัสดุไม่เพียงพอ':material_quantity- +refInputCountEdit.current.value - material_using)
        }

        if (material_id) {
            const [{material_quantity, material_using}] = await getMaterialById(material_id)
            setTotal(material_quantity- +refInputCountEdit.current.value - material_using < 0 ? 'วัสดุไม่เพียงพอ':material_quantity- +refInputCountEdit.current.value - material_using)
        }

        if (material_id === '') {
            setTotal('')
        }
    }

   

    const showAssignModal = async (notify_repair_id) =>{
        setNotifyRepairId(notify_repair_id)
        if (options.dept_options.length === 0 || options.material_options.length === 0) {
            const materialByManagerId = await getMaterialByManagerId();
            const engineerDeptBtManagerId = await getEngineerDeptByManagerId();
            setOptions({
                dept_options: [{text: 'เลือกวัสดุครุภัณ์', value: ''}, 
                        ...engineerDeptBtManagerId.map(item=> {return {text: item['dept_name'], value:item['dept_id']}}),
                    ],
                material_options: [{text: 'เลือกวัสดุครุภัณฑ์', value: ''}, 
                        ...materialByManagerId.map(item=> {return {text:`${item['material_code']}-${item['material_name']}`, value:item['material_id']}}),
                    ]
            })
        }
    }

    const showEditModal = async (notify_repair_id) =>{
        setNotifyRepairId(notify_repair_id)
        if (options.dept_options.length === 0 || options.material_options.length === 0 || optionsLocation.length === 0 || optionsEngineer.length ===0) {
            const materialByManagerId = await getMaterialByManagerId();
            const engineerDeptBtManagerId = await getEngineerDeptByManagerId();
            const location = await getLocationByManagerId ()
            
            setOptions({
                dept_options: [{text: 'เลือกวัสดุครุภัณ์', value: ''}, 
                        ...engineerDeptBtManagerId.map(item=> {return {text: item['dept_name'], value:item['dept_id']}}),
                    ],
                material_options: [{text: 'เลือกวัสดุครุภัณฑ์', value: ''}, 
                        ...materialByManagerId.map(item=> {return {text:`${item['material_code']}-${item['material_name']}`, value:item['material_id']}}),
                    ]
            })
            setOptionsLocation ([{value:'',text:'กรุณาเลือกสถานที่'},...location.map(item=>{
                return{value:item['location_id'],text:`${item['location_name']}`}
            })])
            
            
        }
        const [notifyRepairById] = await getNotifyRepairById(notify_repair_id);
        const repairRoom = await getRoomByLocationId (notifyRepairById['location_id'])
        const engineer = await getEngineerByManagerId();
        const notify_material = await getNotifyRepairMaterialByRepairId(notify_repair_id)

        setMaterialUseListEdit(notify_material)
        setOptionEngineer ([{value:'',text:'กรุณาเลือกช่างซ่อม'},...engineer.map(item=>{
            return{value:item['engineer_id'],text:`${item['engineer_code']}-${item['engineer_name']}`}
        })])
        
        setOptionRoom ([{value:'',text:'กรุณาเลือกข้อมูล'},...repairRoom.map(item=>{
            return{value:item['room_id'],text:`${item['room_name']}`}
        })])
        setInputEditForm({
            define_date: notifyRepairById['define_date_by_engineer'],
            dept_id: notifyRepairById['engineer_dept_id'],
            description: notifyRepairById['description'],
            engineer_id: notifyRepairById['engineer_id'],
            location_id: notifyRepairById['location_id'],
            room_id: notifyRepairById['room_id'],
            status: notifyRepairById['status'],
            unable_message: notifyRepairById['unable_message'],
            notify_repair_code: notifyRepairById['notify_repair_code'],
        })
    }

    const reState = () =>{
        setInputForm({
            dept_id: '',
            material_id:''
        })
        setInputEditForm({
            location_id: '',
            room_id: '',
            description: '',
            dept_id: '',
            engineer_id: '',
            define_date: '',
            unable_message: '',
            status: '',
            notify_repair_code: '',
        })
        setNotifyRepairId('')
        setMaterialUseList([])
        setTotal('')
        loadData()
    }

    const checkAddButton = () =>{
        const [{text}] = options.material_options.filter(item=>{
            if(item['value'] === +inputForm.material_id) {
                return item.text
            }
        })
        let checkUnique = true
        if (materialUseList.length>0) {
            checkUnique = materialUseList.every(item=>{
                
                if (item.material_id === inputForm.material_id) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                        icon: 'info',
                        title: 'วัสดุครุภัณฑ์ซ้ำ'
                    })
                    return false
                }else{
                    return true
                }
            })
        }

        let checkTotal = true
        if (isNaN(+total)) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                icon: 'info',
                title: 'จำนวนวัสดุครุภัณฑ์ไม่เพียงพอ'
            })
            checkTotal = false
        }

        if (!refInputCount.current.value || isNaN(+refInputCount.current.value)) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                icon: 'info',
                title: 'ใส่จำนวนเป็นตัวเลข'
            })
        }

        if (checkUnique && checkTotal && refInputCount.current.value) {
            setMaterialUseList([...materialUseList,
                {
                    material_code_name: text,
                    material_id: inputForm.material_id,
                    material_count: refInputCount.current.value,
                }
            ])
        }
    }

    const checkAddButtonEdit = () =>{
        const [{text}] = options.material_options.filter(item=>{
            if(item['value'] === +inputEditForm.material_id) {
                return item.text
            }
        })
        let checkUnique = true
        if (materialUseListEdit.length>0) {
            checkUnique = materialUseListEdit.every(item=>{
                console.log(item);
                if (+item.material_id === +inputEditForm.material_id) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                        icon: 'info',
                        title: 'วัสดุครุภัณฑ์ซ้ำ'
                    })
                    return false
                }else{
                    return true
                }
            })
        }

        let checkTotal = true
        if (isNaN(+total)) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                icon: 'info',
                title: 'จำนวนวัสดุครุภัณฑ์ไม่เพียงพอ'
            })
            checkTotal = false
        }

        if (!refInputCountEdit.current.value || isNaN(+refInputCountEdit.current.value)) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                icon: 'info',
                title: 'ใส่จำนวนเป็นตัวเลข'
            })
        }

        if (checkUnique && checkTotal && refInputCountEdit.current.value) {
            (async ()=>{
                const formData = {
                    notify_repair_id: notifyRepairId,
                    material_id: inputEditForm.material_id,
                    material_count: refInputCountEdit.current.value
                }
                if (await insertNotifyRepairMaterial(formData)) {
                    
                    setMaterialUseListEdit([...materialUseListEdit,
                        {
                            material_code: text.split('-')[0],
                            material_name: text.split('-')[1],
                            material_id: inputEditForm.material_id,
                            material_count: refInputCountEdit.current.value,
                        }
                    ])
                }
            })()
        }
    }
    
    const tableWaiting = (
        <div className="container-fluid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={MuiTableData.data} columns={MuiTableData.columns} title="ตารางแจ้งซ่อมที่รอดำเนินการ"/>
            </Suspense>
        </div>
    )

    const tableHistory = (
        <div className="container-fluid">
            <Suspense fallback={<Skeleton/>}>
                <MuiTable data={MuiTableDataHistory.data} columns={MuiTableDataHistory.columns} title="ตารางแจ้งซ่อมทั้งหมด"/>
            </Suspense>
        </div>
    )

    const assignModal = {
        mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPlus}/> มอบหมายงานให้แผนกช่าง</h1>,
        mBody:(
            !(options.dept_options.length === 0 || options.material_options.length)?<Skeleton/>:
            <>
                <div className="row">
                    <div className="col-md-4 col-12">
                        <InputGroupWithLabel label="รหัสการซ่อม" placeholder="รหัสการซ่อม" ref={refInputCode}/>
                    </div>
                    <div className="col-md-4 col-12">
                        <SelectOptionWithLabel key="dept_select" label="แจ้งไปยังแผนกช่าง" options_arr_obj={options.dept_options} callback={({target:{value}})=>{ setInputForm({...inputForm, dept_id:value})}}/>
                    </div>
                    <div className="col-md-4 col-12">
                        <SelectOptionWithLabel key="material_select" label="วัสดุครุภัณฑ์" options_arr_obj={options.material_options} callback={({target:{value}})=>{ setInputForm({...inputForm, material_id:value}); loadTotalMaterial(value);}}/>
                    </div>
                    <div className="col-md-4 col-12">
                        <label className="form-label">จำนวน <small>(คงเหลือ: {total})</small></label>
                        <input className="form-control" required ref={refInputCount} 
                            onChange={()=>{
                                    loadTotalMaterial()
                            }}
                        />
                    </div>
                    <div className="col-md-2 col-12 flex items-end">
                        <button type="button" className="btn btn-info" onClick={()=>checkAddButton()}>เพิ่มอุปกรณ์</button>
                    </div>
                </div>
                <div className="mt-2">
                    <h5 className="m-0 text-lg">รายการอุปกรณ์ที่ใช้</h5>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>รหัส</th>
                                <th>ชื่อ</th>
                                <th>จำนวน</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                materialUseList.length !== 0 ? materialUseList.map((item, i)=>{
                                    return (
                                        <tr key={'sub'+i}>
                                            <td>{item['material_code_name'].split('-')[0]}</td>
                                            <td>{item['material_code_name'].split('-')[1]}</td>
                                            <td>{item['material_count']}</td>
                                            <td><button type="button" className="btn btn-outline-danger" onClick={()=> setMaterialUseList(materialUseList.filter(ele=>ele['material_id'] !== item['material_id']??ele))}
                                            ><FontAwesomeIcon icon={faXmarkCircle}/>
                                            </button></td>
                                        </tr>
                                    )
                                }):<></>
                            }
                        </tbody>
                    </table>
                </div>
            </>
            
        )
    }
    //todo:  material
    //complete: location room code dept engineer status description
    
    const editModal = {
        mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPlus}/> แก้ไขข้อมูลการแจ้งซ่อม</h1>,
        mBody:(
            !(options.dept_options.length === 0 || options.material_options.length || optionsLocation)?<Skeleton/>:
            <>
                <div className="row">
                    <div className="col-md-4 col-12">
                        <InputGroupWithLabel key={inputEditForm.notify_repair_code} label="รหัสการซ่อม" defaultValue={inputEditForm.notify_repair_code} placeholder="รหัสการซ่อม" ref={refInputCodeEdit}/>
                    </div>
                    <div className="col-md-4 col-12">
                        <SelectOptionWithLabel key={inputEditForm.location_id} label="สถานที่" defaultValue={inputEditForm.location_id} options_arr_obj={optionsLocation} callback={({target:{value}})=>{ setInputEditForm({...inputEditForm, location_id:value}); loadRoom (value);}}/>
                    </div>
                    <div className="col-md-4 col-12">
                        <SelectOptionWithLabel key={inputEditForm.room_id} label="ห้อง" defaultValue={inputEditForm.room_id} options_arr_obj={optionsRoom} callback={({target:{value}})=>{ setInputEditForm({...inputEditForm, room_id:value});}}/>
                    </div>
                    <div className="col-md-4 col-12">
                        <InputGroupWithLabel key={inputEditForm.description} label="รายละเอียด" defaultValue={inputEditForm.description} placeholder="รายละเอียด" ref={refInputDescriptionEdit}/>
                    </div>
                    <div className="col-md-4 col-12">
                        <SelectOptionWithLabel label="สถานะ" value={inputEditForm.status} 
                            options_arr_obj={[
                                {value:'0',text:'รอหัวหน้าดำเนินการ'},
                                {value:'1',text:'อนุมัติ'},
                                {value:'2',text:'กำลังดำเนินการ'},
                                {value:'3',text:'ดำเนินการเสร็จสิ้น'},
                                {value:'-1',text:'ไม่ผ่านอนุมัติ/ปฏิเสธ'},
                                {value:'-2',text:'ไม่สามารถดำเนินการได้'},
                                {value:'-3',text:'ไม่ต้องการการดำเนินการ'},
                            ]} 
                            callback={({target:{value}})=>{ setInputEditForm({...inputEditForm, status:value});}}
                        />
                    </div>
                    <div className="col-md-4 col-12">
                        <SelectOptionWithLabel key={inputEditForm.dept_id} label="แจ้งไปยังแผนกช่าง" disabled={+inputEditForm.status >= 1?"":"disabled"} defaultValue={inputEditForm.dept_id||''} options_arr_obj={options.dept_options} callback={({target:{value}})=>{ setInputEditForm({...inputEditForm, dept_id:value}); loadEngineer(value)}}/>
                    </div>
                    <div className="col-md-4 col-12">
                        <SelectOptionWithLabel key={inputEditForm.engineer_id} label="ช่างซ่อม" disabled={+inputEditForm.status === 2?"":"disabled"} defaultValue={inputEditForm.engineer_id||''} options_arr_obj={optionsEngineer} callback={({target:{value}})=>{ setInputEditForm({...inputEditForm, engineer_id:value}); }}/>
                    </div>
                    <div className="col-md-4 col-12">
                        <InputGroupWithLabel key={inputEditForm.define_date} disabled={+inputEditForm.status === 2?"":"disabled"} label="กำหนดระยะเวลาโดยช่าง" defaultValue={inputEditForm.define_date} placeholder="กำหนดระยะเวลาโดยช่าง" ref={refInputDefineDateEdit}/>
                    </div>
                    <div className="col-md-4 col-12">
                        <InputGroupWithLabel key={inputEditForm.unable_message} disabled={+inputEditForm.status === -2?"":"disabled"} label="หมายเหตุจากช่าง" defaultValue={inputEditForm.unable_message} placeholder="หมายเหตุจากช่าง" ref={refInputUnableEdit}/>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-4 col-12">
                        <SelectOptionWithLabel label="วัสดุครุภัณฑ์" options_arr_obj={options.material_options} callback={({target:{value}})=>{ setInputEditForm({...inputEditForm, material_id: value}); loadTotalMaterialEdit(value);}}/>
                    </div>
                    <div className="col-md-4 col-12">
                        <label className="form-label">จำนวน <small>(คงเหลือ: {total})</small></label>
                        <input className="form-control mb-3" required ref={refInputCountEdit} 
                            onChange={()=>{
                                    loadTotalMaterialEdit()
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-12 flex items-end">
                        <button type="button" className="btn btn-info mb-3" onClick={()=>checkAddButtonEdit()}>เพิ่มอุปกรณ์</button>
                    </div>
                </div>
                <div className="mt-2">
                    <h5 className="m-0 text-lg">รายการอุปกรณ์ที่ใช้</h5>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>รหัส</th>
                                <th>ชื่อ</th>
                                <th>จำนวน</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                materialUseListEdit.length !== 0 ? materialUseListEdit.map((item, i)=>{
                                    
                                    return (
                                        <tr key={'sub'+i}>
                                            <td>{item['material_code']}</td>
                                            <td>{item['material_name']}</td>
                                            <td>{item['material_count']}</td>
                                            <td><button type="button" className="btn btn-outline-danger" onClick={async ()=> {
                                                if (await deleteNotifyRepairMaterial({notify_repair_id: notifyRepairId, material_id: item['material_id']})) {
                                                    
                                                    setMaterialUseListEdit(materialUseListEdit.filter(ele=>{
                                                        return ele['material_id'] !== item['material_id']??ele
                                                    }))
                                                }
                                            }}
                                            ><FontAwesomeIcon icon={faXmarkCircle}/>
                                            </button></td>
                                        </tr>
                                    )
                                }):<></>
                            }
                        </tbody>
                    </table>
                </div>
                
            </>
            
        )
    }
    // console.log(materialUseListEdit);
    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faBell}/> จัดการข้อมูลการแจ้งซ่อม</h1>
            <div className="container-fluid">
                <div className="row items-stretch gap-y-2">
                    <div className="col-lg-3 col-md-6 col-12">
                        {!cardData.total?<Skeleton/>:<CardFillColorNonFooter classBody="bg-blue-400  rounded" contentBody={totalCard} classCard="text-white "/>}
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        {!cardData.success?<Skeleton/>:<CardFillColorNonFooter classBody="bg-green-400  rounded" contentBody={successCard} classCard="text-white "/>}
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        {!cardData.success?<Skeleton/>:<CardFillColorNonFooter classBody="bg-purple-400  rounded" contentBody={processCard} classCard="text-white"/>}                        
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        {!cardData.success?<Skeleton/>:<CardFillColorNonFooter classBody="bg-yellow-400  rounded" contentBody={waitingCard} classCard=""/>}                        
                    </div>
                    <div className="col-md-6 col-12">
                        {!cardData.success?<Skeleton/>:<CardFillColorNonFooter classBody="bg-lime-400  rounded" contentBody={acceptCard} classCard="text-white"/>}                        
                    </div>
                    <div className="col-md-6 col-12">
                        {!cardData.success?<Skeleton/>:<CardFillColorNonFooter classBody="bg-red-400  rounded" contentBody={denyCard} classCard="text-white "/>}
                    </div>
                    <div className="col-md-6 col-12">
                        {!cardData.success?<Skeleton/>:<CardFillColorNonFooter classBody="bg-red-900  rounded" contentBody={unableCard} classCard="text-white"/>}   
                    </div>
                    <div className="col-md-6 col-12">
                        {!cardData.success?<Skeleton/>:<CardFillColorNonFooter classBody="bg-slate-400  rounded" contentBody={needlessCard} classCard="text-white "/>}
                    </div>
                </div>
                <div className="mt-3">
                    <CardFillColorNonFooter contentBody={tableWaiting} />
                </div>
                <div className="mt-3">
                    <CardFillColorNonFooter contentBody={tableHistory} />
                </div>
            </div>

            {/* modal */}
            <ModalCardConfirm
                confrimCallback={async()=>{
                    
                    const formData = {
                        notify_repair_id: notifyRepairId,
                        notify_repair_code: refInputCode.current.value,
                        engineer_dept_id: inputForm.dept_id, 
                        material_list: [...materialUseList.map(item=>({material_id: item['material_id'], material_count: item['material_count']}))]
                    }
                    
                    if (await updateNotifyRepairToAccept(formData)) reState();
                }}
                cancleCallback={reState} hideCallback={reState} modalBody={assignModal.mBody} modalHead={assignModal.mHead} modalShow={assignModalShow} setModalShow={setAssignModalShow}/>
            <ModalCardConfirm
                confrimCallback={async()=>{
                    const formData = {
                        ...inputEditForm, 
                        description: refInputDescriptionEdit.current.value,
                        notify_repair_code: refInputCodeEdit.current.value,
                        define_date: refInputDefineDateEdit.current.value,
                        unable_message: refInputUnableEdit.current.value,
                        notify_repair_id: notifyRepairId
                    }

                    if (await updateNotifyRepair(formData)) reState();
                }}
                cancleCallback={reState} hideCallback={reState} modalBody={editModal.mBody} modalHead={editModal.mHead} modalShow={editModalShow} setModalShow={setEditModalShow}/>
            
            <ModalCard modalShow={modalShow} setModalShow={setModalShow} modalBody={modal.mBody} modalHead={modal.mHead}/>
        </>
    )
}

export default Repair