import { faClipboardCheck, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Spiner} from '../../components/Loading'
import * as SubMenu from './submenu/Leave'

const Leave = () => {
    const {page} = useParams();
    console.log(page);
    return (
        <>
            <div className="container-fluid">
                <Suspense fallback={<Spiner/>}>
                    {
                            page === 'leave_type'? <SubMenu.LeaveType/>:
                            page === 'dashboard'?<SubMenu.Leave/>: 
                            null
                    }
                </Suspense>
            </div>
        </>
    )
}

export default Leave