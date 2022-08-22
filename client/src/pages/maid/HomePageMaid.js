import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { CardFillColorHeader } from '../../components/Cards'
import { ListGroupFlush } from '../../components/ListGroup'
import { pre_dataPieChart } from '../../functions/PrepareChartData'
import { Skeleton,Spiner } from '../../components/Loading'
import { lazily } from "react-lazily";
import {GetLeavepiechart} from '../../controllers/maid/HomeControllers'
import { convertNumberToLongEng, convertNumberToThai } from '../../functions/ConvertDate'
import { ArrayColor, ArrayColorAlpha } from '../../utils/ArrayColor'
import { getworkCurrentDate } from '../../controllers/maid/WorkControllers'

const { CardFillColorNonFooter } = lazily(()=>import('../../components/Cards'))
const { PieChart } =lazily(()=>import('../../components/Charts'))
const { SidebarRightMaid } =lazily(()=>import('../../components/structure/SidebarM'))

const HomepageMaid = () => {

    const [height, setHeight] = useState(0);
    const ref = useRef(null)
    
    const [piechartdatasets , setPieChartDataSets] = useState ();
    const [labelpiechart , setLabelPieChart] = useState ();
    const [workCurrentDate, setWorkCurrentDate] = useState ([])
    const loadpiechart =  async() =>{
        const pieChartData = await GetLeavepiechart();
        setLabelPieChart([...pieChartData.map(item=>item['leave_type_name'])]);
        setPieChartDataSets([{
            data:[...pieChartData.map(item=>item['count'])],
            backgroundColor: [...pieChartData.map((item,i)=>ArrayColorAlpha[i])],
            borderColor: [...pieChartData.map((item,i)=>ArrayColor[i])],
            borderWidth: 1,
        }])
    }
    const lodaworkCurrentDate = async ()=>{
        const currendate = await getworkCurrentDate()
        setWorkCurrentDate (currendate)
        console.log(currendate);
    }
    const dataChartLeave = pre_dataPieChart(labelpiechart,'top','', piechartdatasets)

    const todoCard = (
        <>
             <h5 className="card-title">รายการงานที่ต้องทำวันนี้:</h5>
                    <ListGroupFlush   lists={[...workCurrentDate.map(item=>{
                        return {detail:`
                        | ${item['maid_duty_assign_code']} 
                        | ${item['work_description']} 
                        | ${item['time_start']}
                        -${item['time_end']}
                        `}
                        })]}
                    />
                        
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
            <p className="lg:inline-block hidden">{`วันที่ ${new Date().getDate()} ${convertNumberToThai(new Date().getMonth()+1)} พ.ศ ${new Date().getFullYear()+543}`}</p>
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
        loadpiechart();
        lodaworkCurrentDate();
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
                    <Suspense fallback={<Skeleton/>}><SidebarRightMaid maxHeight={height}/></Suspense>
                </div>
            </div>
        </>
    )
}

export default HomepageMaid