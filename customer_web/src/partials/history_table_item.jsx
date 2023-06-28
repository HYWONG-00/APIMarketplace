import React from 'react';

function HistoryTableItem(item) {
    return (
        <tr>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-medium text-gray-100">{item.name}</div>
            </td>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="flex items-center">
                    <div>{item.plan}</div>
                </div>
            </td>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div>{item.paiddate}</div>
            </td>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-emerald-100 text-emerald-600">{item.status}</div>
            </td >
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-medium text-emerald-500">RM {item.total}</div>
            </td>


        </tr>
    );
}

export default HistoryTableItem;