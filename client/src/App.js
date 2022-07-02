import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePageM from './pages/manager/HomePageM';
import ManageEmp from './pages/manager/ManageEmp';

function App() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">



        <Routes>
          <Route path='/' exac element={<HomePage/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Route>
          <Route path='/manager' exac element={<HomePageM/>}>
            <Route path='/manage_emp' element={<ManageEmp/>} /> 

          </Route>

        </Routes>
      </div>
    </>
  );
}

export default App;
