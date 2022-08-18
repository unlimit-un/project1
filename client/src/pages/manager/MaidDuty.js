import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Spiner } from '../../components/Loading';
import { PageUnderConstrunction } from '../PageError';
import { Duty, MaidDutyCalendar, Schedual, MaidDutyMaterial, MaidDutyCheck } from './submenu/MaidDuty';


// MaidDuty
const MaidDuty = () =>{
    const {page} = useParams();
    console.log(page);
    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faCalendarAlt}/> จัดการงานแม่บ้าน</h1>
            <div>
                    {
                            page === 'calendar'? <Suspense fallback={<Spiner/>}><MaidDutyCalendar/></Suspense>:
                            page === 'schedule'? <Suspense fallback={<Spiner/>}><Schedual/></Suspense>:
                            page === 'duty'? <Suspense fallback={<Spiner/>}><Duty/></Suspense>:
                            page === 'material'? <Suspense fallback={<Spiner/>}><MaidDutyMaterial/></Suspense>:
                            page === 'check'? <Suspense fallback={<Spiner/>}><MaidDutyCheck/></Suspense>:
                            <PageUnderConstrunction/>
                    }
            </div>
        </>
    )
}
export default MaidDuty



    // // duty check
    // const dataTableDutyCheck = {
    //     data:[
    //         {maid:"Unlimit unarn",description:"ปัดกวาดเช็ดถู",day:"จันทร์",date_start:"08:00:00",date_end:"16:00:00",date_time:"15:45:00",building:"ตึก A",room:"A202",status:"processing" }
    //     ],
    //     columns:[
    //         {title:"แม่บ้าน",field:"maid"},
    //         {title:"รายละเอียดงาน",field:"description"},
    //         {title:"วัน",field:"day"},
    //         {title:"เวลาเริ่มงาน",field:"date_start"},
    //         {title:"เวลาที่เสร็จสิ้นงาน",field:"date_end"},
    //         {title:"เวลาที่กำหนด",field:"date_time"},
    //         {title:"ตึก",field:"building"},
    //         {title:"ห้อง",field:"room"},
    //         {title: "สถานะ",field: "status", 
    //             lookup:{
    //                 waiting: "รอดำเนินการ", 
    //                 processing:"กำลังดำเนินการ",
    //                 success:"ดำเนินการเสร็จสิ้น", 
    //                 deny:"ปฏิเสธ",
    //                 unable:"ไม่สามารถดำเนินการได้",
    //             }
    //         }
    //     ]


    // }
    // const contentDutyCheck = (
    //     <>
    //         <div className="container-fluid">
    //             <h1 className="text-xl"><FontAwesomeIcon icon={faClipboardCheck}/> ตรวจสอบงานแม่บ้าน</h1>
    //             <hr />
    //             <CardFillColorHeader
    //                 contentHeader={<h1 className="text-lg m-0">รายชื่อพนักงาน</h1>} 
    //                 contentBody={
    //                     <MuiTable data={dataTableDutyCheck.data} columns={dataTableDutyCheck.columns} title=""/>
    //                 }
    //             />
            
    //         </div>
    //     </>
    // )
    
    // // {
    // //         title:'unlimit',
    // //         daysOfWeek: [ '3' ], // these recurrent events move separately
    // //         startTime: '11:00:00',
    // //         endTime: '11:30:00',
    // //         color: 'red'
    // //       }
    // return (
    //     <>
    //         {/* <Tabs 
    //             id="controlled-tab-example"
    //             activeKey={key}
    //             onSelect={(k) => setKey(k)}
    //             className="mb-3"
    //         >
    //             <Tab eventKey="calendar" title="ตารางเวรทั้งหมด">
    //                 <Suspense fallback={<Spiner/>}>
    //                 {key==='calendar'?
    //                     />:null}
                        
    //                 </Suspense>
    //             </Tab>
    //             <Tab eventKey="duty" title="จัดการตารางเวร">
    //                 <Suspense fallback={<Spiner/>}>
    //                     {
    //                         key==='duty'?<CardFillColorNonFooter contentBody={contentBodys} classCard="mt-3"/>:null
    //                     }
                        
    //                 </Suspense>
    //             </Tab>
    //             <Tab eventKey="duty_assign" title="จัดการงานแม่บ้าน">
    //                 <Suspense fallback={<Spiner/>}>
    //                     {
    //                         key==='duty_assign'?<CardFillColorNonFooter contentBody={contentDutyAssign} classCard="mt-3"/>:null
    //                     }
                        
    //                 </Suspense>
    //             </Tab>
    //             <Tab eventKey="duty_assign_material" title="ตรวจสอบงานแม่บ้าน">
    //                 <Suspense fallback={<Spiner/>}>
    //                     {
    //                         key==='duty_assign_material'?<CardFillColorNonFooter contentBody={contentDutyCheck} classCard="mt-3"/>:null
    //                     }
                        
    //                 </Suspense>
    //             </Tab>
    //         </Tabs> */}
    //         {/* <ModalCardConfirm hideCallback={()=>{}} cancleCallback={()=>{}} confrimCallback={()=>{}} modalShow={showModal} setModalShow={setShowModal} modalBody={modal.mBody} modalHead={modal.mHead} /> */}
    //     </>
    // )
