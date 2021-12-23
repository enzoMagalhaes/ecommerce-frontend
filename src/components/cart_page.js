

import React , {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import TopBar from './components/topbar.js'
import Product from './components/cart_product.js'
import {useNavigate} from 'react-router-dom'

export default function CartPage(){
  const navigate = useNavigate()

  const goToCheckout= () => {
    navigate('/checkout')
  }
  const goToNavigate = (e) => {
    const search_term = e.target.input.value
    navigate('/navigate/' + search_term)

  }

  const [Products,setProducts] = useState({loading: true,products: null})

  const baseurl = 'http://127.0.0.1:8000' //fix this later

  const getCartProducts = () => {
    
    const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        }, 
    };
    const apiUrl = "http://127.0.0.1:8000/user/cart"
    fetch(apiUrl,requestOptions)
      .then(response => response.json())
      .then(data => {
        setProducts({loading:false,products:data})
      })
  }

  const get_cart_info = () => {
    if(Products.loading){
      return <CircularProgress sx={{ color: '#fc2112', marginLeft: 10,marginTop:10}}/> 
    }else{

      var products = Products.products
      var discounted_total = 0
      var total = 0
      for (let i = 0;i < products.length; i++) {
      
        discounted_total += products[i].price*(1-products[i].discount_rate)
        total += parseInt(products[i].price)

      }

      var total_discount = (1-(discounted_total/total))*100
      total_discount = total_discount.toFixed(2)

      const result = {
        discountedTotal:discounted_total,
        total:total,
        totalDiscount:total_discount
      }

      return(
            <div>
                      <Typography variant="h4">
                        R${result.discountedTotal}
                      </Typography>                                      

                      <Typography variant="subtitle2" color="text.secondary">
                        <del>R${result.total}</del> %{result.totalDiscount} OFF
                      </Typography>  
            </div>
      )
    }

    
  }



  useEffect(() => {
    getCartProducts()
  }, [])


  const delete_function = (e) => {
    const product_card = e.target.parentElement.parentElement.parentElement
    const id = product_card.id
    console.log(id)
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
    const apiUrl = "http://127.0.0.1:8000/user/delcart"
    fetch(apiUrl,requestOptions)
      .then(response => {

        if (response.ok){
          console.log("ok")
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
                    <Product deletefunc={delete_function} key={product.id} id={product.id} description={product.description} price={product.price} amount_sold={product.amount_sold} 
                    img={baseurl+product.img} is_promotion={product.is_promotion} discount_rate={product.discount_rate} rating={product.rating}/>
                )
      }else {
        return <p style={{marginLeft: 10}}> Ainda nao tem nenhum produto no carrinho!</p>

      }


    }
  }


  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>


        <TopBar submitfunc={goToNavigate}/>


        <Grid item xs={1}/>

        <Grid item xs={6}>
          <Paper elevation={3}>
            <Grid container> 

              <Grid xs={1}/>

              <Grid xs={9}>
                <Typography variant="h4" sx={{marginTop:1,marginBottom:2}}>
                  Carrinho
                </Typography>

                {render_products()}
              </Grid>

              <Grid xs={1}/>

            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={0.2}/>

        <Grid item xs={3}>
              <Grid container> 

                  <Grid item xs={0.5}/>

                  <Grid item xs={11.5}>
                    <Typography variant="subtitle1" sx={{marginTop:1}}>
                      Total:
                    </Typography>

                    {get_cart_info()}

                    <Button variant="contained" disableRipple sx={{
                      backgroundColor:'#ff0026',
                      marginTop:2,
                      width: "80%",
                      height: "40%",
                      fontWeight: 'bold',
                      ':hover': {
                        backgroundColor:'#bd001c',
                      }
                    }}
                    onClick={goToCheckout}
                    >
                    Checkout
                    </Button>

                  </Grid>

              </Grid>
        </Grid>
        <Grid item xs={1}/>


      </Grid>
    </Box>

    </React.Fragment>
  )

}