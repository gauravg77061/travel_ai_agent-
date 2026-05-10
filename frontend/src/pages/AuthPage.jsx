import React from 'react';
import { useState } from 'react';

const AuthPage = () =>{
 {/* TripSync AI */}
    const[isLogin,setIsLogin]=useState(true);

    return(
        <div className="min-h-screen bg-black text-white flex items-center justify-center">

            <div className='w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-2xl'>

        <h1 className="typing-text text-4xl font-extrabold text-white mx-auto">
  TripSyncAI
</h1>

                <p className='text-center text-gray-400 mb-8'>
                    AI powered Travel Group Chat
                </p>

                <form className ="space-y-4" action="">
                    
                    {!isLogin && (
                        <>
                        <input
                        type='text'
                        placeholder='First Name'
                        className='w-full p-3 rounded-lg bg-zinc-800 outline-none'
                        />
                         <input
                        type='text'
                        placeholder='Last Name'
                        className='w-full p-3 rounded-lg bg-zinc-800 outline-none'
                        />
                        
                        </>
                    )}
                     <input
                        type='email'
                        placeholder='Email'
                        className='w-full p-3 rounded-lg bg-zinc-800 outline-none'
                        />

                         <input
                        type='password'
                        placeholder='Password'
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