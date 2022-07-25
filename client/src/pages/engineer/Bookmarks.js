import React, { useState } from 'react'

import { NavbarEn } from '../../components/structure/NavbarM'
import { SidebarLeftEn } from '../../components/structure/SidebarM'

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
        <NavbarEn/>
        <SidebarLeftEn open={open} setOpen={setOpen}/>
    </>
  )
}

export default Bookmarks