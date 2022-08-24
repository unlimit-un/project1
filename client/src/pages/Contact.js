import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { CardFillColorNonFooter } from '../components/Cards'
import  LoGo from '../assets/Logo.jpg'

const Contact = () => {
    const tample =(
        <div className="container">
            <div className="py-4">
                <h2>ติดต่อสอบถาม</h2>
            </div>
            <div className="flex flex-row justify-center text-center">
                <div className="col-4  items-center">
                    <ul className="p-0 ">
                        <img src={LoGo} alt="Logo.jpg" className=" w-40 h-32 rounded"/>
                        <li>
                            <p className="m-0 text-black">Nuttasit Unarn</p>
                        </li>
                        <li>
                            <a href="tel:+66913747011" className="text-black no-underline"><FontAwesomeIcon icon={faPhone}/> 0913747011</a>
                        </li>  
                        <li>
                            <a target="_blank" href="https://www.facebook.com/profile.php?id=100009630076896">
                                <FontAwesomeIcon icon={faFacebook} className="transition-all duration-300 ease-in-out text-blue-600 hover:scale-150"/> Unlimit Uarn
                            </a>
                        </li> 
                        <li>
                            <p className="m-0 text-black"><FontAwesomeIcon icon={faEnvelope}/> unlimit705@gmail.com</p>
                        </li>
                    </ul>
                </div>
                <div className="col-4">
                    <ul className="p-0 ">
                        <img src={LoGo} alt="Logo.jpg" className=" w-40 h-32 rounded"/>
                        <li>
                            <p className="m-0 text-black py-2">Suphatarachai Rongsak</p>
                        </li>
                            <li>
                                <a href="tel:+66641120621" className="text-black no-underline scroll-m-3"><FontAwesomeIcon icon={faPhone}/> 06411210621</a>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.facebook.com/profile.php?id=100004610204748">
                                    <FontAwesomeIcon icon={faFacebook} className="transition-all duration-300 ease-in-out text-blue-600 hover:scale-150"/> Suphatarachai Rongsak
                                </a>
                            </li>
                            <li>
                                <p className="m-0 text-black "><FontAwesomeIcon className="flex flex-row justify-start" icon={faEnvelope}/>suphatarachai1233@gmail.com </p>
                            </li>
                    </ul>
                </div>
                <div className="col-4">
                    <ul className="p-0 ">
                        <img src={LoGo} alt="Logo.jpg" className=" w-40 h-32 rounded"/>
                        <li>
                            <p className="m-0 text-black">Siriwimon panno</p>
                        </li>
                        <li>
                            <a href="tel:+66986316036" className="text-black no-underline"><FontAwesomeIcon icon={faPhone}/> 0986316036</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://www.facebook.com/profile.php?id=100009630076896">
                                 <FontAwesomeIcon icon={faFacebook} className="transition-all duration-300 ease-in-outtext-blue-600 hover:scale-150"/> Siriwimon Panno
                            </a>
                        </li>
                        <li>
                            <p className="m-0 text-black"><FontAwesomeIcon icon={faEnvelope}/> Siriwimin@gmail.com</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
  return (
    <>
        <CardFillColorNonFooter contentBody={tample} classCard="w-full" />
    </>
  )
  
}

export default Contact