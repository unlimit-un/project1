import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { CardFillColorHeader, CardFillColorNonFooter } from '../../components/Cards'
import { PieChart } from '../../components/Charts'
import { ListGroupFlush } from '../../components/ListGroup'
import { SidebarRightMaid } from '../../components/structure/SidebarM'
import { pre_dataPieChart } from '../../functions/PrepareChartData'

const HomepageMaid = () => {

    const [height, setHeight] = useState(0);
    const ref = useRef(null)

    const dataSetChart = [{
            // label: 'Dataset 1',
            data: [20,30, 25, 10],
            backgroundColor: [
              'rgba(34, 197, 94, 0.2)',
              'rgba(99, 102, 241, 0.2)',
              'rgba(236, 72, 153, 0.2)',
              'rgba(217, 119, 6, 0.2)',
            ],
            borderColor: [
              'rgba(34, 197, 94, 1)',
              'rgba(99, 102, 241, 1)',
              'rgba(236, 72, 153, 1)',
              'rgba(217, 119, 6, 1)',
            ],
            borderWidth: 1,
        }]
    const dataChartLeave = pre_dataPieChart(['เข้างาน', 'ลาป่วย', 'ลากิจ', 'ลาพักผ่อน'],'bottom','', dataSetChart)

    const todoCard = (
        <>
            <p>รายการงานที่ต้องทำวันนี้:</p>
            <ListGroupFlush lists={[{detail: 'test'}, {detail: 'test'}]}/>
        </>
    )
    const todayCard = (
        <>
            <div className="card shadow-slate-300 shadow-[5px_5px] md:w-auto lg:w-full">
                <div className="card-header !bg-red-500 text-white text-center">
                    <p className="m-0 card-title">December</p>
                </div>
                <div className="card-body text-center">
                    <h1 className="font-extrabold">25</h1>
                </div>
            </div>
            <p className="lg:inline-block hidden">วันที่ 25 ธันวาคม พ.ศ.2565</p>
        </>
    )

    const static_leave = (
        <>
            <div className="row">
                <div className="col-md-6 col-12">
                    <div className="flex justify-center items-center h-full">
                        <PieChart data={dataChartLeave.data} options={dataChartLeave.options}/>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="flex gap-2 flex-column">
                        <p className="m-0">ทำงานจริง:</p>
                        <div className="progress">
                            <div className="progress-bar w-[25%] !bg-green-500" role="progressbar" >25%</div>
                        </div>
                        <p className="m-0">ลาป่วย:</p>
                        <div className="progress">
                            <div className="progress-bar w-[25%] !bg-indigo-500" role="progressbar" >25%</div>
                        </div>
                        <p className="m-0">ลากิจ:</p>
                        <div className="progress">
                            <div className="progress-bar w-[25%] !bg-pink-500" role="progressbar" >25%</div>
                        </div>
                        <p className="m-0">ลาพักผ่อน:</p>
                        <div className="progress">
                            <div className="progress-bar w-[25%] !bg-amber-600" role="progressbar" >25%</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    useEffect(()=>{
        if (ref !== null) {
            setHeight(ref.current.clientHeight)
        }
    },[])
    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faHome}/> หน้าหลัก</h1>
            <div className="row mt-4">
                <div className="col-lg-9 col-md-8 col-12" ref={ref}>
                    <div className="row ">
                        <div className="col-lg-7 col-md-6 col-12">
                            <CardFillColorNonFooter contentBody={todoCard}/>
                        </div>
                        <div className="col-lg-5 col-md-6 col-12">
                            <CardFillColorNonFooter contentBody={todayCard} classBody="flex justify-center gap-3"/>
                        </div>
                        <div className="col-12 mt-3">
                            <CardFillColorHeader contentBody={static_leave} contentHeader="สถิติการลา"/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                    <SidebarRightMaid maxHeight={height}/>
                </div>
            </div>
        </>
    )
}

export default HomepageMaid