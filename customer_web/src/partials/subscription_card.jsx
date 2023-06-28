import React from 'react';

import { Link } from 'react-router-dom';

import api from '../appwrite/api'
import { Server } from '../appwrite/config';

function SubscriptionCard(subscription) {
    const usage = subscription.usedReq / subscription.totalReq


    
    async function cancelPlan() {
        console.log(subscription.$id)
        await api.deleteDocument(Server.databaseID, Server.subscriptionID, subscription['$id']) 
      

    }

    return (
        <div className="pb-4">
            <div className="bg-gray-800 rounded-sm shadow-md p-4">
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 flex items-center p-2">
                        <h6 className="text-2xl font-medium">{subscription.name} </h6>
                    </div>
                    <div className="col-span-2">
                        <p className="text-lg font-medium">{subscription.plan}</p>
                        <div className="relative pt-1">
                            <div className="overflow-hidden h-3 mb-2 text-xs flex rounded-full bg-purple-200">
                                <div style={{ width: `${usage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"></div>
                            </div>
                            <p className="text-xs font-medium text-gray-500">Used {(usage)} % monthly limit ({subscription.usedReq}/{subscription.totalReq} requests) </p>
                        </div>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                        <div className="flex items-center justify-end space-x-2 p-3">
                            <Link  className="btn -sm px-3 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none" to={{
                                pathname: '/pricing',
                                search: `?productid=${subscription.pid}`
                            }}>Upgrade</Link >
                            <Link type="button" className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none " onClick={cancelPlan}>Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionCard;