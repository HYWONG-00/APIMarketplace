import { useState, useEffect } from "react";
import { Query } from 'appwrite';
import PageIllustration from "../components/page-illustration";
import api from '../appwrite/api'
import { Server } from '../appwrite/config';
import { get } from "jquery";

const Profile = ({ user }) => {

    const [apiKey, setApiKey] = useState([]);

    useEffect (() => {
        async function getapiKey() {
            const account = await api.listDocuments(Server.databaseID, Server.accountID,[
                Query.equal('uid', user['$id'])
            ]);
            setApiKey(account['documents'][0]['apiKey'])
        }
        getapiKey()
    }, []);


    return (
        <section className="relative">
            <PageIllustration />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-8">
                        <h1 className="h1 mb-4">My Profile</h1>
                        <p className="text-xl text-gray-400 mb-8">Customise and edit your profile here.</p>
                    </div>

                    <div className="grow">
                        {/* Panel body */}
                        <div className="p-6 space-y-6">

                            {/* Picture */}
                            <section>
                                <div className="flex items-center">
                                    <div className="mr-6 inline-flex items-center justify-center w-20 h-20 bg-purple-600 text-white rounded-full uppercase">
                                        <span className="text-3xl font-bold"> {user.name.charAt(0)}</span>
                                    </div>
                                    <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Change</button>
                                </div>
                            </section>
                            {/* Business Profile */}
                            <section>
                                <h2 className="text-xl leading-snug text-purple-600 font-bold mb-1">Personal Profile</h2>
                                <div className="text-sm">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div>
                                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                                    <div className="sm:w-1/3">
                                        <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                                        <input id="name" className="form-input w-full bg-transparent" type="text" value={user.name} />
                                    </div>
                                    <div className="sm:w-1/3">
                                        <label className="block text-sm font-medium mb-1" htmlFor="business-id">Email</label>
                                        <input id="email" className="form-input w-full bg-transparent" type="text" value={user.email} />
                                    </div>
                                </div>
                            </section>
                            {/* API Key */}
                            <section>
                                <h2 className="text-xl leading-snug text-purple-600 font-bold mb-1">API Key</h2>
                                <div className="text-sm">Use this API key for each request. </div>
                                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                                    <div className="sm:w-1/3 mb-4">
                                        <label className="block text-sm font-medium mb-1" htmlFor="name">Your API Key</label>
                                        <input className="form-input w-full bg-transparent" type="text" value={apiKey}/>
                                    </div>
                                    
                                </div>
                                

                            </section>
                            {/* Password */}
                            <section>
                                <h2 className="text-xl leading-snug text-purple-600 font-bold mb-1">Password</h2>
                                <div className="text-sm">You can set a permanent password if you don't want to use temporary login codes.</div>
                                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                                    <div className="sm:w-1/3">
                                        <label className="block text-sm font-medium mb-1" htmlFor="name">Old Password</label>
                                        <input id="password" className="form-input w-full bg-transparent" type="password" />
                                    </div>
                                    <div className="sm:w-1/3">
                                        <label className="block text-sm font-medium mb-1" htmlFor="business-id">New Password</label>
                                        <input id="password" className="form-input w-full bg-transparent" type="password" />
                                    </div>
                                    <div className="sm:w-1/3">
                                        <label className="block text-sm font-medium mb-1" htmlFor="business-id">Confirm New Password</label>
                                        <input id="password" className="form-input w-full bg-transparent" type="password" />
                                    </div>
                                </div>

                            </section>
                        </div>
                        {/* Panel footer */}
                        <footer>
                            <div className="flex flex-col px-6 py-5 border-t border-slate-200">
                                <div className="flex self-end">
                                    <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">Cancel</button>
                                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Save Changes</button>
                                </div>
                            </div>
                        </footer>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default Profile;