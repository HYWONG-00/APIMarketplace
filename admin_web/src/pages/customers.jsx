import React, { useState } from 'react';

import Sidebar from '../partials/sidebar';
import Header from '../partials/header';
import CustomersTable from '../partials/customers/customers_table';



function Customers({user, dispatch}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);




  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} dispatch={dispatch}/>

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Customers </h1>
              </div>

              

            </div>

            {/* Table */}
            <CustomersTable />

            {/* Pagination */}
            {/* <div className="mt-8">
              <PaginationClassic />
            </div> */}

          </div>
        </main>

      </div>

    </div>
  );
}

export default Customers;