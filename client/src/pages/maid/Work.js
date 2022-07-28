import React from 'react'
import { useParams } from "react-router-dom";
import { PageNotFound } from '../PageError';
import { Schedule, Todo } from './subMenu/Work';
const Work = () => {
  const { page } = useParams();
  console.log(page);
  return(
    <>
      { 
        page === 'schedule'?<Schedule/>:
        page === 'todo'?<Todo/>:
        <PageNotFound/>
      }
    </>
  )
}

export default Work