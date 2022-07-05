import { faBell, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { ListGroupDropdownItem, ListGroupFlushWithLink } from '../../components/manager/subComponents/ListGroup'

function Notify() {
    const listGroup = [
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."},
        {title:"unlimit", icon: faUsers, path:"/", link_name:"ข้อมูลเพิ่มเติม",detail:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ipsam."}
    ]
    const [classButton, setClassButton] = useState({
        all:true,
        not_read:false,
        className:{
            active: 'bg-blue-500 hover:bg-blue-400 text-white',
            non_active: 'text-blue-500 hover:bg-blue-200'
        }
    })
    return (
        <>
            <div className="container">
                <div className="card card-body">
                    <h1 className="text-2xl"><FontAwesomeIcon icon={faBell}/> การแจ้งเตือน</h1>
                    <div className="flex gap-2">
                        <button 
                            className={ ` text-lg rounded-lg p-2 ${classButton.all?classButton.className.active:classButton.className.non_active}`}
                            onClick={()=>setClassButton({...classButton, all:true, not_read: false})} 
                        >ทั้งหมด</button>
                        <button 
                            className={ ` text-lg rounded-lg p-2 ${classButton.not_read?classButton.className.active:classButton.className.non_active}`}
                            onClick={()=>setClassButton({...classButton, all:false, not_read: true})} 
                        >ยังไม่อ่าน</button>
                    </div>
                    <h5 className="mt-3">ก่อนหน้านี้</h5>
                    <ListGroupFlushWithLink lists={listGroup}/>
                </div>
            </div>
        </>
    )
}

export default Notify