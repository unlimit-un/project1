import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { BandageRequest } from '../../components/manager/subComponents/Bandage'
import { CardFillColor, CardFillColorNonFooter } from '../../components/manager/subComponents/Cards'
import { TablesStripedDataTable } from '../../components/Tables'

const Leave = () => {
    const acceptCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">คำขออนุมัติ</p>
            <div className="text-end">
                <p className="text-3xl m-0">10</p>
                <p className="text-md m-0">คำขอที่ผ่านการอนุมัติ</p>
            </div>
        </div>
    )
    const waitingCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">คำขออนุมัติ</p>
            <div className="text-end">
                <p className="text-3xl m-0">10</p>
                <p className="text-md m-0">คำขอที่รอการอนุมัติ</p>
            </div>
        </div>
    )
    const denyCard = (
        <div className="container-fulid">
            <p className="text-md m-0 text-start">คำขออนุมัติ</p>
            <div className="text-end">
                <p className="text-3xl m-0">10</p>
                <p className="text-md m-0">คำขอที่ไม่ผ่านการอนุมัติ</p>
            </div>
        </div>
    )
    const initial = {
        thead:['ชื่อ', 'ประเภทการลา', 'เรื่อง', 'เริ่มลาวันที่', 'ถึงวันที่', 'สถานะ'],
        tbody:[
            ['unlimit', 'ลากิจ', 'ไปทำธุระต่างจังหวัด', '3/7/2023', '5/7/2023', <BandageRequest text="อนุมัติ"/>],
            ['unlimit', 'ลาพักร้อน', 'ลาไปเที่ยว', '6/7/2023', '12/7/2023',<BandageRequest text="ไม่อนุมัติ"/>],
            ['unlimit', 'ลาป่วย', 'ป่วยไข้', '7/8/2023', '15/8/2023', <BandageRequest text="รออนุมัติ"/>],
        ]
    }
    const [dataTable, setDataTable] = useState(initial);

    const handleFilterData = (text) =>{
        setDataTable({
                ...initial, 
                tbody:  initial.tbody.filter(item =>{
                if ( item[5].props.text === text ) {
                    return item
                }
            })
        })
    }
    
    const tableLeave = (
        <div className="container-fluid">
            <TablesStripedDataTable data={dataTable}/>
        </div>
    )
  return (
    <>
        <h1 className="text-2xl"><FontAwesomeIcon icon={faClipboardCheck}/> จัดการคำขออนุมัติ</h1>
        <div className="flex justify-evenly">
            <button onClick={()=>handleFilterData('อนุมัติ')}>
                <CardFillColorNonFooter classBody="bg-green-400 hover:bg-green-500 transition-all duration-300" contentBody={acceptCard} classCard="text-white transition-all duration-300 hover:-translate-y-3"/>
            </button>
            <button onClick={()=>handleFilterData('รออนุมัติ')}>
                <CardFillColorNonFooter classBody="bg-yellow-400 hover:bg-yellow-500 transition-all duration-300" contentBody={waitingCard} classCard="transition-all duration-300 hover:-translate-y-3"/>
            </button>
            <button onClick={()=>handleFilterData('ไม่อนุมัติ')}>
                <CardFillColorNonFooter classBody="bg-red-400 hover:bg-red-500 transition-all duration-300" contentBody={denyCard} classCard="text-white transition-all duration-300 hover:-translate-y-3"/>
            </button>
        </div>
        <div className="mt-3 card card-body">
            <CardFillColorNonFooter contentBody={tableLeave} />
        </div>
    </>
  )
}

export default Leave