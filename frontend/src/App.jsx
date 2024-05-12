import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './Home';
import UserMenu from './layout/UserMenu';
import Dashboard from './component/Dashboard';
import MyEvents from './component/MyEvents';
import MyBookings from './component/MyBookings';
import BookingTicket from './component/BookingTicket';
import Contact from './component/Contact';
const App = () => {
  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route exact path='/' element={<UserMenu/>}>
        <Route index element={<Navigate to='/dashboard' />}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/events' element={<MyEvents/>} />
        <Route path='/bookings' element={<MyBookings/>} />
        <Route path='/contact' element={<Contact/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App