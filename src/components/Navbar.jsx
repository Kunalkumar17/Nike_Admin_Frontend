import React from 'react'
import {assets} from  '../assets/assets'
import { backendUrl } from '../App'
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const Logout = () =>{
    fetch(`${backendUrl}/admin_logout`,{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      credentials: 'include'
  }).then(res=>res.json())
    .then(data =>{
      if(data === 'cookie deleted'){
        navigate('/admin/')
      }
    })
  }

  return (
    <div className='flex items-center py-2 px-[4%] justify-between bg-white'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt=''/>
        <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:cursor-pointer' onClick={Logout}>Logout</button>
    </div>
  )
}

export default Navbar