

import React , {useState,useEffect} from 'react'
import Filters from './components/filters.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';



import TopBar from './components/topbar.js'
import Product from './components/product.js'

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

        <Grid item xs={3}>

        </Grid>

      </Grid>
    </Box>

    </React.Fragment>
  )

}