import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
export const ListGroupFlushWithLink = ({lists}) => {
  return (
    <>
        <ul className="list-none p-1" >
            {
                lists.map((item, i)=>{
                    return (
                        <li className="" key={i}>
                            <div className="flex justify-end">
                            <button className="btn-close btn btn-primary btn-sm btn btn-outline-danger"></button>
                            </div>
                            <h6 className="text-sm"><FontAwesomeIcon icon={item.icon}/> {item.title}</h6>
                            <p>{item.detail}</p>
                            <div className="flex justify-end"><Link to={item.path}>{item.link_name}</Link></div>
                            <hr />
                        </li>
                    )
                })
            }
            
        </ul>
    </>
  )
}

export const ListGroupFlush = ({lists}) => {
    return (
        <>
            <ul className="list-group list-group-flush" >
                {
                    lists.map((item, i)=>{
                        return (
                            <li className="list-group-item" key={i}>
                                <p>{item.detail}</p>
                            </li>
                        )
                    })
                }
                
            </ul>
        </>
    )
}

export const ListGroupDropdownItem = ({lists}) => {
    return (
      <>
        {
            lists.map((item, i)=>{
                return(
                    <Dropdown.ItemText key={i}>
                        <h6 className="text-sm"><FontAwesomeIcon icon={item.icon}/> {item.title}</h6>
                        <p>{item.detail}</p>
                        <div className="flex justify-end"><Link as="a" to={item.path}>{item.link_name}</Link></div>
                        <hr />
                    </Dropdown.ItemText> 
                )
            })
        }
      </>
    )
  }
