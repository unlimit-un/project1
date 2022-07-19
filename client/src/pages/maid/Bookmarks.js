import React from 'react'

import { NavbarManager } from '../../components/structure/NavbarM'
import { SidebarLeftMaid } from '../../components/structure/SidebarM'

const Bookmarks = ({open, setOpen}) => {
  return (
    <>
        <NavbarManager/>
        <SidebarLeftMaid open={open} setOpen={setOpen}/>
    </>
  )
}

export default Bookmarks