import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage';
function App() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path='/' exac element={<HomePage/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
