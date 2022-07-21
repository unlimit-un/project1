import React, { useState } from 'react'

import { NavbarManager } from '../../components/structure/NavbarM'
import { SidebarLeftMaid } from '../../components/structure/SidebarM'

const Bookmarks = () => {
  const [open, setOpen] = useState({
    work: {
        status: false,
        id: 'work'
    },
    event: {
        status: false,
        id: 'event'
    },
    leave: {
        status: false,
        id: 'leave'
    }
});
  return (
    <>
        <NavbarManager/>
        <SidebarLeftMaid open={open} setOpen={setOpen}/>
    </>
  )
}

export default Bookmarks