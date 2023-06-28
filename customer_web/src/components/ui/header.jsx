import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from "../../appwrite/api";
import { FetchState } from '../../hooks';

const Header = ({ user, dispatch }) => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSignOut = 
    async (e) => {
      dispatch({ type: FetchState.FETCH_INIT});
      try {
        await api.deleteCurrentSession();
        navigate('/')
        dispatch({ type: FetchState.FETCH_SUCCESS, payload: null });
      } catch (e) {
        console.log(e)
      }
    }

    return (
        <header className="absolute w-full z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Site branding */}
                    <div className="shrink-0 mr-4">
                        {/* Logo */}
                        <Link to="/" className="block" aria-label="Cruip">
                            <svg className="w-8 h-8 fill-current text-purple-600" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z" />
                            </svg>
                        </Link>
                    </div>
                    <ul className="flex grow justify-center flex-wrap items-center">
                        <li>
                            <Link
                                to="/"
                                className="text-gray-200 hover:text-purple-600 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/marketplace"
                                className="text-gray-200 hover:text-purple-600 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                            >
                                Marketplace
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="text-gray-200 hover:text-purple-600 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                    {
                        user ? (
                            <div className="relative inline-block text-left" ref={dropdownRef}>
                                <div >
                                    <button className="inline-flex items-center justify-center w-11 h-11 bg-purple-600 text-white rounded-full uppercase"
                                        onClick={handleToggle}
                                    >
                                        <span className="text-xl font-bold"> {user.name.charAt(0)}</span>
                                    </button>
                                    {isOpen && (
                                        <div
                                            className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="options-menu"
                                        >
                                            <div className="py-1" role="none">
                                                <div className="flex items-center px-4 py-2">
                                                    <div className="inline-flex items-center justify-center w-11 h-11 bg-purple-600 text-white rounded-full uppercase"
                                                    >
                                                        <span className="text-xl font-bold"> {user.name.charAt(0)}</span>

                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-base font-medium leading-none text-white pb-1">{user.name}</p>
                                                        <p className="text-sm font-medium leading-none text-gray-400">{user.email}</p>
                                                    </div>
                                                </div>
                                                <div class="px-4 py-2">
                                                    <div class="border-t border-gray-500"></div>
                                                </div>
                                                <Link
                                                    to="/subscriptions"
                                                    onClick={handleToggle}
                                                    className="block px-4 py-2 text-sm text-white hover:text-purple-600"
                                                    role="menuitem"
                                                >
                                                    Subscriptions
                                                </Link>
                                                <Link
                                                    to="/payment_history"
                                                    onClick={handleToggle}
                                                    className="block px-4 py-2 text-sm text-white hover:text-purple-600"
                                                    role="menuitem"
                                                >
                                                    Payment History
                                                </Link>
                                                <div class="px-4 py-2">
                                                    <div class="border-t border-gray-500"></div>
                                                </div>
                                                <Link
                                                    to="/profile"
                                                    onClick={handleToggle}
                                                    className="block px-4 py-2 text-sm text-white hover:text-purple-600"
                                                    role="menuitem"
                                                >
                                                    Profile
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={handleSignOut}
                                                    className="block w-full text-left px-4 py-2 text-sm text-white hover:text-purple-600"
                                                    role="menuitem"
                                                >
                                                    Sign out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <nav>
                                {/* Desktop sign in links */}
                                <ul className="flex grow justify-end flex-wrap items-center">
                                    <li>
                                        <Link
                                            to="/signin"
                                            className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                        >
                                            Sign in
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/signup" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
                                            Sign up
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        )
                    }





                </div>
            </div>
        </header>
    )
}

export default Header;