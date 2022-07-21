import React, { useState } from 'react'
import { NavbarManager } from '../../components/structure/NavbarM'
import { SidebarLeftManager } from '../../components/structure/SidebarM'

const Bookmarks = () => {
  const [open, setOpen] = useState({
    person: {
        status: false,
        id: 'person'
    },
    schedual: {
        status: false,
        id: 'schedual'
    },
    leave: {
        status: false,
        id: 'leave'
    },
});
  return (
    <>
        <NavbarManager/>
        <SidebarLeftManager open={open} setOpen={setOpen}/>
    </>
  )
}

export default Bookmarks