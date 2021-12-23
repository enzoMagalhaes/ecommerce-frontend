

import React , {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TopBar from './components/topbar.js'
import Button from '@mui/material/Button';
import SendRequest from '../api_utils.js'


export default function Register(){

  // useEffect( () =>  {
    

  // }, []) 


    // fields = ('email','user_name','password') (REGISTER)
// email password (LOGIN)


  const [Success,setSuccess] = useState(null)

  const register_user = (e) => {

    e.preventDefault()


    const email = document.getElementById("email").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const confirm_password = document.getElementById("confirm_password").value


    if (password != confirm_password){
      alert("password didnt match!")
      return;
    }

    const data = {

      email:email,
      user_name:username,
      password: password

    }


    const apiUrl = "/auth/register"
    SendRequest(apiUrl,"POST",data,false)
      .then(response => {
        if(response.ok){
          setSuccess(true)
        }else{
          setSuccess(false)
        }

      })

  }


  const render_form_status = () => {

    if (Success === true){

      return (

        <Typography variant="subtitle1" sx={{color:'green'}}>
            Registration Successfull
        </Typography>



      )

    }else if (Success === false){

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
              
              <Grid item xs={2}/>

              <form onSubmit={(e) => register_user(e)}>

                <Grid item xs={8} sx={{marginTop:2}}>

                  {render_form_status()}

                    <TextField id="email" label="Email" variant="outlined" size="small" sx={{width: 400,height:60}}/>

                </Grid>

                <Grid item xs={2}/>
                <Grid item xs={2}/>

                <Grid item xs={8}>
                  <TextField id="username" label="Usuario" variant="outlined" size="small" sx={{width: 400,height:60}}/>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={2}/>


                <Grid item xs={8}>
                  <TextField id="password" label="Senha" type='password' variant="outlined" size="small" sx={{width: 400,height:60}}/>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={2}/>

                <Grid item xs={8}>
                  <TextField id="confirm_password" label="Confirmar senha" type='password' variant="outlined" size="small" sx={{width: 400,height:60}}/>


                      <Button 
                        variant="contained"
                        type="submit"

                        sx={{
                          ':hover': {
                            backgroundColor: "#fc2112",
                            color: 'white',
                          },
                          backgroundColor: '#fc2112',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 12,
                          width:"100%",
                          marginBottom:4
                        }}
                      >
                      Registrar
                      </Button>


                </Grid>
                <Grid item xs={2}/>
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