import React, { useState, useEffect } from "react";
import Stripe from 'stripe';
import {client, paymentHistoryID, databaseID, databases} from '../appwrite/config';

const stripe = new Stripe('sk_test_51Mp1cVJ5DS9tZ332ceKaKBiXx0e7ZqtZEbdvg2kKr8SOXCaq12j4jLEOyGwr22uG0gy8gZGSWdJS7bwpfqsaQjmu00ITvp0EVM');

export async function initiatePayment(name, desc, price, plan, planid, request){

  try{
      let success_url = 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}' + `&name=${name}&plan=${plan}&planid=${planid}&request=${request}&amount=${price}`
      const session = await stripe.checkout.sessions.create({
        line_items: [{
          price_data:{
            currency: 'myr',
            unit_amount: price * 100,
            product_data:{
              name: name,
              description: desc,
              images: ['https://media.tenor.com/QknbFwexXewAAAAC/apple-cat.gif'],
            },
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: success_url/*'https://example.com/success'*/,
        cancel_url: 'http://localhost:3000/cancel'/*https://example.com/cancel'*/,
      });
     window.location.href = session.url;
  }catch (error){
    console.log(error.message);
  }






}

function Payment(){
  return(

    <html>
    <head>
      <title>Checkout</title>
    </head>
    <body>

        <button onClick={initiatePayment}>Checkout Dummy</button>
       
      
    </body>
  </html>

  )
}
  
  export default Payment;