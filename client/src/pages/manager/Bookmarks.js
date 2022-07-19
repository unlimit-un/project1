import React from 'react'
import { NavbarManager } from '../../components/structure/NavbarM'
import { SidebarLeftManager } from '../../components/structure/SidebarM'

const Bookmarks = ({open, setOpen}) => {
  return (
    <>
        <NavbarManager/>
        <SidebarLeftManager open={open} setOpen={setOpen}/>
    </>
  )
}

export default Bookmarks