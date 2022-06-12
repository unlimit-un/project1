import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage';
function App() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="flex justify-center items-center min-h-screen">
          <h1 className="m-0 text-2xl text-black">Hello Project</h1>
        </div>
        <Routes>
          <Route path='/' exac element={<HomePage/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
