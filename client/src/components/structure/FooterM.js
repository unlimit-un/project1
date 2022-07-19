import React from 'react'
import ArticleFooter from '../Article'

function FooterM() {
  const content = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequatur laborum fuga quas ex facilis provident totam excepturi quis perferendis magni consequuntur porro saepe molestiae eaque deserunt, incidunt cupiditate a!`
  return (
    <>
      <footer className="bg-blue-400 pt-3">
        <div className="flex justify-around py-5">
          <ArticleFooter title="เกี่ยวกับ" content={content}/>
          <ArticleFooter title="ติดต่อ" content={content}/>
        </div>
        <p className="m-0 text-center bg-blue-300 text-white">Copyright &copy; 2022 MHM. All Right Reserved</p>
      </footer>
    </>
  )
}

export default FooterM