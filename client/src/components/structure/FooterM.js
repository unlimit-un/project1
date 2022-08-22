import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import React from 'react'
import ArticleFooter from '../Article'
import { Link } from 'react-router-dom';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

function FooterM() {
  const textContact = (
    <>
      <ul>
        <li>
          <a target="_blank" href="https://www.facebook.com/profile.php?id=100009630076896">
            <FontAwesomeIcon icon={faFacebook} className="transition-all duration-300 ease-in-out hover:!text-white hover:scale-150"/>
          </a>
          <span> นายณัฐสิทธิ์ อันอาน </span>
          <a href="tel:+66913747011">
            <FontAwesomeIcon icon={faPhone} className="transition-all duration-300 ease-in-out hover:!text-white hover:scale-150"/>
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.facebook.com/profile.php?id=100004610204748">
            <FontAwesomeIcon icon={faFacebook} className="transition-all duration-300 ease-in-out hover:!text-white hover:scale-150"/>
          </a> 
          <span> นายศุภัทรชัย รองศักดิ์ </span>
          <a href="tel:+66641120621">
            <FontAwesomeIcon icon={faPhone} className="transition-all duration-300 ease-in-out hover:!text-white hover:scale-150"/>
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.facebook.com/nawamin987987">
            <FontAwesomeIcon icon={faFacebook} className="transition-all duration-300 ease-in-out hover:!text-white hover:scale-150"/>
          </a> 
          <span>นางสาวศิริวิมล พันโน</span>
          {/* <a href="tel:+66913747011">
            <FontAwesomeIcon icon={faPhone} className="transition-all duration-300 ease-in-out hover:!text-white hover:scale-150"/>
          </a> */}
        </li>
      </ul>
    </>
  );
  const textAbout = "";
  return (
    <>
      <footer className="bg-blue-400 pt-3">
        <div className="flex justify-around py-5">
          <ArticleFooter title="เกี่ยวกับ" content={textAbout}/>
          <ArticleFooter title="ติดต่อผู้พัฒนา" content={textContact}/>
        </div>
        <p className="m-0 text-center bg-blue-300 text-white">Copyright &copy; 2022 MHM. All Right Reserved</p>
      </footer>
    </>
  )
}

export default FooterM