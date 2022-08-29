import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faEnvelopeOpenText, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { CardFillColorNonFooter } from '../components/Cards'
import  UserDemo from '../assets/business-man.png'
import  QRCode from '../assets/qrcode.png'
import  About1 from '../assets/About1.png'
import  About2 from '../assets/About2.png'
import  About3 from '../assets/About3.png'
import  Page from '../assets/page.jpg'
import  Imgmin from '../assets/siri.jpg'
import  Imgnick from '../assets/nick.jpg'
import  Imgunlimit from '../assets/unlimit.jpg'
import { NavbarHomepage } from '../components/structure/NavbarM'
import FooterM from '../components/structure/FooterM'

const Contact = () => {
    
  return (
    <>
        <NavbarHomepage/>
        <img src={Page} alt="page.jpg" className="w-full max-h-36" />
        <div className="bg-blue-200 container-fluid min-h-screen">
            <div className="container py-5">
                <div className="card max-w-3xl mx-auto -translate-y-20">
                    <div className="card-body">
                        <h1 className="text-2xl font-extrabold">ติดต่อสอบถาม</h1>
                        <div className="row row-cols-md-3 row-cols-1">
                            <div className="col border-r-2 border-r-slate-300">
                                <div className="flex flex-col gap-3 items-center">
                                    <img src={Imgunlimit} alt="unlimit.jpg" className="w-36 h-36 rounded-circle" />
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
                                    <img src={QRCode} alt="qrcode.png" className="w-20 h-20 rounded"  />
                                </div>
                            </div>
                            <div className="col border-r-2 border-r-slate-300">
                                <div className="flex flex-col gap-3 items-center">
                                    <img src={Imgmin} alt="siri.jpg" className="w-36 h-36 rounded-circle" />
                                    <ul className="p-0 m-0 flex flex-col gap-2 mt-3">
                                        <li>
                                            <FontAwesomeIcon icon={faPhone}/> 098-631-6036
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faFacebook}/> Siriwimon Panno
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faEnvelopeOpenText}/> nawamin987987@gmail.com
                                        </li>
                                    </ul>
                                    <img src={QRCode} alt="qrcode.png" className="w-20 h-20 rounded"  />
                                </div>
                            </div>
                            <div className="col">
                                <div className="flex flex-col gap-3 items-center">
                                    <img src={Imgnick} alt="nick.jpg" className="w-36 h-36 rounded-circle" />
                                    <ul className="p-0 m-0 flex flex-col gap-2 mt-3">
                                        <li>
                                            <FontAwesomeIcon icon={faPhone}/> 091-374-7011
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faFacebook}/> SupataraChai
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
                        <img src={About3} alt="About3.png" className="" />
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
                        <img src={About2} alt="About2.png" className="" />
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
                        <img src={About1} alt="About1.png" className="" />
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