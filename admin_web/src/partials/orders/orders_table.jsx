import React, { useState, useEffect } from 'react';
import OrdersTableItem from './orders_table_items';
import Loader from '../loader';

import api from '../../appwrite/api'
import { Server } from '../../appwrite/config';

function OrdersTable({

}) {




  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    setLoader(true);
    async function getOrders() {
      const order = await api.listDocuments(Server.databaseID, Server.orderID);
      setList(order['documents']);
      setLoader(false);
    }
    getOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        loader ? (<Loader />) : (<div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">

          <div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full divide-y divide-slate-200">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-500 bg-slate-50 border-t border-slate-200">
                  <tr>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Date</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Customer</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Total</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Status</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">API</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Plan</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                {
                  list.map(order => {
                    return (
                      <OrdersTableItem
                        date={order.date}
                        customer={order.customer}
                        total={order.total}
                        status={order.status}
                        api={order.api}
                        plan={order.plan}

                      />
                    )
                  })
                }
              </table>

            </div>
          </div>
        </div>)
      }

    </div>
  );
}

export default OrdersTable;
