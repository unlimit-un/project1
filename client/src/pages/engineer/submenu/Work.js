import { faCheckCircle, faEye, faWrench, faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { Suspense, useEffect, useRef, useState } from 'react'
// import { CardFillColorNonFooter } from '../../components/Cards'
import { Skeleton } from '../../../components/Loading'
import { ModalButton, ModalCard, ModalCardConfirm } from '../../../components/Modals'
import { MuiTable } from '../../../components/Tables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lazily } from 'react-lazily'
import { getWorkData, getWorkDataStatusProcess, updateNotifyRepairToProcessing, updateNotifyRepairToSuccess, updateNotifyRepairToUnable } from '../../../controllers/engineer/WorkControllers'
import { InputGroupWithLabel, TextAreawithlabel } from '../../../components/FormElements'

const {CardFillColorNonFooter} = lazily(()=>import('../../../components/Cards'));

export const Workdept = () => {

  const [modalShow, setModalShow] = useState(false)
  const [workdeptData,setWorkDeptData] = useState ([])
  const [inputDefine, setInputDefine] = useState('')
  const [notifyRepairId, setNotifyRepairId] = useState('')
  const loadWorkdeptData = async () =>{
    const workData = await getWorkData ()
    setWorkDeptData (workData)
  }

  const showEditModal = (ntr_id)=>{
    setNotifyRepairId(ntr_id)
  }

  useEffect (()=>{
    loadWorkdeptData ()
  },[])


  const datatableworkdapt = {
      data:[
        ...workdeptData.map(item =>{
          // console.log(item);
          return{
            id:item['notify_repair_code'],
            description:item['description'],
            location:item['location_name'],
            room:item['room_name'],
            date_time:item['notify_repair_date'],
            view:<ModalButton classBtn="btn btn-success " icon={faCheckCircle} callback={()=>{showEditModal(item['notify_repair_id'])}} modalShow={modalShow} setModalShow={setModalShow}/>
          }
        })
        
      ],
      columns:[
        {title:"รหัส",field:"id"},
        {title:"รายละเอียด",field:"description"},
        {title:"สถานที่",field:"location"},
        {title:"ห้อง",field:"room"},
        {title:"เวลาที่แจ้ง",field:"date_time"},
        {title:"",field:"view"}
      ],
  }
  

  const resetState = async ()=>{
    setInputDefine('')
    setNotifyRepairId('')
    loadWorkdeptData()
  }

  const modal = {
    mHead:<h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faWrench}/>รับงานแจ้งซ่อม</h1>,
    mBody:(
      <>
        <div className="row">
          <div className="col-12">
            <InputGroupWithLabel label="กำหนดวันที่จะซ่อมเสร็จ" type="date" value={inputDefine} callback={({target:{value}})=>{setInputDefine(value)}}/>
          </div>
        </div>
      </>
    )
  }

  const tableworkdapt = (
      <Suspense fallback={<Skeleton/>}>
        <MuiTable data={datatableworkdapt.data} columns={datatableworkdapt.columns} title="รายการงานแผนก"/>
    </Suspense>
    
  ) 
  
  return (
    <>
        <Suspense fallback={<Skeleton/>}>
          <CardFillColorNonFooter contentBody={tableworkdapt}/>
        </Suspense>
        <ModalCardConfirm 
          confrimCallback= {async () =>{
            const formData = {
              define_date_by_engineer: inputDefine,
              notify_repair_id: notifyRepairId
            }
            if(await updateNotifyRepairToProcessing(formData)) await resetState();
          }}
          cancleCallback={resetState} hideCallback={resetState} modalShow={modalShow} setModalShow={setModalShow} modalBody={modal.mBody} modalHead={modal.mHead}/>
    </>
  )
}

export const Work = () => {

  const [workDataStatusProcess, setWorkDataStatusProcess] = useState([])
  const [modalShow, setModalShow] = useState (false)
  const refTextArea = useRef(null)
  const [unableNotifyRepairId, setUnableNotifyRepairId] = useState('')
 
  const loadWorkDataStatusProcess = async () =>{
    const data = await getWorkDataStatusProcess();
    // console.log(data);
    setWorkDataStatusProcess(data)
  }

  const reState = () =>{
    refTextArea.current.value = ''
  }

  useEffect(()=>{
    loadWorkDataStatusProcess()
  },[])
  
  const datatablework = {
      data:[
        ...workDataStatusProcess.map(item=>{
          // console.log(item);
            return {
              id: item['notify_repair_code'],
              description:item['description'],
              location:item['location_name'],
              room: item['room_name'],
              date_time: item['notify_repair_date'],
              status:"รอดำเนินการ",
              define_date: item['define_date_by_engineer'],
              accept_deny:
              <div className="flex gap-2">
                  <button className="btn btn-success " 
                    onClick={async ()=>{if(await updateNotifyRepairToSuccess({notify_repair_id:item['notify_repair_id']})) await loadWorkDataStatusProcess()}}>
                    <FontAwesomeIcon icon={faCheckCircle}/>
                  </button>
                  <ModalButton classBtn="btn btn-danger" icon={faXmark} setModalShow={setModalShow} modalShow={modalShow} callback={()=>{setUnableNotifyRepairId(item['notify_repair_id'])}}/>
              </div>
              // view:<ModalButton classBtn="btn btn-success " icon={faCheckCircle} callback={()=>{setNotifyRepairId(item['notify_repair_id'])}} modalShow={modalShow} setModalShow={setModalShow}/>
            }
          })
        
      ],
      columns:[
        {title:"รหัส",field:"id"},
        {title:"รายละเอียด",field:"description"},
        {title:"สถานที่",field:"location"},
        {title:"ห้อง",field:"room"},
        {title:"เวลาที่แจ้ง",field:"date_time"},
        {title:"ซ่อมภายในวันที่",field:"define_date"},
        {title:"สถานะ",field:"status"},
        {title:"",field:"accept_deny"}
        // {title:"",field:"view"}
      ]
  }
  const modals = {
    mHead:<h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faWrench}/>ไม่สามารถซ่อมแซมได้</h1>,
    mBody:(
      <>
        <div className="row">
          <div className="col-12">
            <TextAreawithlabel label="กำหนดวันที่จะซ่อมเสร็จ" ref={refTextArea}/>
          </div>
        </div>
      </>
    )
  }

  return(
      <>
        <Suspense fallback={<Skeleton/>}>
          <CardFillColorNonFooter contentBody={<MuiTable data={datatablework.data} columns={datatablework.columns} title="ตารางงาน"/>}/>
        </Suspense>
        <ModalCardConfirm confrimCallback={async ()=>{
          const formData = {
            notify_repair_id: unableNotifyRepairId,
            unable_message: refTextArea.current.value
          }
          if(await updateNotifyRepairToUnable(formData)) await reState();
        }} hideCallback={reState} cancleCallback={reState} modalBody={modals.mBody} modalHead={modals.mHead} modalShow={modalShow} setModalShow={setModalShow}/>
      </>
  )
}
