import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const EditDelete = () => {
  return (
    <>
        <div className="flex justify-center gap-2">
            <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
            <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
        </div>
    </>
  )
}

export default EditDelete