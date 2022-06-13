import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const LinkMenuM = ({path, icon, label}) => {
  return (
    <>
        <li><Link className="px-2 no-underline text-black w-100 block border-b-2" to={path} as="a"><FontAwesomeIcon icon={icon}/> {label} </Link></li>
    </>
  )
}
