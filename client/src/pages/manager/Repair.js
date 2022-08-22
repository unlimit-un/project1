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
import { getMaterialById, getMaterialByManagerId } from '../../controllers/manager/MaidDutyController'
import { getEngineerDeptByManagerId } from '../../controllers/manager/ManageEmpController'
import { ListGroupFlush } from '../../components/ListGroup'
import Swal from 'sweetalert2'
import { getNotifyRepairAndMaterialByNotifyRepairId, getNotifyRepairByManagerId, updateNotifyRepairToAccept, updateNotifyRepairToDeny } from '../../controllers/manager/ReapairContoller'
import { convertTZ } from '../../functions/ConvertDate'

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
    const [modal, setModal] = useState({mHead:<></>,mBody: <></>})
    const [assignWork, setAssignWork] = useState([])
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
    const [total, setTotal] = useState('')
    
    const refInputCode = useRef(null);
    const refInputCount = useRef(null);
    
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
        console.log(notifyRepairById[0]['status']);
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
                    status:"รอดำเนินการ", 
                    ED:<EditDelete/>, 
                }
            })
            // {checkbox: <input className="accent-pink-300 focus:accent-pink-500" type="checkbox" value="2" onClick={({target,target:{value}})=>target.checked?handleCheck(value):handleUnCheck(value)} />,issue: 'โต๊ะหัก', notify_person:"unlimit unarn", date:"2022-02-21", location:"ตึก A", room:"A202", status:"success", ED:<EditDelete/>, view:<ModalButton callback={handleView} classBtn="btn btn-outline-primary" setModalShow={setModalShow} icon={faEye}/> },
        ],
        columns: [
            {title: "",field: "checkbox", },
            {title: "ปัญหา",field: "issue", },
            {title: "ผู้แจ้ง",field: "notify_person",},
            {title: "วันที่แจ้ง",field: "date",},
            {title: "สถานที่",field: "location", },
            {title: "ห้อง",field: "room", },
            {title: "สถานะ",field: "status"},
            {title: "",field: "view"},
            {title: "",field: "ED"},
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
                    ED:<EditDelete/>
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

    const reState = () =>{
        setInputForm({
            dept_id: '',
            material_id:''
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
            <ModalCard modalShow={modalShow} setModalShow={setModalShow} modalBody={modal.mBody} modalHead={modal.mHead}/>
        </>
    )
}

export default Repair