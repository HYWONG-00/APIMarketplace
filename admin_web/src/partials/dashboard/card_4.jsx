import React , { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'appwrite';

import api from '../../appwrite/api'
import { Server } from '../../appwrite/config';

function Card4() {

  const [list, setList] = useState([]);

  useEffect(() => {
    async function getApi() {
      const req = await api.listDocuments(Server.databaseID, Server.apiRequestID, [Query.limit(5)]);
      setList(req['documents']);
    }
    getApi()
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Top APIs</h2>
      </header>
      <div className="grow p-3">
        <div className="flex flex-col h-full">
          {/* Card content */}
          <div className="grow">
            <ul className="flex justify-between text-xs uppercase text-slate-400 font-semibold px-2 space-x-2">
              <li>API</li>
              <li>Requests</li>
            </ul>

            <ul className="space-y-1 text-sm text-slate-800 mt-3 mb-4">
              {
                list.map(req => {
                  return (
                    <li className="relative px-2 py-1">
  
                <div className="relative flex justify-between space-x-2">
                  <div>{req.name}</div>
                  <div className="font-medium">{req.requests}</div>
                </div>
              </li>
                  )
                })
              }
              
              
            </ul>
          </div>
          {/* Card footer */}
          <div className="text-center pt-4 pb-1 border-t border-slate-100">
            <Link className="text-sm font-medium text-indigo-500 hover:text-indigo-600" to="/api">All APIs -&gt;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card4;
