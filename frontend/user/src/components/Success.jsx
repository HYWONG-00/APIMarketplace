import api from "../appwrite/api";
import { Query } from 'appwrite';
import { Server } from '../appwrite/config';
import { useGetUser } from "../hooks/index";

import { useEffect } from 'react';

const Success = () => {
 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planid = params.get('planid');
    const totalRequest = params.get('request');
    const name = params.get('name');
    const plan = params.get('plan');
    const amount = params.get('amount')
  

    
    async function updateDB() {
      const currentDate = Date();
      
      let user = await api.getAccount()
      const subscriptions = await api.listDocuments(Server.databaseID, Server.subscriptionID, [
        Query.equal('uid', user['$id'])])
      console.log(subscriptions)
      const subscriptionArray = subscriptions['documents']
      
      for (let i = 0; i< subscriptionArray.length; i++) {
        if (subscriptionArray[i]['planid'] === planid) {
          let subscriptionDocumentId = subscriptionArray[i]['$id']
          await api.updateDocument(Server.databaseID, Server.subscriptionID, subscriptionDocumentId, {
            name: name,
            plan: plan,
            usedRequest: 0,
            totalRequest: totalRequest,
            uid: user['$id'],
            pid: planid
          })
           break;
        } else {
          await api.createDocument(Server.databaseID, Server.subscriptionID, {
            name: name,
            plan: plan,
            usedRequest: 0,
            totalRequest: totalRequest,
            uid: user['$id'],
            pid: planid
           })
           break;
        }
      }

      await api.createDocument(Server.databaseID, Server.paymentHistoryID, {
        name: name,
        plan: plan,
        uid: user['$id'],
        total: amount,
        status: 'Paid',
        paiddate: currentDate
      })
      
    }

    updateDB();

   // Output: the value of the session_id parameter
  }, []);



  return (
    //<html><body><h1>Thanks for your order, {{customer.name}}!</h1></body></html>
    //<html><body><h1>Thanks for your order!</h1></body></html>

    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title></title>
        <link href='https://fonts.googleapis.com/css?family=Lato:300,400|Montserrat:700' rel='stylesheet' type='text/css' />
        <style>
          @import url(//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css);
          @import url(//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);

        </style>
        <link rel="stylesheet" href="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/default_thank_you.css" />
        <script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/jquery-1.9.1.min.js"></script>
        <script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/html5shiv.js"></script>
      </head>
      <body>
        <header class="site-header" id="header">
          <h1 class="site-header__title" data-lead-id="site-header-title">THANK YOU!</h1>
        </header>

        <div class="main-content">
          <i class="fa fa-check main-content__checkmark" id="checkmark" style={{ color: 'green' }}></i>
          <p class="main-content__body" data-lead-id="main-content-body">Thank you for ordering our product. It means a lot to us, just like you do! We really appreciate you giving us a moment of your time today. Thank you for trusting Cosmos.</p>
        </div>

        <footer class="site-footer" id="footer">
          <p class="site-footer__fineprint" id="fineprint">Copyright ©2023 | All Rights Reserved</p>
        </footer>
      </body>
    </html>


  )
}


export default Success;