import React, { use, useEffect, useState } from 'react'
import Navbar from './components/NavBar'
import Sidebar from './components/Sidebar'
import { Outlet, Route, Routes } from 'react-router-dom'
import { AddProduct } from './pages/AddProduct'
import { ListProduct } from './pages/ListProduct'
import Orders from './pages/Orders'
import Login from './components/Login'
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { toast, ToastContainer } from 'react-toastify';
export const currency = "$";


const App = () => {

  const [token , setToken] = useState(false);

  useEffect(() => {
    fetch(`${backendUrl}/admin`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data === 'Success as Admin') {
          setToken(true);
          toast.success(data)
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
      });
  }, []);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === false ? <Login setToken={setToken}/>:
      <>
      <Navbar />
      <hr/>
      <div className='flex w-full'>
        <Sidebar/>
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
        <Outlet />
        </div>
      </div>
    </>
}
    </div>
  )
}

export default App