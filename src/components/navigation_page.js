

import React from 'react'
import Filters from './components/filters.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import { styled } from '@mui/material/styles';

import TopBar from './components/topbar.js'

function App(){

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <Grid xs={12}>
          <TopBar/>
        </Grid>

        <Grid item xs={3}>
         <Filters/>
        </Grid>

        <Grid item xs={9} sx={{backgroundColor: 'white'}}>
          products
          <Pagination count={10} />
        </Grid>

      </Grid>
    </Box>

    </React.Fragment>
  )

}

export default App