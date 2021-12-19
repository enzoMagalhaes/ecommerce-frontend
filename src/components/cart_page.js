

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

        <Grid xs={12}>
          <TopBar submitfunc={goToNavigate}/>
        </Grid>


      </Grid>
    </Box>

    </React.Fragment>
  )

}