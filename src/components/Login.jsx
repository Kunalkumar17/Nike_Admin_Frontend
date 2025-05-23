import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function Login({ setToken }) {

    const [email, setEmail] = useState('admin@nike.com');
    const [password, setPassword] = useState('Kunal#172001');
    const [emailError, setemailError] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setemailError('');
        setpasswordError('');
        setLoading(true);
        try {
            console.log(backendUrl);
            const res = await fetch(`${backendUrl}/admin_login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const data = await res.json();
            if (data === 'Login Successfull') {
                setToken(true);
            }
            if (data.errors) {
                toast.error(data.errors.email || data.errors.password)
                setemailError(data.errors.email);
                setpasswordError(data.errors.password);
            }
        }
        catch (err) {
            console.log(err);
            toast.error('Something went wrong');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex flex-row min-h-screen justify-center items-center bg-gray-50">
            <form className="font-Outfit mt-10 shadow-xl backdrop-blur-3xl p-10 rounded-lg bg-white max-w-md" onSubmit={handleSubmit}>
                <h1 className=" font-bold text-2xl mb-4">Admin Panel</h1>
                <div className="mb-3 flex flex-col min-w-72">
                    <label htmlFor="email" className=" text-gray-700 text-sm mb-2">Email Address:</label>
                    <input type="text" name="email" className="border-1 border-gray-300 rounded-md text-l px-3 py-2 outline-none" value={email} placeholder="your@email.com" required onChange={(e) => { setEmail(e.target.value) }}></input>
                    <div className="text-red-600">{emailError}</div>
                </div>
                <div className="w-full mb-3 flex flex-col min-w-72">
                    <label htmlFor="password" className="text-gray-700 text-sm mb-2">Password:</label>
                    <input type="password" name="password" className="border-1 border-gray-300 rounded-md text-l outline-none px-3 py-2" value={password} placeholder="Enter your Password" required onChange={(e) => { setPassword(e.target.value) }}></input>
                    <div className="text-red-600">{passwordError}</div>
                </div>
                <button
                    type="submit"
                    className="bg-black p-2 text-white rounded-lg w-full mt-2 hover:cursor-pointer disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"></path>
                            </svg>
                            Logging in...
                        </span>
                    ) : (
                        'Log In'
                    )}
                </button>
            </form>
        </div>
    )
}

export default Login
