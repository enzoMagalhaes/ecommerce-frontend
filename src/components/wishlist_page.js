

import React , {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import TopBar from './components/topbar.js'
import Product from './components/cart_product.js'


import {useNavigate} from 'react-router-dom'

export default function NavigationPage(){
  const navigate = useNavigate()

  const goToNavigate = (e) => {
    const search_term = e.target.input.value
    navigate('/navigate/' + search_term)

  }

  const [Products,setProducts] = useState({loading: true,products: null})
  const baseurl = 'http://127.0.0.1:8000' //fix this later

  const getUserWishlist = () => {
    const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        }, 
    };
    const apiUrl = "http://127.0.0.1:8000/user/wishlist"
    fetch(apiUrl,requestOptions)
      .then(response => response.json())
      .then(data => {
        setProducts({loading:false,products:data})
      })   


  }


  const delete_function = (e) => {
    const product_card = e.target.parentElement.parentElement.parentElement
    const id = product_card.id
    const data = {

      product_id: id

    }

    const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(data) 
    };
    const apiUrl = "http://127.0.0.1:8000/user/delwish"
    fetch(apiUrl,requestOptions)
      .then(response => {
        if (response.ok){
          product_card.remove()

        }
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
                    <Product key={product.id} deletefunc={delete_function} id={product.id} description={product.description} price={product.price} amount_sold={product.amount_sold} 
                    img={baseurl+product.img} is_promotion={product.is_promotion} discount_rate={product.discount_rate} rating={product.rating}/>
                )
      }else {
        return <p style={{marginLeft: 10}}> Ainda nao tem nenhum produto na Lista de Desejos!</p>

      }


    }
  }

  useEffect(() => {
    getUserWishlist()
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
                  Lista de Desejos
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