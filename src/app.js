

import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"


import NavPage from './components/navigation_page.js'
import ProductPage from './components/product_page.js'

function App(){

  return (

    <Router>

        <Routes>

            <Route path="/" element={<NavPage/>} />
            <Route path="/product/:product_id" element={<ProductPage/>} />


        </Routes>

    </Router>


  )

}

export default App