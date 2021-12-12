import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


export default function ProductDisplay(props) {
  const [value, setValue] = React.useState(4);

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

  return (
    <Grid id={props.id} item component={Card} xs={2.4} sx={{maxWidth: 280, marginLeft:1, marginTop: 2}}>

        <CardMedia
          component="img"
          height="200"
          image={props.img}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>


          <Grid container justify="space-between">

            {render_del_price()}

            <Typography color="red">
              R${prices.price}
            </Typography>

          </Grid>


          <Grid container justify="space-between">

            <Typography variant="body2" color="text.secondary">
              <FavoriteBorderOutlinedIcon/> <Rating name="read-only" value={value} readOnly />
            </Typography>


            <Typography variant="body2" color="text.secondary">
              {props.amount_sold} vendidos
            </Typography>

          </Grid>

        </CardContent>


    </Grid>
  );
}
