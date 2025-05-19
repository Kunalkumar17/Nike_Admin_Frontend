import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function Login({setToken}) {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [emailError , setemailError] = useState('');
    const [passwordError , setpasswordError] = useState('');
    const navigate = useNavigate()

    const handleSubmit =  async(e) => {
     e.preventDefault();
     setemailError('');
        setpasswordError('');
        try {
            console.log(backendUrl);
            const res = await fetch(`${backendUrl}/admin_login`, {
                method: 'POST',
                body: JSON.stringify({ email , password }),
                headers: { 'Content-Type' : 'application/json' },
                credentials: 'include'
            });
            const data = await res.json();
            if(data === 'Login Successfull'){
                setToken(true);
            }
            if(data.errors) {
                toast.error(data.errors.email || data.errors.password )
                setemailError(data.errors.email);
                setpasswordError(data.errors.password);
            }
        }
        catch(err){
            console.log(err);
            toast.error('Something went wrong');
        }
    };

    return (
            <div className="flex flex-row min-h-screen justify-center items-center bg-gray-50">
                <form className="font-Outfit mt-10 shadow-xl backdrop-blur-3xl p-10 rounded-lg bg-white max-w-md" onSubmit={handleSubmit}>
                    <h1 className=" font-bold text-2xl mb-4">Admin Panel</h1>
                    <div className="mb-3 flex flex-col min-w-72">
                        <label htmlFor="email" className=" text-gray-700 text-sm mb-2">Email Address:</label>
                        <input type="text" name="email" className="border-1 border-gray-300 rounded-md text-l px-3 py-2 outline-none" placeholder="your@email.com" required onChange={(e) => {setEmail(e.target.value)}}></input>
                        <div className="text-red-600">{emailError}</div>
                    </div>
                    <div className="w-full mb-3 flex flex-col min-w-72">
                        <label htmlFor="password" className="text-gray-700 text-sm mb-2">Password:</label>
                        <input type="password" name="password" className="border-1 border-gray-300 rounded-md text-l outline-none px-3 py-2" placeholder="Enter your Password" required onChange={(e) => {setPassword(e.target.value)}}></input>
                        <div className="text-red-600">{passwordError}</div>
                    </div>
                    <button type="submit" className="bg-black p-2 text-white rounded-lg w-full mt-2 hover:cursor-pointer">Log In</button>
                </form> 
            </div>
    )
}

export default Login
