import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faEnvelopeOpenText, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { CardFillColorNonFooter } from '../components/Cards'
import  Logo from '../assets/Logo.jpg'
import  UserDemo from '../assets/business-man.png'
import  QRCode from '../assets/demo.jpg'
import { NavbarHomepage } from '../components/structure/NavbarM'
import FooterM from '../components/structure/FooterM'

const Contact = () => {
    // const tample =(
    //     <div className="container">
    //         <div className="py-4">
    //             <h2>ติดต่อสอบถาม</h2>
    //         </div>
    //         <div className="flex flex-row justify-center text-center">
    //             <div className="col-4  items-center">
    //                 <ul className="p-0 ">
    //                     <img src={LoGo} alt="Logo.jpg" className=" w-40 h-32 rounded"/>
    //                     <li>
    //                         <p className="m-0 text-black">Nuttasit Unarn</p>
    //                     </li>
    //                     <li>
    //                         <a href="tel:+66913747011" className="text-black no-underline"><FontAwesomeIcon icon={faPhone}/> 0913747011</a>
    //                     </li>  
    //                     <li>
    //                         <a target="_blank" href="https://www.facebook.com/profile.php?id=100009630076896">
    //                             <FontAwesomeIcon icon={faFacebook} className="transition-all duration-300 ease-in-out text-blue-600 hover:scale-150"/> Unlimit Uarn
    //                         </a>
    //                     </li> 
    //                     <li>
    //                         <p className="m-0 text-black"><FontAwesomeIcon icon={faEnvelope}/> unlimit705@gmail.com</p>
    //                     </li>
    //                 </ul>
    //             </div>
    //             <div className="col-4">
    //                 <ul className="p-0 ">
    //                     <img src={LoGo} alt="Logo.jpg" className=" w-40 h-32 rounded"/>
    //                     <li>
    //                         <p className="m-0 text-black py-2">Suphatarachai Rongsak</p>
    //                     </li>
    //                         <li>
    //                             <a href="tel:+66641120621" className="text-black no-underline scroll-m-3"><FontAwesomeIcon icon={faPhone}/> 06411210621</a>
    //                         </li>
    //                         <li>
    //                             <a target="_blank" href="https://www.facebook.com/profile.php?id=100004610204748">
    //                                 <FontAwesomeIcon icon={faFacebook} className="transition-all duration-300 ease-in-out text-blue-600 hover:scale-150"/> Suphatarachai Rongsak
    //                             </a>
    //                         </li>
    //                         <li>
    //                             <p className="m-0 text-black "><FontAwesomeIcon className="flex flex-row justify-start" icon={faEnvelope}/>suphatarachai1233@gmail.com </p>
    //                         </li>
    //                 </ul>
    //             </div>
    //             <div className="col-4">
    //                 <ul className="p-0 ">
    //                     <img src={LoGo} alt="Logo.jpg" className=" w-40 h-32 rounded"/>
    //                     <li>
    //                         <p className="m-0 text-black">Siriwimon panno</p>
    //                     </li>
    //                     <li>
    //                         <a href="tel:+66986316036" className="text-black no-underline"><FontAwesomeIcon icon={faPhone}/> 0986316036</a>
    //                     </li>
    //                     <li>
    //                         <a target="_blank" href="https://www.facebook.com/profile.php?id=100009630076896">
    //                              <FontAwesomeIcon icon={faFacebook} className="transition-all duration-300 ease-in-outtext-blue-600 hover:scale-150"/> Siriwimon Panno
    //                         </a>
    //                     </li>
    //                     <li>
    //                         <p className="m-0 text-black"><FontAwesomeIcon icon={faEnvelope}/> Siriwimin@gmail.com</p>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </div>
    //     </div>
    // )
  return (
    <>
        <NavbarHomepage/>
        <img src={Logo} alt="bg.png" className="w-full max-h-36" />
        <div className="bg-blue-200 container-fluid min-h-screen">
            <div className="container py-5">
                <div className="card max-w-3xl mx-auto -translate-y-20">
                    <div className="card-body">
                        <h1 className="text-2xl font-extrabold">ติดต่อสอบถาม</h1>
                        <div className="row row-cols-md-3 row-cols-1">
                            <div className="col border-r-2 border-r-slate-300">
                                <div className="flex flex-col gap-3 items-center">
                                    <img src={UserDemo} alt="UserDemo.png" className="w-36 h-36 rounded-circle" />
                                    <ul className="p-0 m-0 flex flex-col gap-2 mt-3">
                                        <li>
                                            <FontAwesomeIcon icon={faPhone}/> 091-374-7011
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faFacebook}/> Unlimit Unarn
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faEnvelopeOpenText}/> unlimit705@gmail.com
                                        </li>
                                    </ul>
                                    <img src={QRCode} alt="QRCode.png" className="w-20 h-20 rounded"  />
                                </div>
                            </div>
                            <div className="col border-r-2 border-r-slate-300">
                                <div className="flex flex-col gap-3 items-center">
                                    <img src={UserDemo} alt="UserDemo.png" className="w-36 h-36 rounded-circle" />
                                    <ul className="p-0 m-0 flex flex-col gap-2 mt-3">
                                        <li>
                                            <FontAwesomeIcon icon={faPhone}/> 091-374-7011
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faFacebook}/> Unlimit Unarn
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faEnvelopeOpenText}/> unlimit705@gmail.com
                                        </li>
                                    </ul>
                                    <img src={QRCode} alt="QRCode.png" className="w-20 h-20 rounded"  />
                                </div>
                            </div>
                            <div className="col">
                                <div className="flex flex-col gap-3 items-center">
                                    <img src={UserDemo} alt="UserDemo.png" className="w-36 h-36 rounded-circle" />
                                    <ul className="p-0 m-0 flex flex-col gap-2 mt-3">
                                        <li>
                                            <FontAwesomeIcon icon={faPhone}/> 091-374-7011
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faFacebook}/> Unlimit Unarn
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faEnvelopeOpenText}/> unlimit705@gmail.com
                                        </li>
                                    </ul>
                                    <img src={QRCode} alt="QRCode.png" className="w-20 h-20 rounded"  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-around">
                    <div className="col-md-3 col-12">
                        <img src={QRCode} alt="QRCode.png" className="" />
                    </div>
                    <div className="col-md-5 col-12">
                        <h1 className="text-2xl">จัดการตารางงาน ตารางเวร การลา</h1>
                        <ul className="m-0 p-0 list-item list-disc">
                            <li>จัดการตารางงานเป็นทีม</li>
                            <li>มอบหมายงานด่วน เพื่อให้งานไม่มีปัญหา</li>
                            <li>เช็ค list การทำงาน เพื่อความแม่นยำ</li>
                            <li>สามารถจัดการตารางงานตารางเวร</li>
                            <li>ระบบการลา ยื่นเรื่องลาได้</li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-around !mt-16">
                    <div className="col-md-3 col-12 order-2">
                        <img src={QRCode} alt="QRCode.png" className="" />
                    </div>
                    <div className="col-md-5 col-12 order-1">
                        <h1 className="text-2xl">สถานที่ แจ้งเตือนสถานะงานต่างๆ และการอนุมัติ</h1>
                        <ul className="m-0 p-0 list-item list-disc">
                            <li>เก็บข้อมูลสถานที่</li>
                            <li>แจ้งเตือนสถานะงาน</li>
                            <li>แจ้งเตือนการลา</li>
                            <li>แจ้งเตือนการขอสั่งซื้อวัสดุครุภัณฑ์</li>
                            <li>การอนุมัติ การลา การแจ้งซ่อม </li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-around !mt-16">
                    <div className="col-md-3 col-12">
                        <img src={QRCode} alt="QRCode.png" className="" />
                    </div>
                    <div className="col-md-5 col-12">
                        <h1 className="text-2xl">แจ้งซ่อม วัสดุครุภัณฑ์</h1>
                        <ul className="m-0 p-0 list-item list-disc">
                            <li>แจ้งซ่อมจากบุคคลภายนอก</li>
                            <li>แจ้งซ่อมภายใน</li>
                            <li>เช็ค stock วัสดุครุภัณฑ์</li>
                            <li>การขอสั่งซื้อครุภัณฑ์</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <FooterM/>
    </>
  )
  
}

export default Contact