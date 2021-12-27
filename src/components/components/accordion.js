import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {makeStyles} from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  accordion: {
    marginBottom: `4px`
  }
}))

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

            {props.content}

        </AccordionDetails>
      </Accordion>

    </div>
  );
}
