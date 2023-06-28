import React from 'react'
import {Link} from 'react-router-dom'
import PageIllustration from './page-illustration'


export default function Hero() {
  return (
    <section>
      <PageIllustration />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h1 className="h1 mb-4" data-aos="fade-up">Discover, Subscribe and Request APIs</h1>
            <p className="text-xl text-gray-400 mb-8">Gain access to different API plans </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div >
                <Link className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0" to='/marketplace'>Discover now</Link>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
