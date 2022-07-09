import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageUnderConstrunction } from '../PageError'
import { MaidDuty, SpacialWork, TeamManage } from './submenu/SchedualWork'


const SchedualWork = () => {
    const {page} = useParams();
        
    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faCalendarAlt}/> จัดการงานและกิจกรรมพิเศษ</h1>
            <div>
                {
                    page === 'team'? <TeamManage/>:
                    page === 'spacial'? <SpacialWork/>:
                    page === 'maid'? <MaidDuty/>:
                   <PageUnderConstrunction/>
                }
            </div>
        </>
    )
}

export default SchedualWork