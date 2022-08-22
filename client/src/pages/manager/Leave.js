import { faClipboardCheck, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense, useState } from 'react'
import { lazily } from 'react-lazily'
import { useParams } from 'react-router-dom'
import {Skeleton, Spiner} from '../../components/Loading'
import * as SubMenu from './submenu/Leave'

// const {LeaveType, Leaves} = lazily(()=>import('./submenu/Leave'));

const Leave = () => {
    const {page} = useParams();
    
    return (
        <>
            <div className="container-fluid">
                    {
                            page === 'type'? <Suspense fallback={<Skeleton/>}><SubMenu.LeaveType/></Suspense>:
                            page === 'dashboard'?<Suspense fallback={<Skeleton/>}><SubMenu.Leave/></Suspense>: 
                            null
                    }
            </div>
        </>
    )
}

export default Leave