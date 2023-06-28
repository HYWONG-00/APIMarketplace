import React, { useState, useEffect } from 'react';
import CustomersTableItem from './customers_table_items';
import Loader from '../loader';

import api from '../../appwrite/api'
import { Server } from '../../appwrite/config';

function CustomersTable() {
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    setLoader(true);
    async function getCustomers() {
      const customer = await api.listDocuments(Server.databaseID, Server.customerID);
      setList(customer['documents']);
      setLoader(false);
    }
    getCustomers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);





  return (
    <div>
      {
        loader ? (<Loader />) : (
          <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
            <div>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  {/* Table header */}
                  <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                    <tr>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Email</div>
                      </th>
                      
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold">Joined Date</div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody className="text-sm divide-y divide-slate-200">
                    {
                      list.map(customer => {
                        return (
                          <CustomersTableItem
                            name={customer.name}
                            email={customer.email}
                            
                            joindate={customer.joindate}
                          />
                        )
                      })
                    }
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        )
      }

    </div>
  );
}

export default CustomersTable;
