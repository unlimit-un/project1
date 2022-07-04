import React from 'react'

export const Bandage = ({ classBandage, text }) => {
  return (
    <>
      <span className={`badge !font-medium !text-sm w-1/2 ${classBandage}`}>{text}</span>
    </>
  )
}
