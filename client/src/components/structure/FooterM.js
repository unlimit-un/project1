import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import React from 'react'
import ArticleFooter from '../Article'
import { Link } from 'react-router-dom';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function FooterM() {
  const textContact = (
    <>
     <div className="flex gap-3">
      <ul className="p-0 m-0">
        <li className="flex gap-x-2">
          <div className="bg-blue-500 text-white rounded-circle w-6 h-6 flex justify-center items-center">
            <FontAwesomeIcon icon={faEnvelope}/>
          </div>
          <div className="bg-blue-500 text-white rounded-circle w-6 h-6 flex justify-center items-center">
            <FontAwesomeIcon icon={faPhone}/>
          </div>
        </li>
      </ul>
      <div className="flex flex-col">
        <ul className="p-0 ">
          <li>
            <p className="m-0 text-white">Nuttasit Unarn</p>
          </li>
          <li>
            <a href="tel:+66913747011" className="text-white no-underline">+66913747011</a>
          </li>
          <li>
            <a href="tel:+66641120621" className="text-white no-underline"> +66641120621</a>
          </li>
          <li>
            <a href="tel:+66986316036" className="text-white no-underline">+66986316036</a>
          </li>
          <li>
            <p className="m-0 text-white">unlimit705@gmail.com</p>
          </li>
          <li>
            <a target="_blank" href="https://www.facebook.com/profile.php?id=100009630076896">
              <FontAwesomeIcon icon={faFacebook} className="transition-all duration-300 ease-in-out text-white hover:scale-150"/>
            </a>
          </li>
        </ul>
      </div>
     </div>
    </>
  );
  const textAbout = `
    website ที่ทำขึ้นเพื่ออำนวยความสะดวกในการจัดการงาน และบริหารงานในบริษัททำความสะอาด และซ่อมบำรุง เรามุ่งเน้นเพื่อให้บริษัทที่ต้องการตัวช่วยในการจัดการงานในบริษัท ได้มีการจัดกาตารางงานที่เป็นระบบมากยิ่งขึ้น และเป็นระบบที่มีหน้าตาและรูปแบบการทำงานที่ไม่ซับซ้อนทำให้ผู้ใช้งานระบบสามารถใช้งานได้อย่างครบถ้วนสมบูรณ์
  `;
  return (
    <>
      <footer className="bg-blue-400 pt-3">
        <div className="flex justify-around py-5">
          <ArticleFooter title="เกี่ยวกับ" content={textAbout}/>
          <ArticleFooter title="ติดต่อเรา" content={textContact}/>
        </div>
        <p className="m-0 text-center bg-blue-300 text-white">Copyright &copy; 2022 MHM. All Right Reserved</p>
      </footer>
    </>
  )
}

export default FooterM