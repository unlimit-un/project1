import { faEye } from '@fortawesome/free-solid-svg-icons'
import React, { Suspense, useState } from 'react'
// import { CardFillColorNonFooter } from '../../components/Cards'
import { Skeleton } from '../../components/Loading'
import { ModalButton, ModalCard } from '../../components/Modals'
import { MuiTable } from '../../components/Tables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lazily } from 'react-lazily'
import { useParams } from 'react-router-dom'
import * as SubMenu from './submenu/Work';

// const {CardFillColorNonFooter} = lazily(()=>import('../../components/Cards'));

const Work = () => {
  const {page} = useParams();
  return (
    <>
         <div className="container-fluid">
            {
                page==='dept'?<SubMenu.Workdept/>:
                page==='todo'?<SubMenu.Work/>:
                null
            }

         </div>
    </>
  )
}

export default Work