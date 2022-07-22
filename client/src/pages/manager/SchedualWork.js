import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense, useEffect, useState, useTransition } from 'react'
import { lazily } from 'react-lazily'
import { useNavigate, useParams } from 'react-router-dom'
import {Spiner} from '../../components/Loading'
import { PageUnderConstrunction } from '../PageError'
import Calendar from './Calendar'
// import { MaidDuty, SpacialWork, TeamManage, UrgentWork } from './submenu/SchedualWork'

const {MaidDuty, SpacialWork, TeamManage, UrgentWork} = lazily(()=>import('./submenu/SchedualWork'));

const SchedualWork = () => {
    const {page} = useParams();
    
    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faCalendarAlt}/> จัดการงานและกิจกรรมพิเศษ</h1>
            <div>
                    {
                            page === 'dashboard'? <Suspense fallback={<Spiner/>}><Calendar/></Suspense>:
                            page === 'team'? <Suspense fallback={<Spiner/>}><TeamManage/></Suspense>:
                            page === 'event'? <Suspense fallback={<Spiner/>}><SpacialWork/></Suspense>:
                            page === 'maid'? <Suspense fallback={<Spiner/>}><MaidDuty/></Suspense>:
                            page === 'urgent'? <Suspense fallback={<Spiner/>}><UrgentWork/></Suspense>:
                            <PageUnderConstrunction/>
                    }
            </div>
        </>
    )
}

export default SchedualWork