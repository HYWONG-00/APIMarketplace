import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../appwrite/api'
import { FetchState } from '../hooks';


function Signin({ dispatch }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const signin = async (e) => {
      e.preventDefault()
      try {
          await api.createSession(email, password);
          const data = await api.getAccount();
          dispatch({ type: FetchState.FETCH_SUCCESS, payload: data });
          navigate('/')
      } catch (error) {
          dispatch({ type: FetchState.FETCH_FAILURE });
      }
  }

  return (
    <main className="bg-white">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                        <stop stopColor="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
                    <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                    <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">Welcome back! ✨</h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                    <input id="email" className="form-input w-full" type="email" onChange={(e) => {
                      setEmail(e.target.value)
                    }}/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input id="password" className="form-input w-full" type="password" autoComplete="on" onChange={(e) => {
                      setPassword(e.target.value)
                    }}/>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                <div className="text-sm">
                  Don’t you have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signup">Sign Up</Link>
                </div>
                  <Link className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" onClick={signin}>Sign In</Link>
                </div>
              </form>  
            </div>

          </div>
        </div>

       
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={'https://media.istockphoto.com/id/643897728/photo/woman-using-her-laptop.jpg?s=612x612&w=0&k=20&c=TzNngBCujgdkhwZQ6cctEVyjOAAudJLBytR8M-UHsh4='}  alt="Authentication" />
        </div>

      </div>

    </main>
  );
}

export default Signin;