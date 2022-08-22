import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import React from 'react'
import ArticleFooter from '../Article'
import { Link } from 'react-router-dom';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

function FooterM() {
  const textContact = (
    <>
      <a target="_blank" href="https://www.facebook.com/profile.php?id=100009630076896">
        <FontAwesomeIcon icon={faFacebook} className="transition-all duration-300 ease-in-out text-white hover:scale-150"/>
      </a>
      <ul className="p-0 ">
        <li>
          <a href="tel:+66913747011" className="text-white">+66913747011</a>
        </li>
        <li>
          <a href="tel:+66641120621" className="text-white"> +66641120621</a>
        </li>
        <li>
          <a href="tel:+66986316036" className="text-white">+66986316036</a>
        </li>
      </ul>
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