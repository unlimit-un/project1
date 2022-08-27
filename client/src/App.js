import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import HomepageE from './pages/engineer/HomepageE';
import { PageForbidden, PageNotFound, PageUnderConstrunction} from './pages/PageError';
import * as Manager from './pages/manager/ImportManager'
import * as Maid from './pages/maid/ImportMaid';
import * as En from './pages/engineer/ImportEn';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <>
        {/* Routing */}
        <Routes>
          <Route path='/' exac element={<HomePage/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Route>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/manager' exac element={<Manager.IndexManager/>}>
            <Route path='/manager/manage_emp/:page' element={<Manager.ManageEmp/>} /> 
            <Route path='/manager/material' element={<Manager.Material/>} /> 
            <Route path='/manager/request' element={<Manager.Request/>} /> 
            <Route path='/manager/leave/:page' element={<Manager.Leave/>} /> 
            <Route path='/manager/repair' element={<Manager.Repair/>} /> 
            <Route path='/manager/notify' element={<Manager.Notify/>} /> 
            <Route path='/manager/bookmarks' element={<Manager.Bookmarks/>} /> 
            <Route path='/manager/location' element={<Manager.Location/>} /> 
            <Route path='/manager/schedual_work/:page' element={<Manager.SchedualWork/>} /> 
            <Route path='/manager/maid_duty/:page' element={<Manager.MaidDuty/>} /> 
          </Route>
          <Route path='/maid' exac element={<Maid.Index/>}>
            <Route path='/maid/work/:page' element={<Maid.Work/>} /> 
            <Route path='/maid/urgent' element={<Maid.Urgent/>} /> 
            <Route path='/maid/repair' element={<Maid.Repair/>} /> 
            <Route path='/maid/material' element={<Maid.Material/>} /> 
            <Route path='/maid/bookmarks' element={<Maid.BookMarks/>} /> 
            <Route path='/maid/leave' element={<Maid.Leave/>} /> 
            <Route path='/maid/event/:page' element={<Maid.Event/>} /> 
          </Route>
          <Route path='/engineer' exac element={<En.Index/>}>
              <Route path='/engineer/work/:page' element={<En.Work/>} /> 
              <Route path='/engineer/urgent' element={<En.Urgent/>} />
              <Route path='/engineer/material' element={<En.Material/>} /> 
              <Route path='/engineer/bookmarks' element={<En.Bookmarks/>} /> 
              <Route path='/engineer/leave' element={<En.Leave/>} /> 
              <Route path='/engineer/event/:page' element={<En.Event/>} /> 
          </Route>
          <Route path='/forbidden' exac element={<PageForbidden/>}/>
          <Route path='/under_construction' exac element={<PageUnderConstrunction/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    </>
  );
}

export default App;
