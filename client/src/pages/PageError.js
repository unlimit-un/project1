import React from 'react'
import { Link } from 'react-router-dom'
import Page403 from '../assets/403Page.png'
import Page404Img from '../assets/404Page.png'
import UnderConstruction from '../assets/under-construction.png'

export const PageForbidden = () => {
  return (
    <>
        <div className="min-h-screen bg-blue-200 flex items-center justify-center flex-col">
            <img src={Page403} alt="404-img.png" className="w-72 h-72 animate-bounce" />
            <h4 className="text-purple-600">ERROR: Forbidden Error</h4>
            <Link to="/">หน้าหลัก</Link>
        </div>
    </>
  )
}

export const PageNotFound = () => {
    return (
      <>
          <div className="min-h-screen bg-blue-200 flex items-center justify-center flex-col">
              <img src={Page404Img} alt="404-img.png" className="w-72 h-72 animate-bounce" />
              <h4 className="text-purple-600">ERROR: Page Not Found</h4>
              <Link to="/">หน้าหลัก</Link>
          </div>
      </>
    )
  }

export const PageUnderConstrunction = () => {
  return (
    <>
        <div className="min-h-screen bg-blue-200 flex items-center justify-center flex-col">
            <img src={UnderConstruction} alt="404-img.png" className="w-96 h-96 animate-pulse"  />
            <h4 className="text-purple-600">Page Under Construction</h4>
            <Link to="/">หน้าหลัก</Link>
        </div>
    </>
  )
}