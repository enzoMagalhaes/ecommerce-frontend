

import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import TopBar from './components/topbar.js'


export default function CheckoutPage(){

  const [Nome,setNome] = useState("")
  const [Sobrenome,setSobrenome] = useState("")
  const [Estado,setEstado] = useState("")
  const [CEP,setCEP] = useState("")
  const [Endereco,setEndereco] = useState("")
  const [Numero,setNumero] = useState("")
  const [Complemento,setComplemento] = useState("")
  const [Bairro,setBairro] = useState("")
  const [Cidade,setCidade] = useState("")
  const [Cartao,setCartao] = useState("")
  const [CartaoNome,setCartaoNome] = useState("")
  const [CPF,setCPF] = useState("")
  const [MM,setMM] = useState("")
  const [AA,setAA] = useState("")
  const [CVV,setCVV] = useState("")


  const onchange = (e,setfunction) => {

    setfunction(e.target.value)
  } 


  const submitCheckout = (e) => {

    const data = {
      Nome:Nome,
      Sobrenome:Sobrenome,
      Estado:Estado,
      CEP:CEP,
      Endereco:Endereco,
      Numero:Numero,
      Complemento:Complemento,
      Bairro:Bairro,
      Cidade:Cidade,
      Cartao:Cartao,
      CartaoNome:CartaoNome,
      CPF:CPF,
      MM:MM,
      AA:AA,
      CVV:CVV,
    }

    const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        }, 
        body: JSON.stringify(data)
    };


    const apiUrl = "http://127.0.0.1:8000/user/handle_transaction"
    fetch(apiUrl,requestOptions)
      .then(response => {
      })

  }


  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>


        <TopBar/>


        <Grid item xs={1}/>


        <Grid item xs={5}>
          <Paper elevation={3}>
            <Grid container>
              <Grid item xs={1}/>

              <Grid item xs={11}>
                <Typography variant="h4">
                  Finalizar Compra
                </Typography> 
              </Grid> 

            <Grid item xs={1}/>
            <Grid item xs={11}>
                <Typography variant="subtitle2" color="text.secondary">
                  Endereco para a entrega
                </Typography> 
                <TextField id="nome" variant="outlined" label="Nome" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setNome)}/>
                <TextField id="sobrenome" variant="outlined" label="Sobrenome" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setSobrenome)}/>
                <TextField id="estado" variant="outlined" label="Estado" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setEstado)}/>
                <TextField id="cep" variant="outlined" label="CEP" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setCEP)}/>
                <TextField id="endereco" variant="outlined" label="Endereco" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setEndereco)}/>
                <TextField id="numero" variant="outlined" label="Numero" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setNumero)}/>
                <TextField id="complemento" variant="outlined" label="Complemento" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setComplemento)}/>
                <TextField id="bairro" variant="outlined" label="Bairro" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setBairro)}/>
                <TextField id="cidade" variant="outlined" label="Cidade" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setCidade)}/>     
            </Grid> 
            </Grid>
          </Paper>     
        </Grid>

        <Grid item xs={1}/>

        <Grid item xs={4} sx={{}}>
          <Paper elevation={3}>
            <Grid container>
              <Grid item xs={0.5}/>
              <Grid item xs={11}>
                <Typography variant="h4" >   
                    Resumo
                </Typography>


                <Typography variant="subtitle1" >   
                    Preco original:
                </Typography>


                <Typography variant="subtitle1" >   
                    Cupons de desconto:
                </Typography>       
                <hr/>
                <Typography variant="h6" sx={{fontWeight:"bold"}}>   
                    Total: 
                </Typography>  

                 <Typography variant="caption" color="color.secondary" >   
                    Ao concluir sua compra, você concorda com os nossos Termos de Serviço.
                </Typography>   

                    <Button variant="contained" disableRipple sx={{
                      backgroundColor:'#ff0026',
                      width: "100%",
                      height: "7vh",
                      marginBottom:2,
                      fontWeight: 'bold',
                      ':hover': {
                        backgroundColor:'#bd001c',
                      }
                    }}
                    onClick={submitCheckout}
                    >
                    Finalizar o pagamento
                    </Button>                  
              </Grid>
              <Grid item xs={0.5}/>


            </Grid>
          </Paper>     
        </Grid>

        <Grid item xs={1}/>
        <Grid item xs={1}/>



        <Grid item xs={5}>
          <Paper elevation={3}>
            <Grid container>


            <Grid item xs={1}/>
            <Grid item xs={11} sx={{marginTop:2}}>
                <Typography variant="subtitle2" >   
                    Parcele em até 3x para compras acima de R$50,00 e em até 6x sem juros para compras acima de R$100,00.
                </Typography> 
                <TextField id="cartao_nome" variant="outlined" label="Nome do cartao" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setCartaoNome)}/>
                <TextField id="cartao" variant="outlined" label="Numero do cartao" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setCartao)}/>
                <TextField id="cpf" variant="outlined" label="CPF" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setCPF)}/>
                <TextField id="mm" variant="outlined" label="MM" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setMM)}/>
                <TextField id="aa" variant="outlined" label="AA" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setAA)}/>
                <TextField id="cvv" variant="outlined" label="CVV" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setCVV)}/>
     
            </Grid> 
            </Grid>
          </Paper>     
        </Grid>        

      </Grid>
    </Box>

    </React.Fragment>
  )

}