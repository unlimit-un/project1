import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const LinkMenuM = ({path, icon, label, resetDropDown}) => {
  return (
    <>
        <li className="p-0 group">
          <Link onClick={resetDropDown} className="p-2 px-3 text-gray-600 no-underline text-sm w-100 block group-hover:!text-white hover:bg-blue-500 ease-in-out duration-300" to={path} as="a">
            <FontAwesomeIcon icon={icon} className="text-black group-hover:!text-white ease-in-out duration-300"/> {label} 
          </Link>
        </li>
    </>
  )
}


export const SubMenuLink = ({label, path}) => {
  return (
    <>
        <li>
            <Link className="pl-4 no-underline !text-gray-500 w-100 block group" to={`${path}`} as="a">
                <span 
                    className="m-0 relative 
                    before:bg-black before:w-0 before:h-0.5 before:absolute before:bottom-0 before:left-0 before:ease-in-out before:duration-300
                    group-hover:before:w-full">{label}</span> 
            </Link>
        </li>
    </>
  )
}
