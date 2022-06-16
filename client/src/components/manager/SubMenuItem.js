import React from 'react'
import { Link } from "react-router-dom";

function SubMenuItem({label}) {
  return (
    <>
        <li>
            <Link className="pl-4 no-underline !text-gray-500 w-100 block group" to="/" as="a">
                <span 
                    className="m-0 relative 
                    before:bg-black before:w-0 before:h-0.5 before:absolute before:bottom-0 before:left-0 before:ease-in-out before:duration-300
                    group-hover:before:w-full">{label}</span> 
            </Link>
        </li>
    </>
  )
}

export default SubMenuItem