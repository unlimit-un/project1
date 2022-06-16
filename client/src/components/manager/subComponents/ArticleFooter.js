import React from 'react'

function ArticleFooter({title, content}) {
  return (
    <>
        <article className="flex flex-column text-left max-w-sm">
            <h5 className="m-0 first-letter:text-pink-600 font-extrabold text-2xl">{title}</h5>
            <p className="m-0">{content}</p>
        </article>
    </>
  )
}

export default ArticleFooter