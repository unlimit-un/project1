import React from 'react'

export const Spiner = () => {
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

export const Skeleton = () =>{
  return (
    <>
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-400 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
