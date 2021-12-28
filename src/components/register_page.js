
import React , {useState} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendRequest from '../api_utils.js'

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'

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

export default function Register(){
  const navigate = useNavigate()

  const goToIndex = () => {
    navigate('/')
  }

  const [Success,setSuccess] = useState(null)

  const render_form_status = () => {
    if (Success === true){
      return (
        <Typography variant="subtitle1" sx={{color:'green'}}>
            Cadastro concluido!
        </Typography>
      )

    }else if (Success === false){
      return(
        <Typography variant="subtitle1" sx={{color:'red'}}>
            Algo errado no registro.
        </Typography>
      )
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    if(form.get("password") !== form.get("confirm_password")){

      setSuccess(false)
      return

    }

    const data = {
      email: form.get('email'),
      user_name:form.get('username'),
      password: form.get('password'),
    }

    const apiUrl = "/auth/register"
    SendRequest(apiUrl,"POST",data,false)
      .then(response => {

        if(response.ok){
          setSuccess(true)
          
          // login
          const login_data = {
            email: form.get('email'),
            password: form.get('password'),
          }

          const apiUrl = "/auth/token"
          SendRequest(apiUrl,"POST",login_data,false)
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

        }else{
          setSuccess(false)
        }

      })   

  };

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
          <Avatar sx={{ m: 1,  bgcolor: '#fa2828' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Registrar Usuário
          </Typography>
          {render_form_status()}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirmar senha"
                  type="password"
                  id="confirm_password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Eu quero receber emails sobre promoções e atualizações no futuro."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,
                backgroundColor:'#fa2828',
                '&:hover':{
                  backgroundColor:'#ff0000',
                }
              }}
            >
              Registrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="https://ecommerce-reactfrontend.herokuapp.com/login" variant="body2">
                  Já tem uma conta? Entrar
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )

}