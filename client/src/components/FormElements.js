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

export const InputGroupWithLabel= ({type, callback, id, label, disabled, placeholder, defaultValue, value}) =>{
    return (
        <>
            <div className="mb-3">
              <label htmlFor={id} className="form-label">{label}</label>
              <input 
                    type={type}
                    className="form-control" 
                    id={id} 
                    disabled={disabled}
                    required
                    placeholder={placeholder}
                    value= {value}
                    defaultValue={defaultValue}
                    onChange={callback}
                    autoComplete="off"
              />
            </div>
        </>
    )
}

export const InputGroupWithOutLabel= ({type, callback, id, disabled, placeholder, defaultValue, value, className, accept, name}) =>{
    return (
        <>
            <div className="mb-3">
              <input 
                    type={type}
                    className={`form-control ${className}`}
                    id={id} 
                    name={name}
                    disabled={disabled}
                    required
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={callback}
                    autoComplete="off"
                    accept= {accept}
              />
            </div>
        </>
    )
}
export const InputGroupWithOutLabelNotRequire= ({type, callback, id, disable, placeholder, defaultValue, value, className, accept, name}) =>{
    return (
        <>
            <div className="mb-3">
              <input 
                    type={type}
                    className={`form-control ${className}`}
                    id={id} 
                    name={name}
                    disabled={disable}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={callback}
                    autoComplete="off"
                    accept= {accept}
              />
            </div>
        </>
    )
}
export const TextAreawithlabel= ({type, callback, id, label, disabled, value}) =>{
    return (
        <>
            <div className="mb-3">
              <label htmlFor={id} className="form-label">{label}</label>
              <textarea 
                    className="form-control resize-none" 
                    id={id} 
                    disabled={disabled}
                    required
                    onChange={callback}
                    autoComplete="off"
                    value={value}
              />
            </div>
        </>
    )
}
export const SelectOptionWithLabel= ({callback, id, label, options_arr_obj, disabled, value, defaultValue}) =>{
   
    return (
        <>
            <div className="mb-3 flex flex-column">
              <label htmlFor={id} className="form-label">{label}</label>
              <select id={id} className="form-select" disabled={disabled} onChange={callback} value={value} defaultValue={defaultValue} required>
                {
                    options_arr_obj.map((item, index)=>{
                        return(
                            <option value={item.value} key={index}>{item.text}</option>
                        )
                    })
                }
              </select>
            </div>
        </>
    )
}
