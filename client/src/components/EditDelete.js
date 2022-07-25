import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { ModalButton } from './Modals'

export const EditDelete = ({EditFnc, DeleteFnc, setModalShow}) => {
  return (
    <>
        <div className="flex justify-center gap-2">
            <ModalButton callback={EditFnc} classBtn="text-warning" icon={faPencil} setModalShow={setModalShow} />
            <button className="text-danger" onClick={()=>{DeleteFnc()}}><FontAwesomeIcon icon={faTrashAlt}/></button>
        </div>
    </>
  )
}

export const Delete = () =>{
  return (
    <>
        <div className="flex justify-center gap-2">
            <button className="text-danger"><FontAwesomeIcon icon={faTrashAlt}/></button>
        </div>
    </>
  )
}
