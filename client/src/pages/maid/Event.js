
import React, { useState,Suspense, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { PageNotFound } from '../PageError'
import { EventCarlendar, EventTodo } from './subMenu/Event'

const Event = () => {

const {page} = useParams ()

  return (
    <>
     {
      page === 'calendar' ? <EventCarlendar/> :
      page === 'todo' ? <EventTodo/> :
      <PageNotFound/>
     }
       
    
    </>
  )
}

export default Event