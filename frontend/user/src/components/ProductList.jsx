import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
//import { appwrite } from './appwrite'; // Import the Appwrite SDK
import { client, apiProductID, databaseID } from '../appwrite/config';

function ProductList() {
    const navigate = useNavigate()
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const listProducts = async () => {
      try {
        const response = await client.database.listDocuments(apiProductID);
        setProducts(response.documents);
      } catch (error) {
        console.error(error);
      }
    };

    listProducts();
  }, []);

  const addProduct = () => {
    navigate("/editProduct")
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.$id}>{product.name}</li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default ProductList;