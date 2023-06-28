import { Link } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react';
import { Query } from 'appwrite';
import api from '../appwrite/api'
import { Server } from '../appwrite/config';

import PageIllustration from "../components/page-illustration";

const Success = () => {
  //prevent calling updateDB in useEffect twice
    const effectRan = useRef(false);
    const [list, setList] = useState([]);
    useEffect(() => {
      if(effectRan.current == false){
          const params = new URLSearchParams(window.location.search);
          const planid = params.get('pid');
          const totalRequest = params.get('request');
          const name = params.get('name');
          const plan = params.get('plan');
          const amount = params.get('amount')
          
          async function updateDB() {
              const currentDate = new Date();
              const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
            const user = await api.getAccount()
            const subscriptions = await api.listDocuments(Server.databaseID, Server.subscriptionID, [
              Query.equal('uid', user['$id']),
            ])
            const subscriptionArray = subscriptions['documents']
            
            
            //by HY         
            console.log(JSON.stringify(subscriptionArray));

            if(subscriptionArray.length == 0){
              await api.createDocument(Server.databaseID, Server.subscriptionID, {
                name: name,
                plan: plan,
                usedReq: 0,
                totalReq: totalRequest,
                uid: user['$id'],
                pid: planid
              })
            }
            else{      
              let foundPlan = false;     
              for (let i = 0; i < subscriptionArray.length; i++) {
                if (subscriptionArray[i]['pid'] === planid) {
                  let subscriptionDocumentId = subscriptionArray[i]['$id']
                  await api.updateDocument(Server.databaseID, Server.subscriptionID, subscriptionDocumentId, {
                    name: name,
                    plan: plan,
                    usedReq: 0,
                    totalReq: totalRequest,
                    uid: user['$id'],
                    pid: planid
                  })   
                  foundPlan = true;
                  break;                  
                }                           
              }
              
              if(!foundPlan){
                await api.createDocument(Server.databaseID, Server.subscriptionID, {
                  name: name,
                  plan: plan,
                  usedReq: 0,
                  totalReq: totalRequest,
                  uid: user['$id'],
                  pid: planid
                })
              }
            }

            const dashboard = await api.getDocument(Server.databaseID, Server.dashboardDataID, Server.dataID)
            const count = dashboard['sales'];
            const new_count = count + parseFloat(amount);
            await api.updateDocument(Server.databaseID, Server.dashboardDataID, Server.dataID, {
                sales: new_count
            }) 

            await api.createDocument(Server.databaseID, Server.orderID, {
              date: formattedDate,
              customer: user['name'],
              total: amount,
              status: 'Paid',
              api: name,
              plan: plan
            })
            
            await api.createDocument(Server.databaseID, Server.paymentHistoryID, {
              name: name,
              plan: plan,
              uid: user['$id'],
              total: amount,
              status: 'Paid',
              paiddate: formattedDate
            })

           
            
          }
          
          updateDB();

        return () => {
          effectRan.current = true;
        };
      }
       // Output: the value of the session_id parameter
      }, []);

    return (
        <section className="relative">
            <PageIllustration />
                    <section className="relative">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                                <div className="max-w-3xl mx-auto text-center">
                                    {/* Top image */}
                                    <div className="relative inline-flex flex-col mb-6" data-aos="fade-up">
                                        <img src={'https://mardizu.co.id/assets/asset_admin/img/illustration/success.png'} width={300} height={300}/>
                                        
                                    </div>
                                    {/* Content */}
                                    <h1 className="h1 mb-4" data-aos="fade-up" data-aos-delay="200">Hooray! Your payment is successful.</h1>
                                    <p className="text-lg text-gray-400" data-aos="fade-up" data-aos-delay="400">Head to your <Link to="/subscriptions" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">subscriptions</Link> to check your subscribed API.</p>
                                </div>
                            </div>
                        </div>
                    </section>
        </section>

    )
}

export default Success;