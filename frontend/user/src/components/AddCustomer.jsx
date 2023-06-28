import React, { useState, useEffect } from 'react';
import { customersID, databaseID, databases } from '../appwrite/config';
import {v4 as uuidv4} from 'uuid';
import { useNavigate } from 'react-router-dom';

function CustomerForm() {
    const [customer, setCustomer] = useState({
        name: "HUI YING",
        email: "",
      })

    const handleSubmit = (e) => {
        e.preventDefault()
        const promise = databases.createDocument(databaseID, customersID, uuidv4(), {
            customer
        })
        
        console.log(promise);
        promise.then(
            function(response){
                console.log(response);
                
            },
            function(error){
                console.log(error);
            }
        );
        //window.location.reload() // handle it in different way
        e.target.reset();
        //window.location.reload()
    }


  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form
        action=""
    onSubmit={handleSubmit}
        className="flex justify-center mb-10"
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter Customer"
          className="border p-2 w-2/3 rounded-md"
          onChange={(e) => {
            setCustomer({
                ...customer,
                email: e.target.value
            })
          }}
        />
        <button
          className="bg-purple-500 p-2 text-white ml-2 rounded-md"
          type="submit"
        >
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default CustomerForm