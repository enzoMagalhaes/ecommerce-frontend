

import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TopBar from './components/topbar.js'
import CircularProgress from '@mui/material/CircularProgress';


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


    const apiUrl = "http://127.0.0.1:8000/user/make_transaction"
    fetch(apiUrl,requestOptions)
      .then(response => {
        if (response.ok){
          console.log('ok')
        }
      })

  }


  const [Products,setProducts] = useState({loading: true,products: null})

  const baseurl = 'http://127.0.0.1:8000' //fix this later

  const getCartProducts = () => {
    
    const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        }, 
    };
    const apiUrl = "http://127.0.0.1:8000/user/cart"
    fetch(apiUrl,requestOptions)
      .then(response => response.json())
      .then(data => {
        setProducts({loading:false,products:data})
      })
  }

  const get_cart_info = () => {
    if(Products.loading){
      return <CircularProgress sx={{ color: '#fc2112', marginLeft: 10,marginTop:10}}/> 
    }else{

      var products = Products.products
      var discounted_total = 0
      var total = 0
      for (let i = 0;i < products.length; i++) {
      
        discounted_total += products[i].price*(1-products[i].discount_rate)
        total += parseInt(products[i].price)

      }

      var total_discount = total-discounted_total
      total_discount = total_discount.toFixed(2)

      return(
            <div>
                <Typography variant="subtitle1" >   
                    Preco original: <span style={{color:"#000000"}}>{total}</span>
                </Typography>


                <Typography variant="subtitle1">   
                    Cupons de desconto: <span style={{color:"#000000"}}>-{total_discount}</span>
                </Typography>       
                <hr/>
                <Typography variant="h6" sx={{fontWeight:"bold"}}>   
                    Total: {discounted_total}
                </Typography>  
            </div>
      )
    }
  }


  useEffect(() => {
    getCartProducts()
  }, [])


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


                {get_cart_info()}


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
            <Grid item xs={10} sx={{marginTop:2}} direction="row" alignItems="center">
                <Typography variant="subtitle2">   
                  <WarningAmberIcon sx={{color:'#faa702'}}/> Parcele em até 3x para compras acima de R$50,00 e em até 6x sem juros para compras acima de R$100,00.
                </Typography> 
                <TextField id="cartao_nome" variant="outlined" label="Nome do cartao" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setCartaoNome)}/>
                <TextField id="cartao" variant="outlined" label="Numero do cartao" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setCartao)}/>
                <TextField id="cpf" variant="outlined" label="CPF" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setCPF)}/>
                <TextField id="mm" variant="outlined" label="MM" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setMM)}/>
                <TextField id="aa" variant="outlined" label="AA" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setAA)}/>
                <TextField id="cvv" variant="outlined" label="CVV" size="small" style = {{width: 400,height:60}} onChange={(e) => onchange(e,setCVV)}/>
     
            </Grid>
            <Grid item xs={1}/>
 
            </Grid>
          </Paper>     
        </Grid>        

      </Grid>
    </Box>

    </React.Fragment>
  )

}