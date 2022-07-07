import React from 'react'
import Navbar from '../../components/manager/NavbarM'
import { SidebarLeftManager } from '../../components/manager/SidebarM'

const Bookmarks = ({open, setOpen}) => {
  return (
    <>
        <Navbar/>
        <SidebarLeftManager open={open} setOpen={setOpen}/>
    </>
  )
}

export default Bookmarks