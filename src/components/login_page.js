

import React , {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TopBar from './components/topbar.js'
import Button from '@mui/material/Button';

import {useNavigate} from 'react-router-dom'

export default function Login(){

  const navigate = useNavigate()

  const goToIndex = () => {
    navigate('/')
  }

  const [Success,setSuccess] = useState(null)

  const login = (e) => {

    e.preventDefault()


    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const data = {
      email:email,
      password: password

    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };


    const apiUrl = "http://127.0.0.1:8000/auth/token"
    fetch(apiUrl,requestOptions)
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

  }


  const render_form_status = () => {
    if (Success == false){

          <Typography variant="subtitle1" sx={{color:'red'}}>
              Something went wrong.
          </Typography>

      }

    }



  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <Grid item xs={3} />


        <Grid item xs={6}>
          <Paper elevation={3} sx={{marginTop:15}}>
            <Grid container>
              
              <Grid item xs={1}/>

              <form onSubmit={(e) =>  login(e)}>

                <Grid item xs={11} sx={{marginTop:2}}>
                  {render_form_status()}
                  
                  <TextField id="email" variant="outlined" label="Email" size="small" style = {{width: 400,height:60}}/>

                </Grid>

                <Grid item xs={1}/>

                <Grid item xs={10}>

                  <TextField id="password" variant="outlined" label="Senha" type="password" size="small" style = {{width: 400,height:60}}/>

                  <Button 
                        variant="outlined"
                        type="submit"

                        sx={{
                          ':hover': {
                            borderColor: "#35d411",
                            color: '#35d411',
                          },
                          borderColor: '#35d411',
                          border: '1px solid',
                          color: '#35d411',
                          fontWeight: 'bold',
                          fontSize: 12,
                          width: "100%",
                          marginBottom:10
                        }}
                      >
                      Login
                  </Button>
                </Grid>

              </form>




            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={3} />



      </Grid>
    </Box>

    </React.Fragment>
  )

}