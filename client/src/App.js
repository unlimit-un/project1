import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import { HomePageM } from './pages/manager/HomePageM';


function App() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path='/' exac element={<HomePage/>}/>
          <Route path='/manager' exac element={<HomePageM/>}/>

        </Routes>
      </div>
    </>
  );
}

export default App;
