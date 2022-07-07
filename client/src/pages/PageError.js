import React from 'react'
import { Link } from 'react-router-dom'
import Page404Img from '../assets/Error-Bg.png'

export const PageForbidden = () => {
  return (
    <>
      {/* <div className="min-h-screen flex items-center justify-center flex-col"> */}
        <div className="min-h-screen flex items-center justify-center flex-col" style={{backgroundImage: `url(${Page404Img})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
            {/* <img src={Page404Img} alt="404-img.png" className="w-96 h-96 animate-bounce" /> */}
            <h4 className="lg:text-8xl md:text-6xl text-4xl font-bold text-white leading-relaxed animate-bounce text-center " style={{textShadow: " 0 0 70px 	#000080"}}> 403 <br/> Page Forbidden</h4>
            <Link to="/" className="md:text-4xl">หน้าหลัก</Link>
        </div>
    </>
  )
}

export const PageNotFound = () => {
    return (
      <>
          <div className="min-h-screen flex items-center justify-center flex-col">
              <img src={Page404Img} alt="404-img.png" className="w-96 h-96 animate-bounce" />
              <h4 className="text-purple-600">Page Not Found</h4>
              <Link to="/">หน้าหลัก</Link>
          </div>
      </>
    )
  }
