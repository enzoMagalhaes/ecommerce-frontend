import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';


export default function OfferCard(props) {

  return (
    <Paper variant="outlined">
        <CardMedia
          component="img"
          height="250"
          image={props.img}
        />
    </Paper>
  );
}
