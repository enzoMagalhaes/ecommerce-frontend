import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import {makeStyles} from '@mui/styles'
import { styled } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  accordion: {
    marginBottom: `4px`
  }
}))

//doenst work

// const FilterAccordion = styled(Accordion)(({ theme }) => ({
//     '&.Mui-expanded': {
//     marginBottom: `10px`,
//   }
// }));


export default function SimpleAccordion(props) {

  const classes = useStyles()

  return (
    <div>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {props.content}
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}
