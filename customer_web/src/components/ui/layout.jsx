import React from 'react'
import Header from './header'
import Footer from './footer';

const Layout = ({ children, user, dispatch }) => {
    return (
        <html lang="en">
            
            <body className= "font-inter antialiased bg-gray-900 text-gray-200 tracking-tight">
                <div className="flex flex-col min-h-screen overflow-hidden">
                    <Header user={user} dispatch={dispatch}/>
                    {children}
                    <Footer/>
                </div>
            </body>
        </html>
    )
}

export default Layout;