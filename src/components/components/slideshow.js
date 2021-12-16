import * as React from 'react';
import {createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  btn: {
    color: "#fc2112",
  },
  dot: {
    backgroundColor: "#ff564a"

  }
});


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'slider1',
    imgPath:
      '/slider1.webp',
  },
  {
    label: 'slider2',
    imgPath:
      '/slider2.webp',
  },
  {
    label: 'slider3',
    imgPath:
      '/slider3.webp',
  },
  {
    label: 'slider4',
    imgPath:
      '/slider4.webp',
  },

];

export default function SwipeableTextMobileStepper() {
  const classes = useStyles()

  const theme = createTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: "100%", marginLeft: 0}}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 360,
                  display: 'block',
                  maxWidth: "100%",
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        classes={{
          dotActive: classes.dot,
        }}
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            disableRipple
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft className={classes.btn}/>
            ) : (
              <KeyboardArrowRight className={classes.btn}/>
            )}
          </Button>
        }
        backButton={
          <Button disableRipple size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight className={classes.btn}/>
            ) : (
              <KeyboardArrowLeft className={classes.btn}/>
            )}
            
          </Button>
        }
      />
    </Box>
  );
}
