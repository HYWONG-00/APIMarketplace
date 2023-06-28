import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import api from '../appwrite/api'
import { FetchState } from '../hooks';
import PageIllustration from '../components/page-illustration';

import '../App.css';
import $ from 'jquery';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SignIn = ({ dispatch }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const toastId = React.useRef(null);

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function setError(classname){
        $(classname).addClass("show");
    }

    const signin = async (e) => {
        e.preventDefault()

        //just check only
        let notProceed = false;
        $(".email-error").removeClass("show");
        $(".email-invalid-error").removeClass("show");
        $(".password-error").removeClass("show");
        if(email == "" || email == null){
            setError(".email-error");
            notProceed = true;
        }
        else if(!isValidEmail(email)){
            setError(".email-invalid-error");
            notProceed = true;
        }
        else{
            $(".email-error").removeClass("show");
            $(".email-invalid-error").removeClass("show");
        }
        
        if(password == "" || password == null){
              setError(".password-error");
              notProceed = true;
        }
        else{
            $(".password-error").removeClass("show");
        }

        if(!notProceed){
            try {
                await api.createSession(email, password);
                const data = await api.getAccount();
                dispatch({ type: FetchState.FETCH_SUCCESS, payload: data });
                navigate('/')
            } catch (error) {
                dispatch({ type: FetchState.FETCH_FAILURE });

                if(! toast.isActive(toastId.current)) {
                    toastId.current = toast.dark("Login Failed", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                  }

                
            }
        }
        
    }

    return (
        <section className="relative">
            <PageIllustration />
            <ToastContainer/>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1">Welcome back. We exist to make entrepreneurship easier.</h1>
                    </div>

                    {/* Form */}
                    <div className="max-w-sm mx-auto">
                        <form>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                                    <input id="email" type="email" className="bg-transparent form-input w-full text-gray-300" placeholder="you@yourcompany.com" required onChange={(e) => {
                                        setEmail(e.target.value)
                                    }
                                    } />
                                    <small class="email-error text-red-300">* Field Required</small>
                                    <small class="email-invalid-error text-red-300">* Invalid Email Format</small>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                                    <input id="password" type="password" className="bg-transparent form-input w-full text-gray-300" placeholder="Password (at least 8 characters)" required onChange={(e) => {
                                        setPassword(e.target.value)
                                    }
                                    } />
                                    <small class="password-error text-red-300">* Field Required</small>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">

                            </div>
                            <div className="flex flex-wrap -mx-3 mt-6">
                                <div className="w-full px-3">
                                    <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={signin} >Sign in</button>
                                </div>
                            </div>
                        </form>
                        <div className="text-gray-400 text-center mt-6">
                            Don’t you have an account? <Link to="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default SignIn