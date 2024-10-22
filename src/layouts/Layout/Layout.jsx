import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router'

function Layout({ products, carts , setToken}) {
  return (
    <div>
        <Header />
        <Navbar products={products} carts={carts} setToken={setToken}/>
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout