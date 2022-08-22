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