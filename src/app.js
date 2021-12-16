

import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"


import NavPage from './components/navigation_page.js'
import ProductPage from './components/product_page.js'
import IndexPage from './components/index_page.js'
import ErrorPage from './components/error_page.js'

function App(){

  return (

    <Router>

        <Routes>

            <Route path="/navigate" element={<NavPage/>} />
            <Route path="/navigate/:search_term" element={<NavPage/>} />
            <Route path="/product/:product_id" element={<ProductPage/>} />
            <Route path="/" element={<IndexPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>


        </Routes>

    </Router>


  )

}

export default App