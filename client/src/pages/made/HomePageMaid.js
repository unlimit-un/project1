import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { checkAutoRedirectUser, SignOutFunc } from '../../functions/AuthFunc'


const HomepageMaid = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    useEffect(()=>{
        checkAutoRedirectUser(navigate, pathname)
    },[])
    return (
        <>
            <h1>Maid</h1>
            <button onClick={()=>SignOutFunc(navigate)} className="p-2 px-3 text-gray-600 no-underline w-100 block group-hover:!text-white hover:bg-red-500 ease-in-out duration-300 text-left">
                <FontAwesomeIcon icon={faPowerOff} className="text-black group-hover:!text-white ease-in-out duration-300"/> ออกจากระบบ
            </button>
        </>
        
    )
}

export default HomepageMaid