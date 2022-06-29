import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const RadioInline = ({id, value, label, name, callback}) => {
  return (
    <>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id={id} value={value} name={name} onClick={callback}/>
            <label className="form-check-label" htmlFor={id}>{label}</label>
        </div>
    </>
  )
}

export const Radio = ({id, value, label, name}) => {
  return (
    <>
        <div className="form-check">
            <input className="form-check-input" type="radio" id={id} value={value} name={name}/>
            <label className="form-check-label" htmlFor={id}>{label}</label>
        </div>
    </>
  )
}

export const InputGroupIconsSupfix = ({type, placeholder, callback, icon}) =>{
    return (
        <>
            <div className="input-group mb-3 input-group-lg">
                <input 
                    type={type} 
                    className="form-control" 
                    placeholder={placeholder}
                    required
                    onChange={callback}
                /> 
                <span className="input-group-text"><FontAwesomeIcon icon={icon}/></span>
            </div> 
        </>
    )
}

export const InputGroupwitlabel= ({type, placeholder, callback, id, label}) =>{
    return (
        <>
            <div className="mb-3">
              <label htmlFor={id} className="form-label">{label}</label>
              <input 
                    type={type}
                    className="form-control" 
                    id={id} 
                    placeholder={placeholder}
                    required
                    onChange={callback}
                
              />
            </div>
        </>
    )
}