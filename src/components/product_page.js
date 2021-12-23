

import React , {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import TopBar from './components/topbar.js'
import Button from '@mui/material/Button';

import {makeStyles} from '@mui/styles'
import {useNavigate} from 'react-router-dom'



import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import {useParams} from 'react-router-dom'

export default function ProductPage(){
  const navigate = useNavigate()
  
  const goToNavigate = (e) => {
    const search_term = e.target.input.value
    navigate('/navigate/' + search_term)

  }
  const [Quantity,setQuantity] = useState(1)

  const incrementQuantity = () => {
    setQuantity(Quantity+1)
  }
  const decrementQuantity = () => {
    if(Quantity > 1){
      setQuantity(Quantity-1)
    }
  }


  const {product_id} = useParams()

  const [Product,setProduct] = useState({})

  useEffect( () =>  {
    const apiUrl = 'http://127.0.0.1:8000/' + product_id
    fetch(apiUrl)
      .then(response => response.json())
      .then(product_data => {
        setProduct(product_data)
      })

  }, []) 




  const handle_prices = () => {

    if (Product.is_promotion){  

      let discounted_price = Product.price*(1-Product.discount_rate)
      discounted_price = parseFloat(discounted_price).toFixed(2)

      let discount = Product.discount_rate * 100

      return {del_price:Product.price,price:discounted_price,discount:discount}
    }else{
      return {del_price:null,price:Product.price,discount: null}
    }

  }


  const prices = handle_prices()

  const render_del_price = () => {

    if (Product.is_promotion){
      return (

            <Typography color="text.secondary" sx={{marginRight: 1}}>
              <del>R${prices.del_price}</del> <b style={{color: '#fc2112'}}> -{prices.discount}% OFF</b>
            </Typography>

        )
    }

  }


  const render_free_shipping = () => {

    if(Product.free_shipping){
      return (


        <Typography color="text.secondary" variant="subtitle1" sx={{marginTop: 3}}>
          <LocalShippingOutlinedIcon sx={{color: '#76ff03'}}/> Frete Gratis para todo Brasil !

        </Typography> 


      )
    }else{

      return (

        <Typography color="text.secondary" variant="subtitle1" sx={{marginTop: 3}}>
          <LocalShippingOutlinedIcon sx={{color: '#4caf50'}}/> Frete para todo Brasil: {Product.price}

        </Typography> 


      )

    }


  }



  const get_discount = () => {

    if (Product.is_promotion){

      return (

          <Typography variant="subtitle1" sx={{marginTop: 3 ,color: '#fc9f12'}}>
                      
              {Product.discount_rate * 100}% de desconto

          </Typography>


      )


    }

  }


  const addToCart = () => {

    const data = {
      product_id: parseInt(product_id)

    }

    const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }, 
        body: JSON.stringify(data)
    };

    console.log(requestOptions.body)


    const apiUrl = "http://127.0.0.1:8000/user/addcart"
    fetch(apiUrl,requestOptions)

  }


  const buyNow = () => {

    const data = {product_id: parseInt(product_id)}

    const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        }, 
        body: JSON.stringify(data)
    };

    const apiUrl = "http://127.0.0.1:8000/user/addcart"
    fetch(apiUrl,requestOptions)
      .then(response => {
        if (response.ok){
          console.log("ok")
          navigate('/cart')
        }
      })    

  }


  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <Grid xs={12}>
          <TopBar submitfunc={goToNavigate}/>
        </Grid>



        <Grid item xs={1} />


        <Grid item xs={10}>
          <Paper elevation={3}>
            <Grid container>
              
              <Grid item xs={5}>

               <Box
                  component="img"
                  sx={{
                    height: 600,
                    width: 450,
                    maxHeight: { xs: 400, md: 600 },
                    maxWidth: { xs: 300, md: 450 },
                  }}
                  src={Product.img}
                />
              </Grid>
                

              <Grid item xs={7}>

                <Grid container sx={{alignItems:"center"}}>
                  
                  <Grid item xs={12}>

                    <Typography variant="h4" sx={{marginTop: 3}}>
                      
                    {Product.description}

                    </Typography>

                  </Grid>


                  <Grid item xs={2}>
                    <Rating sx={{marginTop: 3}} value={Product.rating || 0} readOnly />
                  </Grid>           

                  <Grid item xs={3}>

                    <Typography variant="subtitle1" sx={{marginTop: 3,marginLeft:2}}>
                      
                    {Product.amount_sold} vendidos

                    </Typography>

                  </Grid>                  

                  <Grid item xs={2}>

                    {get_discount()}
                    
                  </Grid>

                  <Grid item xs={5}/>

                  <Grid item xs={6}>

                    <Typography variant="h4" sx={{marginTop: 3 ,color: '#fc2112'}}>
                      
                    {render_del_price()} 

                    <div style={{marginLeft:10}}>
                    R${prices.price}
                    </div>

                    </Typography>                    

                  </Grid>

                  <Grid item xs={6}/>


                  <Grid item xs={2}>
                    <Typography color="text.secondary" variant="subtitle1" sx={{marginTop: 3, marginLeft:1.5}}>
                    Frete:
                    </Typography>                 

                  </Grid>

                  <Grid item xs={10}> 
    
                    {render_free_shipping()}                

                  </Grid>

                  <Grid item xs={2} alignItems="center">
                    <Typography color="text.secondary" variant="subtitle1" sx={{marginTop: 3, marginLeft:1.5}}>
                    Quantidade:
                    </Typography>                 

                  </Grid>

                  <Grid item xs={10} sx={{marginTop:3}}> 
                    <IconButton onClick={decrementQuantity}>
                      <ArrowLeftIcon/>
                    </IconButton>

                    <TextField id="quantidade" variant="outlined" size="small" style = {{width: 50}} value={Quantity}/>

                    <IconButton onClick={incrementQuantity}>
                      <ArrowRightIcon/>
                    </IconButton>

                  </Grid>

                  <Grid item xs={3} sx={{marginTop: 10, marginLeft:1.5}}>
                    <Button variant="outlined"

                    sx={{
                      ':hover': {
                        borderColor: "#fc2112",
                        color: '#fc2112',
                      },
                      borderColor: '#fc2112',
                      border: '1px solid',
                      color: '#fc2112',
                      fontWeight: 'bold',
                      fontSize: 12

                    }}
                    onClick={addToCart}
                    >
                    <AddShoppingCartIcon/>
                      Adicionar ao Carrinho
                    </Button>

                  </Grid>




                  <Grid item xs={7} sx={{marginTop: 10, marginLeft:1.5}}>
                    <Button variant="contained"

                    sx={{
                      ':hover': {
                        backgroundColor: "#fc2112",
                        color: 'white',
                      },
                      backgroundColor: "#fc2112",
                    }}
                    onClick={buyNow}
                    >
                      Comprar Agora
                    </Button>

                  </Grid>

                </Grid>







              </Grid>

            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={1} />



      </Grid>
    </Box>

    </React.Fragment>
  )

}