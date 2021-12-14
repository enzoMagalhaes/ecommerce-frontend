

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



import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

import {useParams} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  addcart: {
    borderColor: 'white',
    border: '1px solid',
    color: 'white',
    marginRight: 5,
    fontWeight: 'bold'
  },


  buynow: {
    backgroundColor: "orange",
    fontWeight: 'bold'
  },
}))



export default function ProductPage(){

  const [Quantity,setQuantity] = useState(1)

  const onQuantityChange = (e) => {
    setQuantity(e.target.value)
  }
  const incrementQuantity = () => {
    setQuantity(Quantity+1)
  }
  const decrementQuantity = () => {
    setQuantity(Quantity-1)
  }


  const {product_id} = useParams()

  const [Product,setProduct] = useState({})

  useEffect( () =>  {
    const apiUrl = 'http://127.0.0.1:8000/' + product_id
    fetch(apiUrl)
      .then(response => response.json())
      .then(product_data => {
        console.log(product_data)
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






  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <Grid xs={12}>
          <TopBar/>
        </Grid>



        <Grid item xs={1} />


        <Grid item xs={10}>
          <Paper elevation={3}>
            <Grid container>
              
              <Grid item xs={4}>

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
                

              <Grid item xs={8}>

                <Grid container sx={{alignItems:"center"}}>
                  
                  <Grid item xs={12}>

                    <Typography variant="h4" sx={{marginTop: 3}}>
                      
                    {Product.description}

                    </Typography>

                  </Grid>


                  <Grid item xs={2}>
                    <Rating sx={{marginTop: 3}} value={Product.rating} readOnly />
                  </Grid>           

                  <Grid item xs={2}>

                    <Typography variant="subtitle1" sx={{marginTop: 3}}>
                      
                    {Product.amount_sold} vendidos

                    </Typography>

                  </Grid>                  

                  <Grid item xs={2}>

                    <Typography variant="subtitle1" sx={{marginTop: 3 ,color: '#fc9f12'}}>
                      
                    {Product.discount_rate * 100}% de desconto

                    </Typography>

                  </Grid>

                  <Grid item xs={6}/>

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
                    >
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