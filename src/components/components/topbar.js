
import React , {useState,useEffect} from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {makeStyles} from '@mui/styles'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';

import Popper from './popper.js'
import Grid from '@mui/material/Grid';
import {useNavigate} from 'react-router-dom'


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

export default function TopBar(props) {

  const navigate = useNavigate()
  const goToIndex = () => {
    navigate('/')
  }
  const goToLogin = () => {
    navigate('/login')
  }
  const goToRegister = () => {
    navigate('/register')
  }  
  const goToCart = () => {
    navigate('/cart')
  }

  const [Loggedin,setLoggedin] = useState(false)
  const [Refresh,setRefresh] = useState(false)

  const check_token = () => {
    
    const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        }, 
    };
    const apiUrl = "http://127.0.0.1:8000/auth/check_token"
    fetch(apiUrl,requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.auth_status == "OK"){
          setLoggedin(true)
        }else{
          setLoggedin(false)
        }
      })

    return Loggedin
  }

  const refresh_token = () => {

    const refresh = localStorage.getItem('refresh_token') || null
    var data = {refresh: refresh}

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const apiUrl = "http://127.0.0.1:8000/auth/token/refresh"
    fetch(apiUrl,requestOptions)
      .then(response => response.json())
      .then(data => {

        localStorage.setItem('access_token',data.access)
        setRefresh(true)

      })
  }



  const handle_token = () => {
    const is_logged_in = check_token()
    if(is_logged_in == false){
      refresh_token()
    }
  }

  useEffect( () =>  {
    handle_token()
  }, [Refresh]) 



  const logout = () => {

    const refresh = localStorage.getItem('refresh_token') || null
    var data = {refresh_token: refresh}

    const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(data)
    };

    const apiUrl = "http://127.0.0.1:8000/auth/logout"
    fetch(apiUrl,requestOptions)
      .then(response => {
        if(response.ok){
          setLoggedin(false)
        }
      })


  }





  const handle_loggedin_buttons = () => {

    if(Loggedin==false){

      return(
        <>

              <Grid item xs={1.25}>     
                  <Button variant="outlined" className={classes.signin} disableRipple='true'
                  onClick={goToLogin}
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
                  onClick={goToRegister}
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


        </>
      )


    }else{

      return(
        <>

              <Grid item xs={1.25}/>

              <Grid item xs={1.5}>     
                  <Button variant="contained"  className={classes.register} disableRipple='true'
                  onClick={logout}
                  sx={{
                    ':hover': {
                      backgroundColor: "black",
                      color: 'white',
                    },
                  }}
                  >
                    deslogar
                  </Button>

              </Grid>



        </>
      )


    }


  }





  const classes = useStyles()
  const mobileMenuId = 'primary-search-account-menu-mobile';
  return (
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>

          <Grid container spacing={0} alignItems="center" justify="center">

              <Grid item xs={1}>
                  <img src="/store-logo.png" className={classes.logo} onClick={goToIndex}/>
              </Grid>

              <Grid item xs={1}>
                  <Popper/>
              </Grid>

              <Grid item xs={4}>
                  <Search >
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>

                    <form onSubmit={props.submitfunc} autocomplete="off">
                      
                      <StyledInputBase
                        onChange={props.searchfunc}
                        placeholder="Pesquisar"
                        name="input"
                        value={props.search_term}
                        inputProps={{ 'aria-label': 'search' }}
                      />

                    </form>

                  </Search>
              </Grid>

              <Grid item xs={2.85}>
                 
              </Grid>

              <Grid item xs={0.4}>
                  <ShoppingCartIcon onClick={goToCart}/>
              </Grid>


              {handle_loggedin_buttons()}

          </Grid>



        </Toolbar>
      </AppBar>
  );
}
