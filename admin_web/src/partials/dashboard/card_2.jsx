import React from 'react';




// Import utilities


function Card2({customers}) {


  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5 pb-5">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Total Customers</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Customers</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">{customers}</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        {/* <LineChart data={chartData} width={389} height={128} /> */}
      </div>
    </div>
  );
}

export default Card2;
