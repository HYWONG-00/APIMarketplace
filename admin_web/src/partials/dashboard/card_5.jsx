import React , { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'appwrite';

import api from '../../appwrite/api'
import { Server } from '../../appwrite/config';

function Card5() {

  const [list, setList] = useState([]);

  useEffect(() => {
    async function getCustomers() {
      const customer = await api.listDocuments(Server.databaseID, Server.customerID, [Query.limit(5)]);
      setList(customer['documents']);
    }
    getCustomers()
  }, []);

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Recent Customers</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Joined Date</div>
                </th>
                
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}

              {
                list.map(customer => {
                  return (
                    <tr>
                <td className="p-2">
                <div className="flex items-center">
                    <div className="inline-flex items-center justify-center w-9 h-9 bg-indigo-500 text-white rounded-full uppercase mr-3"
                    >
                        <span className="text-l font-bold"> {customer.name.charAt(0)}</span>

                    </div>
                    <div className="font-medium text-slate-800">{customer.name}</div>
                </div>
                </td>
                <td className="p-2">
                  <div className="text-left">{customer.email}</div>
                </td>
               
                <td className="p-2">
                  <div className="text-left">{customer.joineddate}</div>
                </td>
                
                
              </tr>
                  )
                })
              }
              
          
              
                    
             
            </tbody>
          </table>
            
        </div>
        <div className="text-center pt-4 pb-1 border-t border-slate-100">
            <Link className="text-sm font-medium text-indigo-500 hover:text-indigo-600" to="/customers">All Customers -&gt;</Link>
          </div>
      </div>
    </div>
  );
}

export default Card5;
