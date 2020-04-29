import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, makeStyles, Grid, Box } from '@material-ui/core';



const useStyles = makeStyles({
  fundo: {
    padding: "8px",
    backgroundColor: "inherit",
    '& .MuiStepIcon-root':{
      color: "#888"
    },
    '& .MuiStepIcon-active': {
      color: "var(--cor)"
    },
    '& .MuiStepLabel-label':{
      color: "var(--cor)"
    },
    '& .MuiStepIcon-text':{
      fill: "var(--cor)"
    },
    '& .MuiStepIcon-active .MuiStepIcon-text':{
      fill: "var(--bg-cor)"
    },
    '& .MuiStepIcon-completed': {
      color: "var(--cor)"
    }
  },
  container: {
    minHeight: "var(--h-livre-assistente)",
  }
});

export default function Assistente({ passos, titulo }) {
  const [activeStep, setActiveStep] = useState(1);

  const classes = useStyles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  return (
    <Grid container>
      <Grid xs={12} item>
        <Stepper className={classes.fundo} activeStep={activeStep} orientation="horizontal" >
          {passos.map((passo, index) => {
            return (
              <Step key={index}>
                <StepLabel>{passo.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
      <Grid xs={12} item>
        <Box className={classes.container} display="flex" justifyContent="center" alignItems="center">
          {
            passos[activeStep].dados
          }
        </Box>
        <Box>
          <Grid xs={12} item>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            > Voltar</Button>
            <Button variant="contained" color="primary" onClick={activeStep === passos.length - 1 ? null : handleNext}>
              {activeStep === passos.length - 1 ? 'Salvar' : 'Próximo'}
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
