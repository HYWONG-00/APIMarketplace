import React, { useState, useEffect } from 'react';
import { Query } from 'appwrite';

import api from '../appwrite/api'
import { Server } from '../appwrite/config';

import PageIllustration from "../components/page-illustration";
import HistoryTable from "../partials/history_table";
import Loader from '../components/ui/loader';

const PaymentHistory = ({ user }) => {
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        setLoader(true);
        async function getHistories() {
            const histories = await api.listDocuments(Server.databaseID, Server.paymentHistoryID, [
                Query.equal('uid', user['$id']),

            ]);
            setList(histories['documents']);
            setLoader(false);
        }
        getHistories()
    }, []);

    return (
        <section className="relative">
            <PageIllustration />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1 mb-4">Payment History</h1>
                        <p className="text-xl text-gray-400 mb-8">Here are all your previous transaction records.</p>
                    </div>
                    {
                        loader ? (<Loader />) : (
                            <HistoryTable histories={list} />
                        )
                    }

                </div>
            </div>
        </section>
    )
}

export default PaymentHistory;