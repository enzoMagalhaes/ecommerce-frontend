

import React , {useState} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import {useNavigate} from 'react-router-dom'
import SendRequest from '../api_utils.js'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://ecommerce-reactfrontend.herokuapp.com/">
        Loja Online!
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function Login(){

  const navigate = useNavigate()

  const goToIndex = () => {
    navigate('/')
  }

  const [Success,setSuccess] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data = {
      email: form.get('email'),
      password: form.get('password'),
    }

    const apiUrl = "/auth/token"
    SendRequest(apiUrl,"POST",data,false)
      .then(response => {
        if(response.ok){
          return response.json()
        }else{
          setSuccess(false)
          return Promise.reject()
        }

      })
      .then(response_data => {
        localStorage.setItem('access_token',response_data.access)
        localStorage.setItem('refresh_token',response_data.refresh)
        goToIndex()
      })

  };

  const render_form_status = () => {

    if (Success === false){

          return (
            <Typography variant="subtitle1" sx={{color:'red'}}>
                Usuario ou senha incorretos.
            </Typography>
          )
    }

  }

  return (

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#fa2828' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in 
          </Typography>
          {render_form_status()}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{borderColor:'#fa2828'}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Manter conectado"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableRipple
              sx={{ mt: 3, mb: 2 ,
                backgroundColor:'#fa2828',
                '&:hover':{
                  backgroundColor:'#ff0000',
                }
              }}
            >
              Log in 
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="https://ecommerce-reactfrontend.herokuapp.com/register" variant="body2">
                  {"não tem uma conta? Inscreva-se!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )

}