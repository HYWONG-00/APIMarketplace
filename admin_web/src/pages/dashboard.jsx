import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/sidebar';
import Header from '../partials/header';
import WelcomeBanner from '../partials/dashboard/welcome_banner';
import Card1 from '../partials/dashboard/card_1';
import Card2 from '../partials/dashboard/card_2';
import Card3 from '../partials/dashboard/card_3';
import Card4 from '../partials/dashboard/card_4';
import Card5 from '../partials/dashboard/card_5';
import Card6 from '../partials/dashboard/card_6';

import api from '../appwrite/api'
import { Server } from '../appwrite/config';
import Loader from '../partials/loader';

function Dashboard({ user, dispatch }) {

  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
    setLoader(true);
    async function getData() {
      const data = await api.getDocument(Server.databaseID, Server.dashboardDataID, Server.dataID);
     
      const sale = await api.listDocuments(Server.databaseID, Server.orderID);
      setData(data);
      setLoader(false);
    }
    getData()
  }, []);

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

            {/* Welcome banner */}
            <WelcomeBanner user={user} />

            {
              loader ? (<Loader />) : (
                <div className="grid grid-cols-12 gap-6">


                  <Card1 requests={data['requests']} />
                  <Card2 customers={data['customers']} />
                  <Card3 sales={data['sales']} />
                  <Card4 />
                  <Card5 />
                  <Card6 />

                </div>
              )
            }
            {/* Cards */}


          </div>
        </main>

      </div>

    </div>
  );
}

export default Dashboard;