import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const LinkMenuM = ({path, icon, label}) => {
  return (
    <>
        <li className="list-group-item p-0 group">
          <Link className="p-2 px-3 text-gray-600 no-underline w-100 block group-hover:!text-white hover:bg-blue-500 ease-in-out duration-300" to={path} as="a">
            <FontAwesomeIcon icon={icon} className="text-black group-hover:!text-white ease-in-out duration-300"/> {label} 
          </Link>
        </li>
    </>
  )
}
