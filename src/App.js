import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Admindash from './Admin/Admindash';
import Landing from './Pages/Landing';
import Printpage from './Admin/Components/Printpage';
import MenuLanding from './Pages/MenuLanding';
import CategoryList from './Pages/CategoryList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/*' element={<Landing />} />
        <Route exact path='/admin/*' element={<Admindash />} />
        <Route exact path='/print' element={<Printpage />} />
        <Route exact path='/roasters/*' element={<MenuLanding />} />
        <Route exact path='/roasters/viewcategory' element={<CategoryList />} />
      </Routes>
    </div>
  );
}

export default App;
