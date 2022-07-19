import React,{useState} from 'react'
import {  faHome, faEye,faCopy} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardFillColorNonFooter } from '../../components/Cards'
import { ModalCard,ModalButton } from '../../components/Modals'
import { Bandage } from '../../components/Bandage'
import { TablesStripedDataTable } from '../../components/Tables'



const Request = () => {
    const acceptCard =(
       <div className="container-fulid">
            <p className="text-3xl m-0 text-start">112</p>
            <p className="text-3xl m-0 text-end">คำขอทั้งหมด</p>
       </div> 
    )
    const totalCard =(
        <div className="container-fulid">
            <p className="text-3xl m-0 text-start">8</p>
            <p className="text-3xl m-0 text-end">ที่ยังไม่เปิด</p>
        </div>
    )
    const waitingCard =(
        <div className="container-fulid">
            <p className="text-3xl m-0 text-start">0</p>
            <p className="text-3xl m-0 text-end">อื่นๆ</p>
        </div>
    )
    const approveCard = (
        <div className="container-fulid">
            <p className="text-3xl m-0 text-start">0</p>
            <p className="text-3xl m-0 text-end">คำขอที่อนุมัติ</p>
        </div>
    )
    const disapprovedCard = (
        <div className="container-fulid">
            <p className="text-3xl m-0 text-start">0</p>
            <p className="text-3xl m-0 text-end">คำขอที่ไม่อนุมัติ</p>
        </div>
    )

    const [modalShow,setModalShow] = useState(false)
    const initial = {
        thead:['รหัสคำขอ', 'เรื่อง', 'วันที่แจ้ง','สถานะ'],
        tbody:[
            ['A233456', 'เบิกเครื่องมือซ้อม','3/7/2023', <div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-success" text="อนุมัติ"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>],
            ['A233457', 'ลาป่วย','6/7/2023', <div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-danger" text="ไม่อนุมัติ"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>],
            ['A233458', 'ขอวัสดุไปทำงานเพิ่ม','7/8/2023', <div className="flex justify-around items-baseline gap-2 text-center"><Bandage classBandage="bg-success" text="อนุมัติ"/><ModalButton icon={faEye} setModalShow={setModalShow} /></div>],
        ]
    }
    const [dataTable, setDataTable] = useState(initial);

    const handleFilterData1 = (text)=>{
        setDataTable({
                ...initial,
                tbody: initial.tbody.filter(item =>{
                if (item[5].props.children[0].props.text === text ) {
                    return item
                }else if(text === 'ทั้งหมด'){
                    return item
                }  
            })
        })
    }

    const tableRequest = (
        <div className="container-fulid">
            <TablesStripedDataTable data={dataTable}/>
        </div>
    )

    const Modal = {
        mHead:(
            <>
                <h1 className="m0 text-2xl"><FontAwesomeIcon icon={faCopy}/> รายละเอียด</h1>
            </>
        ),
        mBody:(
            <>
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-12">
                        <ul>
                            <li>รหัสพนักงาน :</li>
                            <li>ชื่อ - นามสกุล :</li>
                            <li>แม่บ้าน / ช่าง :</li>
                            <li>รายละเอียด :</li>
                            <li>วันที่แจ้ง :</li>
                            <li>สถานะ</li>
                        </ul>
                    </div>
                    <div className="col-lg-9 col-md-8 col-12">
                        <ul className="gap-2">
                            <li>A233456</li>
                            <li>unlimit unarn</li>
                            <li>ช่างซ่อม</li>
                            <li>เบิกเครื่องมือซ้อม</li>
                            <li>3/7/2023</li>
                            <li><Bandage classBandage="bg-success !w-1/4" text="อนุมัติ"/></li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
         <h1 className="text-2xl"><FontAwesomeIcon icon={faHome}/> หน้าหลัก</h1>
         <div className="container-fluid">
            <div className="row items-stretch gap-y-2">
                <div className="col-md-4  col-12">
                    <button className="w-full h-full" onClick={(handleFilterData1)=>('ทั้งหมด')}>
                        <CardFillColorNonFooter classBody="bg-green-500 hover:bg-green-500 transition-all duration-300 rounded" contentBody={acceptCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 h-full"/>
                    </button>
                </div>
                <div className="col-md-4  col-12">
                    <button className="w-full h-full" onClick={(handleFilterData1)=>('อนุมัติ')}>
                        <CardFillColorNonFooter classBody="bg-blue-600 hover:bg-blue-500 transition-all duration-300 rounded" contentBody={totalCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 h-full"/>
                    </button>
                </div>
                <div className="col-md-4  col-12">
                    <button className="w-full h-full" onClick={(handleFilterData1)=>('รออนุมัติ')}>
                        <CardFillColorNonFooter classBody="bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 rounded" contentBody={waitingCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 h-full"/>
                    </button>
                </div>
                <div className="col-md-6 col-12">
                    <button className="w-full h-full" onClick={(handleFilterData1)=>('คำขอที่อนุมัติ')}>
                        <CardFillColorNonFooter classBody="bg-violet-600 hover:bg-violet-500 transition-all duration-300 rounded" contentBody={approveCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 h-full"/>
                    </button>
                </div>
                <div className="col-md-6 col-12">
                    <button className="w-full h-full" onClick={(handleFilterData1)=>('คำขอที่ไม่อนุมัติ')}>
                        <CardFillColorNonFooter classBody="bg-red-600 hover:bg-red-500 transition-all duration-300 rounded" contentBody={disapprovedCard} classCard="text-white transition-all duration-300 hover:-translate-y-3 h-full"/>
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <CardFillColorNonFooter contentBody={tableRequest}/>
            </div>
         </div>
         {/* modal */}
         <ModalCard modalShow={modalShow} setModalShow={setModalShow} modalBody={Modal.mBody} modalHead={Modal.mHead}/>
        </>
    )
}

export default Request