import React from 'react'

const Spiner = () => {
  return (
    <>
        <h5 className="text-purple-600 flex gap-2">
            <svg 
                className="animate-spin h-6 w-6 rounded-full bg-transparent border-2 border-transparent border-opacity-50  border-t-purple-600 border-r-purple-600" 
                viewBox="0 0 24 24">
            </svg>
            กำลังโหลดข้อมูล
        </h5>
    </>
  )
}

export default Spiner