import React, { useState, useEffect } from 'react';
import History from './history_table_item'

function HistoryTable ({histories}) {

    const [list, setList] = useState([]);

    useEffect(() => {
        setList(histories);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
        <div className="bg-gray-800 shadow-lg rounded-sm border-purple-900  relative">
          
          <div>
    
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-gray-300 bg-gray-700 ">
                  <tr>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Plan</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Paid on</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Status</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Total</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-gray-700">
                  {
                    list.map(history => {
                      return (
                        <History
                          total={history.total}
                          status={history.status}
                          name={history.name} 
                          paiddate={history.paiddate}
                          plan={history.plan}
                        />
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

export default HistoryTable;