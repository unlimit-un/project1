import React from 'react'
import {useParams} from 'react-router-dom'
import { PageNotFound } from '../PageError'
import { EventCalendar, EventTodo } from './submenu/Event'

const Event = () => {

  const {page} = useParams()

  return (
    <>
      {
        page === 'calendar' ? <EventCalendar/> :
        page === 'todo'? <EventTodo/>:
        <PageNotFound/>
      }
    </>
  )
}

export default Event