import React, { useState } from 'react';

import api from '../../appwrite/api'
import { Server } from '../../appwrite/config';

function EditApiDialog({ close }) {

    const [product, setProduct] = useState({})
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    const [subscriptionPlans, setSubscriptionPlans] = useState([])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubscriptionPlanChange = (event, index) => {
        const { name, value } = event.target;
        const plans = [...subscriptionPlans];
        plans[index] = { ...plans[index], [name]: value };
        setSubscriptionPlans(plans);
    };

    const handleAddSubscriptionPlan = () => {
        setSubscriptionPlans([
            ...subscriptionPlans,
            { name: "", price: 0 },
        ]);
    };


    const handleRemoveSubscriptionPlan = (index) => {
        const plans = [...subscriptionPlans];
        plans.splice(index, 1);
        setSubscriptionPlans(plans);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // update the product document in Appwrite database
            await api.createDocument(Server.databaseID, Server.apiProductID, {
                name: product.name,
                desc: product.description,
                starting: product.starting,
                image: product.image,
                overview: product.overview,
                addedon: formattedDate,
                status: 'Online',
                plans: subscriptionPlans.map(plan => JSON.stringify(plan)),
                plannum: subscriptionPlans.length,
                endpoint: product.endpoint,
                url: product.url
            }

            );


            const apiProduct = await api.listDocuments(Server.databaseID, Server.apiProductID)
            console.log(apiProduct['documents'])
            let pid = ''
            for (let i = 0; i < apiProduct['documents'].length; i++) {
                if (apiProduct['documents'][i]['name'] == product.name) {
                    pid = apiProduct['documents'][i]['$id']
                    console.log('ji')
                }
            }

            await api.createDocument(Server.databaseID, Server.apiRequestID, {
                name: product.name,
                requests: 0,
                pid: pid
            });
        } catch (error) {
            console.error(error);
        }
        close();
        window.location.reload()
        // const editedProduct = { ...product, subscriptionPlans };
        // editProduct(editedProduct);
    };

    return (

        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div class="inline-block align-bottom bg-white  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white  px-4 py-6 shadow-xl">
                        <h2 class="text-lg font-medium mb-4">Edit Product</h2>
                        <form class="space-y-4">
                            <div class="flex flex-col">
                                <label class="text-sm font-medium mb-2" for="product-name">API Name:</label>
                                <input class="border py-2 px-3" type="text" name="name" id="product-name" placeholder="API Name" onChange={handleInputChange} />
                            </div>
                            <div class="flex flex-col">
                                <label class="text-sm font-medium mb-2" for="product-name">API Endpoint Name:</label>
                                <input class="border py-2 px-3" type="text" name="endpoint" id="product-endpoint-name" placeholder="API Endpoint Name" onChange={handleInputChange} />
                            </div>
                            <div class="flex flex-col">
                                <label class="text-sm font-medium mb-2" for="product-name">API Endpoint URL:</label>
                                <input class="border py-2 px-3" type="text" name="url" id="product-endpoint-url" placeholder="API Endpoint URL" onChange={handleInputChange} />
                            </div>
                            <div class="flex flex-col">
                                <label class="text-sm font-medium mb-2" for="product-name">Image:</label>
                                <input class="border py-2 px-3" type="text" name="image" placeholder="Image Link" onChange={handleInputChange} />
                            </div>
                            <div class="flex flex-col">
                                <label class="text-sm font-medium mb-2" for="product-description">Description:</label>
                                <textarea class="border  py-2 px-3" name="description" id="product-description" rows="5" placeholder='API description goes here.' onChange={handleInputChange}></textarea>
                            </div>
                            <div class="flex flex-col">
                                <label class="text-sm font-medium mb-2" for="product-description">Overview:</label>
                                <textarea class="border  py-2 px-3" name="overview" id="product-description" rows="5" placeholder='API overview goes here.' onChange={handleInputChange}></textarea>
                            </div>
                            <div class="flex flex-col">
                                <label class="text-sm font-medium mb-2" >Starting Price:</label>
                                <input class="border  py-2 px-3" type="number" name="starting" onChange={handleInputChange} />
                            </div>
                            <h4 class="text-lg font-medium">Subscription Plans:</h4>
                            {
                                subscriptionPlans.map((plan, index) => (
                                    <div class="space-y-4">
                                        <div class="flex flex-col">
                                            <label class="text-sm font-medium mb-2" for="plan-name-1">Plan Name:</label>
                                            <input class="border  py-2 px-3" type="text" name="name" id="plan-name-1" onChange={(event) => handleSubscriptionPlanChange(event, index)} />
                                        </div>
                                        <div class="flex flex-col">
                                            <label class="text-sm font-medium mb-2" for="plan-price-1">Plan Price:</label>
                                            <input class="border  py-2 px-3" type="number" name="price" id="plan-price-1" onChange={(event) => handleSubscriptionPlanChange(event, index)} />
                                        </div>
                                        <div class="flex flex-col">
                                            <label class="text-sm font-medium mb-2" for="plan-request-1">Request per Month:</label>
                                            <input class="border  py-2 px-3" type="number" name="request" id="plan-request-1" onChange={(event) => handleSubscriptionPlanChange(event, index)} />
                                        </div>
                                        <div class="btn bg-red-500 text-white py-2 px-3 hover:bg-red-600" type="button" onClick={handleRemoveSubscriptionPlan}>Remove Plan</div>
                                    </div>

                                ))
                            }
                            <div class="btn bg-green-500 text-white py-2 px-3 hover:bg-green-600 " onClick={handleAddSubscriptionPlan}>Add Plan</div>


                            <div class="flex justify-end">
                                <div class="btn bg-gray-300 text-white py-2 px-3 hover:bg-gray-400 mr-2" type="button" onClick={close}>Cancel</div>
                                <div class="btn bg-green-500 text-white  py-2 px-3 hover:bg-green-600 " type="submit" onClick={handleSubmit}>Save Changes</div>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>



    )
}

export default EditApiDialog;