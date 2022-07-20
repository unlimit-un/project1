import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense, useEffect, useState, useTransition } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spiner from '../../components/Spiner'
import { PageUnderConstrunction } from '../PageError'
import Calendar from './Calendar'
import { MaidDuty, SpacialWork, TeamManage, UrgentWork } from './submenu/SchedualWork'


const SchedualWork = () => {
    const {page} = useParams();
    
    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faCalendarAlt}/> จัดการงานและกิจกรรมพิเศษ</h1>
            <div>
                <Suspense fallback={<Spiner/>}>
                    {
                            page === 'dashboard'? <Suspense fallback={<Spiner/>}><Calendar/></Suspense>:
                            page === 'team'? <TeamManage/>:
                            page === 'event'? <SpacialWork/>:
                            page === 'maid'? <MaidDuty/>:
                            page === 'urgent'? <UrgentWork/>:
                            <PageUnderConstrunction/>
                    }
                </Suspense>
            </div>
        </>
    )
}

export default SchedualWork