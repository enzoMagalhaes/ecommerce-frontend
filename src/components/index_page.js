

import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import TopBar from './components/topbar.js'
import Offercard from './components/offer_card.js'
import ImageSlider from './components/slideshow.js'

import {useNavigate} from 'react-router-dom'

export default function NavigationPage(){
  const navigate = useNavigate()

  const goToNavigate = (e) => {
    const search_term = e.target.input.value
    navigate('/navigate/' + search_term)

  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <TopBar submitfunc={goToNavigate}/>

        <ImageSlider/>

        <Grid item xs={12}>

          <Typography sx={{ textAlign:"center", fontSize:20,color:"#545454"}} gutterBottom>

            Ofertas para todos os bolsos
          </Typography>

        </Grid>

        <Grid item xs={1}/>

        <Grid item xs={2.425}>
          <Offercard img="/card1.webp"/>
        </Grid>

        <Grid item xs={0.1}/>

        <Grid item xs={2.425}>
          <Offercard img="/card2.webp"/>
        </Grid>

        <Grid item xs={0.1}/>

        <Grid item xs={2.425}>
          <Offercard img="/card3.webp"/>
        </Grid>

        <Grid item xs={0.1}/>

        <Grid item xs={2.425}>
          <Offercard img="/card4.webp"/>
        </Grid>

        <Grid item xs={1}/>
      </Grid>
    </Box>

    </React.Fragment>
  )

}