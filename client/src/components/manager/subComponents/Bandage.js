import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const BandageRequest = ({text, buttonText}) => {
  const classBandage = text ==='อนุมัติ'?'bg-green-500':text === 'ไม่อนุมัติ'?'bg-red-500':'bg-amber-400'
  return (
    <>
        <div className="flex justify-around items-baseline gap-2 text-center">
            <span className={`badge ${classBandage} !font-medium !text-sm w-1/2`}>{text}</span>
            <button className="btn btn-outline-primary !text-sm w-1/2"><FontAwesomeIcon icon={faEye}/></button>
        </div>
    </>
  )
}
