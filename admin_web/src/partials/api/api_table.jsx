import React, { useState, useEffect } from 'react';
import ApiTableItem from './api_table_item';

import Loader from '../loader';

import api from '../../appwrite/api'
import { Server } from '../../appwrite/config';





function ApiTable() {


  
 


  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);
  const [plans, setPlan] = useState([]);

  useEffect(() => {
    setLoader(true);
    async function getProducts() {
      const product = await api.listDocuments(Server.databaseID, Server.apiProductID);
      setList(product['documents']);
      setLoader(false);
      
    }
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <div>
      {
        loader ? (<Loader/>) : (
          <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
          <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full divide-y divide-slate-200">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-500 bg-slate-50 border-t border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Plan</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Added On</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Action</div>
                </th>
               
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {
              list.map(product => {
                

                
                return (
                  <ApiTableItem
                    id={product.$id}
                    name={product.name}
                    plan={product.plannum}
                    status={product.status}
                    addedOn={product.addedon}
                    updatedOn={product.updatedon}
                  />
                )
              })
            }
          </table>

        </div>
      </div>
      </div>
        )
      }
      </div>
  
  );
}

export default ApiTable;


