import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { CardFillColorHeader } from '../../components/Cards'
import { ListGroupFlush } from '../../components/ListGroup'
import { pre_dataPieChart } from '../../functions/PrepareChartData'
import { Skeleton,Spiner } from '../../components/Loading'
import { lazily } from "react-lazily";
import { SidebarRightEn } from '../../components/structure/SidebarM'
import { convertNumberToLongEng, convertNumberToThai } from '../../functions/ConvertDate'
import { getleavepiechart } from '../../controllers/engineer/HomeControllers'
import { ArrayColor, ArrayColorAlpha } from '../../utils/ArrayColor'

const { CardFillColorNonFooter } = lazily(()=>import('../../components/Cards'))
const { PieChart } =lazily(()=>import('../../components/Charts'))
const { SidebarRightMaid } =lazily(()=>import('../../components/structure/SidebarM'))

const HomepageE = () => {
    const [height, setHeight] = useState(0);
    const [piechartdatasets , setPieChartDataSets] = useState ([]);
    const [labelpiechart , setLabelPieChart] = useState ([]);
    const ref = useRef(null)

    const loadPieChart = async() =>{
        const pieChartData = await getleavepiechart();
        console.log(pieChartData);
        setLabelPieChart([...pieChartData.map(item=>item['leave_type_name'])]);
        setPieChartDataSets([{
            data:[...pieChartData.map(item=>item['count'])],
            backgroundColor: [...pieChartData.map((item,i)=>ArrayColorAlpha[i])],
            borderColor: [...pieChartData.map((item,i)=>ArrayColor[i])],
            borderWidth: 1,
        }])
    }
   
    const dataChartLeave = pre_dataPieChart(labelpiechart,'top','', piechartdatasets)

    const todoCard = (
        <>
            <p>รายการงานที่ต้องทำวันนี้:</p>
            <ListGroupFlush lists={[{detail: 'test'}, {detail: 'test'}]}/>
        </>
    )
    const todayCard = (
        <>
            <div className="card shadow-slate-300 shadow-[5px_5px] w-full">
                <div className="card-header !bg-red-500 text-white text-center">
                    <p className="m-0 card-title">{convertNumberToLongEng(new Date().getMonth())}</p>
                </div>
                <div className="card-body text-center">
                    <h1 className="font-extrabold">{new Date().getDate()}</h1>
                </div>
            </div>
            <p className="lg:inline-block hidden">{`วันที่ ${new Date().getDate()} ${convertNumberToThai(new Date().getMonth())} พ.ศ.${new Date().getFullYear()+543}`}</p>
        </>
    )

    const static_leave = (
        <>
            <div className="row">
                <div className="col-md-7 col-12">
                    <div className="flex justify-center items-center h-full">
                        <Suspense fallback={<Spiner/>}>
                            <PieChart data={dataChartLeave.data} options={dataChartLeave.options} height="50vh" width="100%"/>
                        </Suspense>
                    </div>
                </div>
                <div className="col-md-5 col-12">
                    <div className="flex gap-2 flex-column justify-center">
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
        loadPieChart();
    },[])
    useEffect(() => {
        setHeight(ref.current.clientHeight)
        
    }, [height])
    
    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faHome}/> หน้าหลัก</h1>
            <div className="row mt-4">
                <div className="col-lg-9 col-md-8 col-12" ref={ref}>
                    <div className="row ">
                        <div className="col-lg-7 col-md-6 col-12">
                            <Suspense fallback={<Skeleton/>}>
                                <CardFillColorNonFooter contentBody={todoCard}/>
                            </Suspense>
                        </div>
                        <div className="col-lg-5 col-md-6 col-12">
                            <Suspense fallback={<Skeleton/>}>
                                <CardFillColorNonFooter contentBody={todayCard} classBody="flex justify-center gap-3"/>
                            </Suspense>
                        </div>
                        <div className="col-12 mt-3">
                            <CardFillColorHeader contentBody={static_leave} contentHeader="สถิติการลา"/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                    <Suspense fallback={<Skeleton/>}><SidebarRightEn maxHeight={height}/></Suspense>
                </div>
            </div>
        </>
    )
}

export default HomepageE