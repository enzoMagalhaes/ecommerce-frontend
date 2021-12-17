

import React , {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TopBar from './components/topbar.js'
import Button from '@mui/material/Button';


export default function Login(){

  // useEffect( () =>  {
    

  // }, []) 


    // fields = ('email','user_name','password') (REGISTER)
// email password (LOGIN)


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
            Login Successfull
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

        <Grid xs={12}>
          <TopBar/>
        </Grid>



        <Grid item xs={1} />


        <Grid item xs={10}>
          <Paper elevation={3}>
            <Grid container>
              
              <Grid item xs={1}/>

              <Grid item xs={11}>

                {render_form_status()}


                <form onSubmit={(e) =>  login(e)}>

                  <Typography variant="subtitle1" >
                    Email:
                  </Typography>
                  <TextField id="email" variant="outlined" size="small" style = {{width: 400,height:60}}/>


                  <Typography variant="subtitle1" >
                    senha:
                  </Typography>
                  <TextField id="password" type='password' variant="outlined" size="small" style = {{width: 400,height:60}}/>



                  <br/>

                    <Button 
                      variant="outlined"
                      type="submit"

                      sx={{
                        ':hover': {
                          borderColor: "#fc2112",
                          color: '#fc2112',
                        },
                        borderColor: '#fc2112',
                        border: '1px solid',
                        color: '#fc2112',
                        fontWeight: 'bold',
                        fontSize: 12,
                        marginBottom:10
                      }}
                    >
                    Login
                    </Button>

                </form>

              </Grid>




            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={1} />



      </Grid>
    </Box>

    </React.Fragment>
  )

}