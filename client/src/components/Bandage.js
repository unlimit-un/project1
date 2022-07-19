import React from 'react'

export const Bandage = ({ classBandage, text }) => {
  return (
    <>
      <span className={`badge !font-medium !text-sm ${classBandage}`}>{text}</span>
    </>
  )
}
