import * as React from 'react';
import Accordion from './accordion.js'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


export default function Filters() {
  const [value, setValue] = React.useState(0);


  return (
    <div>

      <Accordion title="Por Categoria" content={

        <FormGroup>
          <FormControlLabel control={<Checkbox  />} label="Celular" />
          <FormControlLabel  control={<Checkbox />} label="Iphone" />
        </FormGroup>

      }/>

      <Accordion title="Enviado de" content={

        <FormGroup>
          <FormControlLabel control={<Checkbox  />} label="Brasil" />
          <FormControlLabel  control={<Checkbox />} label="Importado" />
        </FormGroup>

      }/>

      <Accordion title="Serviço e Promoção" content={

        <FormGroup>
          <FormControlLabel control={<Checkbox  />} label="Promoção" />
          <FormControlLabel  control={<Checkbox />} label="Frete Grátis" />
        </FormGroup>

      }/>

      <Accordion title="Faixa de preço" content={

        <FormGroup>
          <TextField label="Min" variant="outlined" />
          <br/>
          <TextField label="Max" variant="outlined" />
        </FormGroup>

      }/>

      <Accordion title="Condição" content={

        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Novo" />
          <FormControlLabel control={<Checkbox />} label="Usado" />
        </FormGroup>

      }/>


      <Accordion title="Avaliação" content={

        <FormGroup>
          <Typography component="legend">Avaliação</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </FormGroup>

      }/>



    </div>
  );
}
