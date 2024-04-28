import React from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import Contact from '../pages/Contact/Contact';
import Register from '../pages/Register/Register';
import AboutUs from '../pages/AboutUs/About';
import HostingPlans from '../pages/HostingPlans/HostingPlan';
import Payment from '../pages/Payment/Payment';
import Glosary from '../pages/Glosary/Glosary';
import UserArea from '../pages/UserArea/UserArea';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/hostingPlans' element={<HostingPlans />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/glosary' element={<Glosary />} />
        <Route path='/userArea' element={<UserArea />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
