import React from 'react'
import { Link } from 'react-router-dom'
import Page404Img from '../assets/404-img.png'

const PageNotFound = () => {
  return (
    <>
        <div className="min-h-screen bg-slate-300 flex items-center justify-center flex-col">
            <img src={Page404Img} alt="404-img.png" className="w-96 h-96 animate-bounce" />
            <h4 className="text-purple-600">Page Not Found</h4>
            <Link to="/">หน้าหลัก</Link>
        </div>
    </>
  )
}

export default PageNotFound