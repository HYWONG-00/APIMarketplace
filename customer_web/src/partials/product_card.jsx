import React from 'react';
import { Link } from 'react-router-dom';


function ProductCard(product) {
  return (

    <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-gray-800 shadow-lg rounded-sm overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Image */}
        <div className="relative">
          <img className="w-full h-full object-cover" src={product.image} style={{ width: '286px', height: '175px' }} />
        </div>
        {/* Card Content */}
        <div className="grow flex flex-col p-5">
          {/* Card body */}
          <div className="flex flex-col h-full">
            {/* Header */}
            <header className="mb-2 flex-shrink-0 flex-grow">
              <h3 className="text-lg text-gray-100 font-semibold">{product.name}</h3>
            </header>
            {/* List */}
            <ul className="text-sm space-y-2 mb-5 flex-shrink-0 flex-grow-0">
              <li className="flex items-center">
                <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 mr-3" viewBox="0 0 16 16">
                  <path d="M8 6c2.9 0 6-.9 6-3s-3.1-3-6-3-6 .9-6 3 3.1 3 6 3zM2 6.5V8c0 2.1 3.1 3 6 3s6-.9 6-3V6.5C12.6 7.4 10.5 8 8 8s-4.6-.6-6-1.5zM2 11.5V13c0 2.1 3.1 3 6 3s6-.9 6-3v-1.5c-1.4 1-3.5 1.5-6 1.5s-4.6-.6-6-1.5z" />
                </svg>
                <div>Starts at RM {product.starting} / month</div>
              </li>
            </ul>
          </div>
          {/* Card footer */}
          <div>
            <Link className="btn-sm w-full bg-purple-600 hover:bg-purple-700 text-white" to={{
              pathname: '/pricing', 
              search: `?productid=${product.id}`
             
            }} >Subscribe</Link>
          </div>
        </div>
      </div>
    </div>


  )
}

export default ProductCard