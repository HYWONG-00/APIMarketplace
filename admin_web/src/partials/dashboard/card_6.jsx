import React, { useEffect, useState } from 'react';
import { Query } from 'appwrite';

import api from '../../appwrite/api'
import { Server } from '../../appwrite/config';


function Card6() {

  const [list, setList] = useState([]);

  useEffect(() => {
    async function getOrders() {
      const order = await api.listDocuments(Server.databaseID, Server.orderID, [Query.limit(5)]);
      setList(order['documents']);
    }
    getOrders()
  }, []);

  return (
    <div className="col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Recent Sales</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Date</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Customer</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Total</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">API</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Plan</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {/* Row */}
              {
                list.map(order => {
                  return (
                    <tr>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex items-center">

                  <div>{order.date}</div>
                  </div>
                </td>
                
                <td className="p-2 whitespace-nowrap">
                  <div className="flex items-center">
                  <div className="font-medium text-slate-800">{order.customer}</div>
                    
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left text-emerald-500 font-medium">RM {order.total}</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={"inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-emerald-100 text-emerald-600"}>{order.status}</div>
        </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex items-center">
                  <div className="font-medium text-slate-800">{order.api}</div>
                    
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex items-center">

                  <div>{order.plan}</div>
                  </div>
                </td>
              </tr>
                  )
                })
              }
              
              
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default Card6;
