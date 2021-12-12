

import React , {useState,useEffect} from 'react'
import Filters from './components/filters.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import { styled } from '@mui/material/styles';

import TopBar from './components/topbar.js'
import Product from './components/product.js'

function App(props){

  const productsa = [1,2,3]
  
  const [Products,setProducts] = useState({loading: true,products: null})
  
  const getProducts = () => {
    setProducts({loading:true})
    const apiUrl = 'http://127.0.0.1:8000/'
    fetch(apiUrl)
      .then(response => response.json())
      .then(products => {
        setProducts({loading:false,products:products})
      })
  }

  useEffect(() => {
    getProducts()
  }, [setProducts])


  const render_products = () => {
    if(Products.loading){
      return <p> Loading...</p>
    }
    else{
      // need to return the map directly
      return Products.products.map(product =>
                  <Product description={product.description} price={product.price} amount_sold={product.amount_sold} 
                  img={product.img} is_promotion={product.is_promotion} discount_rate={product.discount_rate}/>
              )

    }
  }


  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <Grid xs={12}>
          <TopBar/>
        </Grid>

        <Grid item xs={3}>
         <Filters/>
        </Grid>

        <Grid item xs={9}>
          
          <Grid container spacing={2}>

            {render_products()}

          </Grid>


          <Pagination count={10} size="large" />
        </Grid>

      </Grid>
    </Box>

    </React.Fragment>
  )

}

export default App