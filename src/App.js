import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Admindash from './Admin/Admindash';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/admin/*' element={<Admindash />} />
      </Routes>
    </div>
  );
}

export default App;
