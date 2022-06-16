import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Card({icon, color, label, content}) {
  const classContent = `card relative after:absolute after:bg-${color}-500 after:w-full after:h-1 after:left-0 after:top-0 h-full`
  return (
    <>
        <div className={classContent}>
          <div className="card-header">
            <h5 className="m-0 "> <FontAwesomeIcon icon={icon}/> {label}</h5>
          </div>
          <div className="card-body">
            {content}
          </div>
        </div>
        
    </>
  )
}

export default Card