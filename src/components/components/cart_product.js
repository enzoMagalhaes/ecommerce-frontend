import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Card from '@mui/material/Card';
import ClearIcon from '@mui/icons-material/Clear';
import {useNavigate} from 'react-router-dom'

export default function ProductDisplay(props) {
  const navigate = useNavigate()

  const goToProductPage = () => {
    navigate('/product/'+props.id)

  }

  const handle_prices = () => {
    if (props.is_promotion){  

      let discounted_price = props.price*(1-props.discount_rate)
      discounted_price = parseFloat(discounted_price).toFixed(2)

      return {del_price:props.price,price:discounted_price}
    }else{
      return {del_price:null,price:props.price}
    }

  }


  const prices = handle_prices()

  const render_del_price = () => {

    if (props.is_promotion){
      return (

            <Typography color="text.secondary" sx={{marginRight: 1}}>
              <del>R${prices.del_price}</del>
            </Typography>

        )
    }

  }


  const delete_button = () => {

    if(props.deletefunc){

      return (

          <Grid item xs={1}>

            <ClearIcon sx={{color:"#b3b3b3",marginTop:1,marginLeft:1}} onClick={props.deletefunc}/>

          </Grid>


      )

    }

  }

  return (
    <Grid id={props.id} component={Card} item xs={12} sx={{marginBottom:1,marginTop:1}}>

        <Grid container>
            <Grid item xs={3}>
              <CardMedia
                component="img"
                height="100"
                image={props.img}
                onClick={goToProductPage}
              />

            </Grid>

            <Grid item xs={0.2}/>

            <Grid item xs={7.8} >

                <div style={{marginTop:10}}>
                  
                  <Typography variant="body2" color="text.secondary">
                    {props.description}
                  </Typography>


                  <Grid container justify="space-between">

                    {render_del_price()}

                    <Typography color="red">
                      R${prices.price}
                    </Typography>

                  </Grid>


                    <Typography variant="body2" color="text.secondary">
                      <FavoriteBorderOutlinedIcon/> <Rating name="read-only" value={props.rating} readOnly />
                    </Typography>


                    <Typography variant="body2" color="text.secondary" sx={{marginLeft:1}}>
                      {props.amount_sold} vendidos
                    </Typography>

                </div>

          </Grid>

            {delete_button()}

        </Grid>

    </Grid>
  );
}
