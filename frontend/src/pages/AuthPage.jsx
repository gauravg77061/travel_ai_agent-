import React from 'react';
import { useState } from 'react';
import axios from "axios"

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import  {setUser} from '../redux/slices/authSlice'
import BASE_URL from '../services/axios';

const AuthPage = () =>{
 {/* TripSync AI */}
    const[isLogin,setIsLogin]=useState(true);

    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSubmit=async (e)=>{

        try {
            e.preventDefault();

            const endpoint = isLogin ?("auth/login"):("auth/signup");

            const payload=isLogin ?({
                email,
                password,
            }):({
                firstName,
                lastName,
                email,
                password,
            });

            const response=await axios.post(
                BASE_URL+endpoint,payload,{withCredentials:true}
            );

            console.log(response.data);

            dispatch(setUser(response.data.data));

            navigate("/dashboard");


        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="min-h-screen bg-black text-white flex items-center justify-center">

            <div className='w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-2xl'>

        <h1 className="typing-text text-4xl font-extrabold text-white mx-auto">
  TripSyncAI
</h1>

                <p className='text-center text-gray-400 mb-8'>
                    AI powered Travel Group Chat
                </p>

                <form className ="space-y-4" action=""
                onSubmit={handleSubmit}
                >
                    
                    {!isLogin && (
                        <>
                        <input
                        type='text'
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) =>setFirstName(e.target.value)}
                        className='w-full p-3 rounded-lg bg-zinc-800 outline-none'
                        />
                         <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder='Last Name'
                        className='w-full p-3 rounded-lg bg-zinc-800 outline-none'
                        />
                        
                        </>
                    )}
                     <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-3 rounded-lg bg-zinc-800 outline-none'
                        />

                         <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-3 rounded-lg bg-zinc-800 outline-none'
                        />

                        <button  className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:opacity-90 transition">
                            {isLogin ? ("Login"):("Signup")}
                        </button>

                </form>

                <p className='text-center text-gray-400 mt-6'>
                    {
                        isLogin?("Don't have an account"):("Already have an account")

                    }

                    <span
                    onClick={()=>setIsLogin(!isLogin)}
                    className='ml--2 text-white font-semibold cursor-pointer'
                    >
                        {isLogin ? ("Signup"):("Login")}
                    </span>

                </p>

            </div>
          


        </div>
    )
}

export default AuthPage;