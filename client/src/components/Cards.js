import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState, } from 'react'

export const CardLineAfter = ({icon, afterLine, label, content}) =>{
  // const classContent = `card relative after:absolute after:bg-${color}-500 after:w-full after:h-1 after:left-0 after:top-0 h-full`
  return (
    <>
        <div className={`card relative after:absolute ${afterLine} after:w-full after:h-1 after:left-0 after:top-0 h-full`}>
          <div className="card-header">
            <h5 className="m-0 "> <FontAwesomeIcon icon={icon}/> {label}</h5>
          </div>
          <div className="card-body">
            {content}
          </div>
        </div>
    </>
  )
}

export const CardFillColor = ({title, subTitle, caption, colorBody, colorFooter}) => {
 
  return (
      <>
        <div className="card text-white">
          <div className={`card-body ${colorBody}`}>
              <p className="m-0 text-3xl">{title}</p>
              <p className="m-0 text-md">{subTitle}</p>
          </div>
          <div className={`card-footer text-center ${colorFooter}`}>
              <p className="m-0 ">{caption}</p>
          </div>
        </div>
      </>
  )
  
}

export const CardFillColorNonFooter = ({contentBody, classCard, classBody,}) => {
 
  return (
      <>
        <div className={`card ${classCard}`}>
          <div className={`card-body ${classBody}`}>
            {contentBody}
          </div>
        </div>
      </>
  )
  
}
export const CardFillColorNonFooterShadow = ({contentBody, classCard, classBody,}) => {
 
  return (
      <>
        <div className={`card shadow ${classCard}`}>
          <div className={`card-body ${classBody}`}>
            {contentBody}
          </div>
        </div>
      </>
  )
  
}
export const CardFillColorHeader = ({contentBody, classCard, classBody, classCardHeader, contentHeader}) => {
 
  return (
      <>
        <div className={`card ${classCard}`}>
          <div className={`card-header ${classCardHeader}`}>{contentHeader}</div>
          <div className={`card-body ${classBody}`}>
            {contentBody}
          </div>
        </div>
      </>
  )
  
}