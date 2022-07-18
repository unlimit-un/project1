import React from 'react'
import { NavbarManager } from '../../components/NavbarM'
import { SidebarLeftManager } from '../../components/SidebarM'

const Bookmarks = ({open, setOpen}) => {
  return (
    <>
        <NavbarManager/>
        <SidebarLeftManager open={open} setOpen={setOpen}/>
    </>
  )
}

export default Bookmarks