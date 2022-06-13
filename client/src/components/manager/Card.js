import React from 'react'
import Logo from '../../assets/demo.jpg'

function Card() {
  return (
    <>
        <div class="container p-5 my-3 border border-3 border-dark bg-white rounded">
            <div className ="flex items-top col">    
              <img src={Logo} alt="Logo.jpg" className="rounded-circle w-16 h-16"/>
              <p className="mb-0 ml-5 text-dark-50 bold text-2xl">คำขออนุมัติ</p>
            </div>
        
        </div>
        <div class="container p-5 my-3 border border-3 border-dark bg-white rounded">
            <div className ="flex items-top col">    
              <img src={Logo} alt="Logo.jpg" className="rounded-circle w-16 h-16"/>
              <p className="mb-0 ml-5 text-dark-50 bold text-2xl">คำขออนุมัติ</p>
              
            </div>
           
        
        </div>
    </>
  )
}

export default Card