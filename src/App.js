import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Admindash from './Admin/Admindash';
import Landing from './Pages/Landing';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/admin/*' element={<Admindash />} />
      </Routes>
    </div>
  );
}

export default App;
