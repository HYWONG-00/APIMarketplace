import React, { useState, useEffect } from 'react';
import { Query } from 'appwrite';

import api from '../appwrite/api'
import { Server } from '../appwrite/config';

import PageIllustration from "../components/page-illustration";
import SubscriptionCard from "../partials/subscription_card";
import Loader from '../components/ui/loader';



const Subscriptions = ({ user }) => {
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        setLoader(true);
        async function getSubs() {
            if (user['$id'] != null) {           
                const subscription = await api.listDocuments(Server.databaseID, Server.subscriptionID, [
                    Query.equal('uid', user['$id'])
                ]);
                setList(subscription['documents']);
                setLoader(false);
            }
        }
        getSubs()
    }, []);

    return (
        <section className="relative">
            <PageIllustration />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1 mb-4">Subscriptions</h1>
                        <p className="text-xl text-gray-400 mb-8">Track your subscriptions and requests limit here.</p>
                    </div>
                    {
                        loader ? (<Loader />) : (
                            <div className="grid grid-cols-1 gap-4">
                                {
                                    list.map(sub => {
                                        return (
                                            <SubscriptionCard
                                                $id={sub.$id}                                  
                                                name={sub.name}
                                                plan={sub.plan}
                                                usedReq={sub.usedReq}
                                                totalReq={sub.totalReq}
                                                pid={sub.pid}
                                            />
                                        )
                                    })
                                }
                               
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Subscriptions;