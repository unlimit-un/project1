import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePageM from './pages/manager/HomePageM';
import HomepageE from './pages/engineer/HomepageE';
import HomePageMaid from './pages/made/HomePageMaid';

function App() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">



        <Routes>
          <Route path='/' exac element={<HomePage/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Route>
          <Route path='/manager' exac element={<HomePageM/>}/>
          <Route path='/maid' exac element={<HomePageMaid/>}/>
          <Route path='/engineer' exac element={<HomepageE/>}/>

        </Routes>
      </div>
    </>
  );
}

export default App;
