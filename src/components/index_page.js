

import React , {useState,useEffect} from 'react'
import Filters from './components/filters.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import ImageSlider from './components/slideshow.js'


import TopBar from './components/topbar.js'
import Product from './components/product.js'
import Offercard from './components/offer_card.js'

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

        <Grid xs={12}>
          <TopBar submitfunc={goToNavigate}/>
        </Grid>

        <ImageSlider/>

        <Grid xs={5}>
          <Offercard/>
        </Grid>


      </Grid>
    </Box>

    </React.Fragment>
  )

}