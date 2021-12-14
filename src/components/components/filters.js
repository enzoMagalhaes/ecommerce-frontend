import * as React from 'react';
import Accordion from './accordion.js'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


export default function Filters(props) {
  const [value, setValue] = React.useState(0);

  const onchangefunction = (e,setfunction) => {

      setfunction(e.target.checked)

  }

  const onChangePrice = (e,setfunction) => {

    var value = e.target.value
    
    if (value !== ''){
      setfunction(value)
    }else{
      setfunction(null)
    }

  }


  return (
    <div>

      <Accordion title="Por Categoria" content={

        <FormGroup>
          <FormControlLabel control={<Checkbox id="celulares" onChange={(e) => onchangefunction(e,props.setcelulares)}/>} label="Celulares" />
          <FormControlLabel control={<Checkbox  id="eletronicos" onChange={(e) => onchangefunction(e,props.seteletronicos)}/>} label="Eletrônicos"/>
          <FormControlLabel control={<Checkbox  id="relogios" onChange={(e) => onchangefunction(e,props.setrelogios)}/>} label="Relógios"/>
          <FormControlLabel control={<Checkbox id="calcados" onChange={(e) => onchangefunction(e,props.setcalcados)}/>} label="Calçados"/>
          <FormControlLabel control={<Checkbox  id="bolsas" onChange={(e) => onchangefunction(e,props.setbolsas)}/>} label="Bolsas"/>
          <FormControlLabel control={<Checkbox id="roupas" onChange={(e) => onchangefunction(e,props.setroupas)}/>} label="Roupas Masculinas"/>
        </FormGroup>

      }/>

      <Accordion title="Enviado de" content={
        <FormGroup >
          <FormControlLabel control={<Checkbox  id="nacional" onChange={(e) => onchangefunction(e,props.setnacional)}/>} label="Brasil" />
          <FormControlLabel  control={<Checkbox id="importado" onChange={(e) => onchangefunction(e,props.setimportado)}/>} label="Importado" />
        </FormGroup>

      }/>

      <Accordion title="Serviço e Promoção" content={

        <FormGroup>
          <FormControlLabel control={<Checkbox  id="promocao" onChange={(e) => onchangefunction(e,props.setpromocao)}/>} label="Promoção" />
          <FormControlLabel control={<Checkbox id="frete_gratis" onChange={(e) => onchangefunction(e,props.setfrete_gratis)}/>} label="Frete Grátis"/>
        </FormGroup>

      }/>

      <Accordion title="Faixa de preço" content={

        <FormGroup>
          <TextField label="Min" variant="outlined" id="min_price" onChange={(e) => onChangePrice(e,props.setmin_price)}/>
          <br/>
          <TextField label="Max" variant="outlined" id="max_price" onChange={(e) => onChangePrice(e,props.setmax_price)}/>
        </FormGroup>

      }/>

      <Accordion title="Condição" content={

        <FormGroup>
          <FormControlLabel control={<Checkbox id="novo" onChange={(e) => onchangefunction(e,props.setnovo)}/>} label="Novo"/>
          <FormControlLabel control={<Checkbox id="usado" onChange={(e) => onchangefunction(e,props.setusado)}/>} label="Usado"/>
        </FormGroup>

      }/>


      <Accordion title="Avaliação" content={

        <FormGroup>
          <Typography component="legend">Avaliação</Typography>
          <Rating
            id="rating"
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              props.setrating(newValue)
            }}
          />
        </FormGroup>

      }/>



    </div>
  );
}
