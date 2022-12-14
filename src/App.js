import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Admindash from './Admin/Admindash';
import Landing from './Pages/Landing';
import Printpage from './Admin/Components/Printpage';
import MenuLanding from './Pages/MenuLanding';
import CategoryList from './Pages/CategoryList';
import ConfigureOrder from './Pages/ConfigureOrder';
import ConfirmOrders from './Pages/ConfirmOrders';
import TrayBtn from './Componets/TrayBtn';
import Attention from './Componets/Attention';
import QRScanpage from './Pages/QRScanpage';
import MobileLanding from './Pages/MobileLanding';
import ViewOrders from './Pages/ViewOrders';
import MyAccount from './Pages/MyAccount';
import RateUs from './Pages/RateUs';

function App() {
  
  return (
    <div className="App">
      <TrayBtn />
      <Attention />
      <Routes>
        <Route exact path='/*' element={<Landing />} />
        <Route exact path='/scanpage/*' element={<MobileLanding />} />
        <Route exact path='/admin/*' element={<Admindash />} />
        <Route exact path='/print' element={<Printpage />} />
        <Route exact path='/roasters/*' element={<MenuLanding />} />
        {/* add roasters before viewcategory */}
        <Route exact path='/viewcategory' element={<CategoryList />} />
        {/* <Route exact path='/roasters/setuporder' element={<ConfigureOrder />} /> */}
        <Route exact path='/roasters/confirmorder' element={<ConfirmOrders />} />
        <Route exact path='/yourorders' element={<ViewOrders />} />
        <Route exact path='/myaccount' element={<MyAccount />} />
        <Route exact path='/rateus' element={<RateUs />} />
      </Routes>
    </div>
  );
}

export default App;
