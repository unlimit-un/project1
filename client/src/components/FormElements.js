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

export const InputGroupwitlabel= ({type, callback, id, label, disable}) =>{
    return (
        <>
            <div className="mb-3">
              <label htmlFor={id} className="form-label">{label}</label>
              <input 
                    type={type}
                    className="form-control" 
                    id={id} 
                    disabled={disable}
                    required
                    onChange={callback}
                
              />
            </div>
        </>
    )
}
export const SelectOptionWithLabel= ({callback, id, label, options}) =>{
   
    return (
        <>
            <div className="mb-3 flex flex-column">
              <label htmlFor={id} className="form-label">{label}</label>
              <select id={id} className="form-control">
                {
                    options.map((item, index)=>{
                        return(
                            <>
                                <option value={item.value} key={index}>{item.text}</option>
                            </>
                        )
                    })
                }
              </select>
            </div>
        </>
    )
}
