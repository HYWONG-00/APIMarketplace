import React, { useState } from 'react';

import api from '../../appwrite/api'
import { Server } from '../../appwrite/config';


function ApiTableItem(props) {

  const [descriptionOpen, setDescriptionOpen] = useState(false);

  async function deleteItem() {
    await api.deleteDocument(Server.databaseID, Server.apiProductID, props.id);
    window.location.reload();
  }



  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr>

        {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center text-slate-800">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-100 rounded-full mr-2 sm:mr-3">
              <img className="ml-1" src={props.image} width="20" height="20" alt={props.order} />
            </div>
            <div className="font-medium text-sky-500">{props.order}</div>
          </div>
        </td> */}
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-500">{props.name}</div>
        </td>
        {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-medium text-slate-800">{props.customer}</div>
        </td> */}
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left text-500">{props.plan}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={"inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-emerald-100 text-emerald-600"}>{props.status}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left">{props.addedOn}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="space-x-1">
          <button className="text-rose-500 hover:text-rose-600 rounded-full" onClick={deleteItem}>
            <span className="sr-only">Delete</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
            </svg>
          </button>
        </div>
      </td>


      </tr>


    </tbody>
  );
}

export default ApiTableItem;
