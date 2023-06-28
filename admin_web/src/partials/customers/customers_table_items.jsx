import React from 'react';

function CustomersTableItem(props) {
    return (
        <tr>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="inline-flex items-center justify-center w-9 h-9 bg-indigo-500 text-white rounded-full uppercase mr-3"
                    >
                        <span className="text-l font-bold"> {props.name.charAt(0)}</span>

                    </div>
                    <div className="font-medium text-slate-800">{props.name}</div>
                </div>
            </td>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="text-left">{props.email}</div>
            </td>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="text-center">{props.joindate}</div>
            </td>
        </tr>
    );
}

export default CustomersTableItem;
