

import React, {useEffect} from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"


import NavPage from './components/navigation_page.js'
import ProductPage from './components/product_page.js'
import IndexPage from './components/index_page.js'
import ErrorPage from './components/error_page.js'
import RegisterPage from './components/register_page.js'
import LoginPage from './components/login_page.js'
import CartPage from './components/cart_page.js'
import CheckoutPage from './components/checkout_page.js'

function App(){

  useEffect(() => {
    document.title = "Loja online!"
  }, [])


  return (

    <Router>

        <Routes>

            <Route path="/navigate" element={<NavPage/>} />
            <Route path="/navigate/:search_term" element={<NavPage/>} />
            <Route path="/product/:product_id" element={<ProductPage/>} />
            <Route path="/" element={<IndexPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>            
            <Route path="/cart" element={<CartPage/>}/>            
            <Route path="/checkout" element={<CheckoutPage/>}/>            
            <Route path="*" element={<ErrorPage/>}/>


        </Routes>

    </Router>


  )

}

export default App