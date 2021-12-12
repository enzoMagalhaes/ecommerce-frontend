import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {makeStyles} from '@mui/styles'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';

import Popper from './popper.js'
import Grid from '@mui/material/Grid';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  logo: {
    height: `10vh`,
    width: `15vh`
  },

  appbar: {
    backgroundColor: '#fc2112',
    paddingTop: 5
  },


  signin: {
    borderColor: 'white',
    border: '1px solid',
    color: 'white',
    marginRight: 5,
    fontWeight: 'bold'
  },


  register: {
    backgroundColor: "black",
    fontWeight: 'bold'
  },




}))

export default function PrimarySearchAppBar() {

  const classes = useStyles()
  const mobileMenuId = 'primary-search-account-menu-mobile';
  return (
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>

          <Grid container spacing={0} alignItems="center" justify="center">

              <Grid item xs={1}>
                  <img src="/store-logo.png" alt="logo" className={classes.logo}/>
              </Grid>

              <Grid item xs={1}>
                  <Popper/>
              </Grid>

              <Grid item xs={4}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Pesquisar"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
              </Grid>

              <Grid item xs={2.85}>
                 
              </Grid>

              <Grid item xs={0.4}>
                  <ShoppingCartIcon/>
              </Grid>


              <Grid item xs={1.25}>     
                  <Button variant="outlined" className={classes.signin} disableRipple='true'

                  sx={{
                    ':hover': {
                      borderColor: "white",
                      color: 'white',
                    },
                  }}
                  >
                    Fazer Login
                  </Button>
              </Grid>


              <Grid item className={classes.griditem} xs={1.5}> 
                  
                  <Button variant="contained"  className={classes.register} disableRipple='true'
                  sx={{
                    ':hover': {
                      backgroundColor: "black",
                      color: 'white',
                    },
                  }}
                  >
                    Cadastrar-se
                  </Button>

              </Grid>

          </Grid>



        </Toolbar>
      </AppBar>
  );
}
