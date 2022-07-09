import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import IndexManager from './pages/manager/Index';
import ManageEmp from './pages/manager/ManageEmp';
import HomepageE from './pages/engineer/HomepageE';
import HomePageMaid from './pages/made/HomePageMaid';
import { PageForbidden, PageNotFound, PageUnderConstrunction} from './pages/PageError';
import Material from './pages/manager/Material';
import Request from './pages/manager/Request';
import Leave from './pages/manager/Leave';
import Repair from './pages/manager/Repair';
import Notify from './pages/manager/Notify';
import Bookmarks from './pages/manager/Bookmarks';
import Calendar from './pages/manager/Calendar';
import SchedualWork from './pages/manager/SchedualWork';
import Location from './pages/manager/Location';

function App() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path='/' exac element={<HomePage/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Route>
          <Route path='/manager' exac element={<IndexManager/>}>
            <Route path='/manager/manage_emp/:page' element={<ManageEmp/>} /> 
            <Route path='/manager/material' element={<Material/>} /> 
            <Route path='/manager/request' element={<Request/>} /> 
            <Route path='/manager/leave' element={<Leave/>} /> 
            <Route path='/manager/repair' element={<Repair/>} /> 
            <Route path='/manager/notify' element={<Notify/>} /> 
            <Route path='/manager/bookmarks' element={<Bookmarks/>} /> 
            <Route path='/manager/location' element={<Location/>} /> 
            <Route path='/manager/schedual_work/:page' element={<SchedualWork/>} /> 
          </Route>
          <Route path='/maid' exac element={<HomePageMaid/>}/>
          <Route path='/engineer' exac element={<HomepageE/>}/>
          <Route path='/forbidden' exac element={<PageForbidden/>}/>
          <Route path='/under_construction' exac element={<PageUnderConstrunction/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
