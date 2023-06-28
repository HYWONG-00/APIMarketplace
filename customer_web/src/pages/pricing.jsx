import React, { useState, useEffect } from 'react';
import Stripe from 'stripe';
import { Link, useNavigate } from 'react-router-dom'

import api from '../appwrite/api'
import { Server } from '../appwrite/config';

import PageIllustration from '../components/page-illustration';
import Loader from '../components/ui/loader';

const stripe = new Stripe(process.env.REACT_APP_STRIPE_PAYMENT_KEY);



export async function initiatePayment(name, desc, image, price, plan, pid, request){
    console.log(price * 100)
  try{
      let success_url = 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}' + `&name=${name}&plan=${plan}&pid=${pid}&request=${request}&amount=${price}`
      const session = await stripe.checkout.sessions.create({
        line_items: [{
          price_data:{
            currency: 'myr',
            unit_amount: price * 100,
            product_data:{
              name: name,
              description: desc,
              images: [image],
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

const Pricing = ({user}) => {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const productid = params.get('productid')

    const [loader, setLoader] = useState(false);
    const [product, setProduct] = useState([]);
    const [plans, setPlan] = useState([]);
    const [selected, setSelected] = useState('');
    const [req, setReq] = useState([]);
    const [price, setPrice] = useState([]);

    const handleOptionChange = (plan, req, price) => {
        setSelected(plan);
        setReq(req)
        setPrice(price);
    }



    useEffect(() => {
        setLoader(true);
        async function getProduct() {
            
            const product = await api.getDocument(Server.databaseID, Server.apiProductID, productid);
            setProduct(product);
            setPlan(product['plans']);
            setLoader(false);
        }
        getProduct();
    }, []);

    return (
        <section>
            <PageIllustration />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 relative">
                <div className="px-4 sm:px-6 lg:px-8 py-12 w-full">
                    {
                        loader ? (<Loader />) : (
                            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
                                {/* Content */}
                                <div>
                                    <div className="mb-3">
                                        <Link className="text-sm font-medium text-purple-500 hover:text-purple-600" to="/marketplace">&lt;- Back To Marketplace</Link>
                                    </div>
                                    <header className="mb-4">
                                        {/* Title */}
                                        <h1 className="text-2xl md:text-3xl text-gray-100 font-bold mb-2">{product.name}</h1>
                                        <p>{product.desc}</p>
                                    </header>
                                    {/* Image */}
                                    <figure className="mb-6">
                                        <img className="w-full rounded-sm" src={product.image} width="640" height="360" alt="Product" />
                                    </figure>
                                    {/* Product content */}
                                    <div>
                                        <h2 className="text-xl leading-snug text-purple-500 font-bold mb-2">Overview</h2>
                                        <p className="mb-6">{product.overview}</p>
                                    </div>
                                </div>
                                {/* Sidebar */}
                                <div>
                                    <div className="bg-gray-800 p-5 shadow-lg rounded-sm lg:w-72 xl:w-80">
                                        <div className="text-sm text-gray-100 font-semibold mb-3">Select a Package</div>
                                        <ul className="space-y-2 sm:flex sm:space-y-0 sm:space-x-2 lg:space-y-2 lg:space-x-0 lg:flex-col mb-4">
                                            {
                                                plans.map(planString => {
                                                    const plan = JSON.parse(planString)
                                                    return (
                                                        <li>
                                                            <button className={`w-full h-full text-left py-3 px-4 rounded bg-gray-800 border ${selected === plan.name ? "border-purple-600" : "border-slate-600" }  hover:border-slate-300 shadow-sm duration-150 ease-in-out`} onClick={() => handleOptionChange(plan.name, plan.request, plan.price)}>
                                                                <div className="flex flex-wrap items-center justify-between mb-0.5">
                                                                    <span className="font-semibold text-gray-100">{plan.name}</span>
                                                                    <span className="font-medium text-emerald-600">RM {plan.price}</span>
                                                                </div>
                                                                <div className="text-sm text-gray-500">{plan.request} Requests / Monthly</div>
                                                            </button>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <div className="mb-4">
                                            <button className={`btn w-full ${selected === '' ? 'bg-gray-700 text-gray-500' : 'bg-purple-600 hover:bg-purple-700 text-white'}`} onClick={()=>
                                                user ? 
                                                initiatePayment(product.name, product.desc, product.image, price, selected, productid, req ) : navigate('/signin')}>Subscribe {selected === '' ? '' : `- RM ${price}`}</button>
                                        </div>
                                        <div className="text-xs text-slate-500 italic text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <a className="underline hover:no-underline" href="#0">Terms</a>.</div>
                                    </div>
                                </div>

                            </div>
                        )
                    }



                </div>
            </div>
        </section>
    )
}

export default Pricing;