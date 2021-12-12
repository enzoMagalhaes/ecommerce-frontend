import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function ImgMediaCard() {
  const [value, setValue] = React.useState(4);

  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardActionArea>

        <CardMedia
          component="img"
          height="200"
          image="/iphone.png"
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            iphone 12 preto 4 gb ram 64mpix com oled e ainda e caro pra cacete 
          </Typography>


          <Grid container justify="space-between">

            <Typography color="text.secondary" sx={{marginRight: 1}}>
              <del>R$50</del>
            </Typography>

            <Typography color="red">
              R$20
            </Typography>

          </Grid>


          <Grid container justify="space-between">

            <Typography variant="body2" color="text.secondary">
              <FavoriteBorderOutlinedIcon/> <Rating name="read-only" value={value} readOnly /> 200 vendidos
            </Typography>

          </Grid>


        </CardContent>

      </CardActionArea>
    </Card>
  );
}
