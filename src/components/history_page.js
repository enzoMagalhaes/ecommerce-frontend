

import React , {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import TopBar from './components/topbar.js'
import Product from './components/cart_product.js'
import SendRequest from '../api_utils.js'


import {useNavigate} from 'react-router-dom'
import baseurl from '../media_url.js'

export default function NavigationPage(){
  const navigate = useNavigate()

  const goToNavigate = (e) => {
    const search_term = e.target.input.value
    navigate('/navigate/' + search_term)

  }

  const [Products,setProducts] = useState({loading: true,products: null})

  const getUserHistory = () => {

    const apiUrl = "/user/history"
    SendRequest(apiUrl,"GET",null,true)
      .then(response => response.json())
      .then(data => {
        setProducts({loading:false,products:data})
      })   


  }

  const render_products = () => {
    if(Products.loading){
      return <CircularProgress sx={{ color: '#fc2112', marginLeft: 10,marginTop:10}}/>
    }
    else{
      // need to return the map directly
      if (Products.products.length != 0){
        return Products.products.map(product =>
                    <Product key={product.id} id={product.id} description={product.description} price={product.price} amount_sold={product.amount_sold} 
                    img={baseurl+product.img} is_promotion={product.is_promotion} discount_rate={product.discount_rate} rating={product.rating}/>
                )
      }else {
        return <p style={{marginLeft: 10}}> Ainda nao tem nenhum produto no Historico!</p>

      }


    }
  }

  useEffect(() => {
    getUserHistory()
  }, [])


  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <TopBar submitfunc={goToNavigate}/>

        <Grid item xs={1}/>

        <Grid item xs={10}>
          <Paper elevation={3}>
            <Grid container> 

              <Grid xs={1}/>

              <Grid xs={9}>
                <Typography variant="h4" sx={{marginTop:1,marginBottom:2}}>
                  Historico de Compra
                </Typography>

                {render_products()}

              </Grid>

              <Grid xs={1}/>

            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={0.2}/>

      </Grid>
    </Box>

    </React.Fragment>
  )

}