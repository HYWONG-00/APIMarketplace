import React, { useState, useEffect } from 'react';
import { Query } from 'appwrite';

import api from '../appwrite/api'
import { Server } from '../appwrite/config';

import PageIllustration from "../components/page-illustration";
import ProductCard from "../partials/product_card";
import Loader from '../components/ui/loader';


const Marketplace = () => {
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        setLoader(true);
        async function getProducts() {
            const products = await api.listDocuments(Server.databaseID, Server.apiProductID);
            setList(products['documents']);
            setLoader(false);
        }
        getProducts()
    }, []);

    return (
        <section className="relative">
            <PageIllustration />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1 mb-4">Explore Our API Marketplace</h1>
                        <p className="text-xl text-gray-400 mb-8">Our marketplace contains different APIs based on your needs.</p>
                    </div>
                    {
                        loader ? (<Loader />) : (
                            <div className="grid grid-cols-12 gap-6">
                                {
                                    list.map(product => {
                                        return (
                                            <ProductCard
                                                id={product.$id}
                                                name={product.name}
                                                starting={product.starting}
                                                image={product.image}
                                            />
                                        )
                                    })
                                }
                            </div>)
                    }


                </div>
            </div>
        </section>
    )
}

export default Marketplace;