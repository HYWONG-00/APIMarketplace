
import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

import api from '../appwrite/api'
import { FetchState } from '../hooks';
import { Server } from '../appwrite/config';
import PageIllustration from '../components/page-illustration';

import '../App.css';
import $ from 'jquery';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ dispatch }) => {

    const navigate = useNavigate()
    const [name, setName] = useState();
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

    function removeError(classname){
        $(classname).removeClass("show");
    }

    const generateApiKey = () => {
        const apiKey = Array(32)
          .fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
          .map((x) => x[Math.floor(Math.random() * x.length)])
          .join('');
        return apiKey;
      };

    const signup = async (e) => {
        e.preventDefault()
        

        //just check only
        let notProceed = false;
        $(".name-error").removeClass("show");
        $(".email-error").removeClass("show");
        $(".email-invalid-error").removeClass("show");
        $(".password-error").removeClass("show");
        if(name == "" || name == null){
            setError(".name-error");
            notProceed = true;
        }
        else{
            removeError(".name-error");
        }

        if(email == "" || email == null){
            setError(".email-error");
            notProceed = true;
        }
        else if(!isValidEmail(email)){
            setError(".email-invalid-error");
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
                const apiKey = generateApiKey();
                const currentDate = new Date();
              const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
            const user = await api.createAccount(email, password, name);
           
            const data = {
                name: name,
                email: email,
                apiKey: apiKey,
                uid: user['$id']
            }
            await api.createDocument(Server.databaseID, Server.accountID, data);
            await api.createSession(email, password);
            await api.createDocument(Server.databaseID, Server.customerID, {
                name: name,
                email: email,
                joindate: formattedDate,
                uid: user['$id']
            });
            const dashboard = await api.getDocument(Server.databaseID, Server.dashboardDataID, Server.dataID)
            const count = dashboard['customers'];
            const new_count = count + 1;
            await api.updateDocument(Server.databaseID, Server.dashboardDataID, Server.dataID, {
                customers: new_count
            })
            const account = await api.getAccount()
            dispatch({ type: FetchState.FETCH_SUCCESS, payload: account });
            navigate('/')
            } catch (e) {
                console.log(e)
            dispatch({ type: FetchState.FETCH_FAILURE });
            
            if(! toast.isActive(toastId.current)) {
                toastId.current = toast.dark("Signup Failed", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            }
        }
      };

    return (
        <section className="relative">
            <PageIllustration />
            <ToastContainer/>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1">Welcome. We exist to make entrepreneurship easier.</h1>
                    </div>

                    {/* Form */}
                    <div className="max-w-sm mx-auto">
                        
                        <form>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="full-name">Full Name <span className="text-red-600">*</span></label>
                                    <input id="full-name" type="text" className="bg-transparent form-input w-full text-gray-300" placeholder="First and last name" required onChange={(e) => {
                                        setName(e.target.value)
                                    }
                                    } />
                                    <small class="name-error text-red-300">* Field Required</small>
                                </div>
                            </div>
                           
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                                    <input id="email" type="email" className="bg-transparent form-input w-full text-gray-300" placeholder="example@mail.com" required onChange={(e) => {
                                        setEmail(e.target.value)
                                    }
                                    }/>
                                    <small class="email-error text-red-300">* Field Required</small>
                                    <small class="email-invalid-error text-red-300">* Invalid Email Format</small>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                                    <input id="password" type="password" className="bg-transparent form-input w-full text-gray-300" placeholder="Password (at least 8 characters)" required onChange={(e) => {
                                        setPassword(e.target.value)
                                    }
                                    }/>
                                    <small class="password-error text-red-300">* Field Required</small>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">

                            </div>
                            <div className="flex flex-wrap -mx-3 mt-6">
                                <div className="w-full px-3">
                                    <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={signup}>Sign up</button>
                                </div>
                            </div>
                        </form>
                        <div className="text-gray-400 text-center mt-6">
                            Already using Open PRO? <Link to="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default SignUp;