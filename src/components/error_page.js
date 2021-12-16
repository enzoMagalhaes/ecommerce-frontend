

import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import TopBar from './components/topbar.js'
import Paper from '@mui/material/Paper';

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

        <Grid xs={2}/>

        <Grid xs={8} sx={{marginTop:25}}>


            <Typography sx={{textAlign:"center",fontWeight:"bold",fontSize:25}}>

              Parece que esta página não existe

            </Typography>

            <Typography sx={{textAlign:"center"}}>

              ir para a
              <Link href="/" underline="none">
                {' pagina principal'}
              </Link>

            </Typography>



        </Grid>

        <Grid xs={2}/>


      </Grid>
    </Box>

    </React.Fragment>
  )

}