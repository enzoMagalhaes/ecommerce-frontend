

import React , {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import TopBar from './components/topbar.js'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import {useNavigate} from 'react-router-dom'
import SendRequest from '../api_utils.js'

import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
    const apiUrl = '/' + product_id
    SendRequest(apiUrl,"GET",null,false)
      .then(response => response.json())
      .then(product_data => {
        setProduct(product_data)
      })
  }, [product_id]) 




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

        <Stack direction="row" alignItems="center" spacing={1} sx={{marginTop:3}}>
          <LocalShippingOutlinedIcon sx={{color: '#76ff03'}}/> 
          <Typography color="text.secondary" variant="subtitle1">
            Frete Gratis para todo Brasil !
          </Typography> 
        </Stack>


      )
    }else{

      return (
        <Stack direction="row" alignItems="center" spacing={1} sx={{marginTop:3}}>
          <LocalShippingOutlinedIcon sx={{color: '#4caf50'}}/>
          <Typography color="text.secondary" variant="subtitle1">
            Frete para todo Brasil: {Product.price}
          </Typography> 
        </Stack>
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
    
    const apiUrl = "/user/addcart"
    SendRequest(apiUrl,"POST",data,true)

  }


  const buyNow = () => {

    const data = {product_id: parseInt(product_id)}

    const apiUrl = "/user/addcart"
    SendRequest(apiUrl,"POST",data,true)
      .then(response => {
        if (response.ok){
          navigate('/cart')
        }
      })    

  }

  const [WishIcon,setWishIcon] = useState(false)

  useEffect( () =>  {

    const init_wish_icon = () => {
      const apiUrl = '/user/wishlist'
      SendRequest(apiUrl,"GET",null,true)
        .then(response => response.json())
        .then(products_data => {
            
          for(var i = 0; i < products_data.length; i++) {
            var wish_product = products_data[i];
            if(parseInt(product_id) === wish_product.id){
              setWishIcon(true)
            }
          }        

        })
    }

    init_wish_icon()

  } , [product_id]) 

  const addwish = () => {

    if(WishIcon ===false){
    const data = {product_id:parseInt(product_id)}

    const apiUrl = '/user/addwish'
    SendRequest(apiUrl,"POST",data,true)
      .then(response => {
        if (response.ok){
          setWishIcon(true)
        }

      })
    }else{

    const data = {product_id:parseInt(product_id)}

    const apiUrl = '/user/delwish'
    SendRequest(apiUrl,"POST",data,true)
      .then(response => {
        if (response.ok){

          console.log("ok")
          setWishIcon(false)
          
        }

      })      

    }

  }


  const handle_wish = () => {

      if(WishIcon){
        return (
          <FavoriteIcon sx={{color: "#ff0000"}} onClick={addwish}/>
        ) 
      }else{
        return (
          <FavoriteBorderIcon sx={{color: "#ff0000"}} onClick={addwish}/>
        ) 
      }

  }



  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <TopBar submitfunc={goToNavigate}/>

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


                  <Grid item xs={9}>
                    <Stack direction="row" alignItems="center" spacing={2}>

                      <Rating value={Product.rating || 0} readOnly />

                      <Typography variant="subtitle1" sx={{marginTop: 3,marginLeft:2}}>                        
                        {Product.amount_sold} vendidos
                      </Typography>

                      {get_discount()}

                      {handle_wish()}
                    </Stack>
                  </Grid>

                  <Grid item xs={3}/>

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