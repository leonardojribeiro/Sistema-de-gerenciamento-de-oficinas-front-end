import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, makeStyles, Grid, Box, StepButton } from '@material-ui/core';

const useStyles = makeStyles({
  fundo: {
    padding: "8px",
    backgroundColor: "inherit",
    '& .MuiStepIcon-root': {
      color: "#888"
    },
    '& .MuiStepIcon-active': {
      color: "var(--cor)"
    },
    '& .MuiStepLabel-label': {
      color: "var(--cor)"
    },
    '& .MuiStepIcon-text': {
      fill: "var(--cor)"
    },
    '& .MuiStepIcon-active .MuiStepIcon-text': {
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
  const [activeStep, setActiveStep] = useState(0);

  const classes = useStyles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <Stepper className={classes.fundo} nonLinear activeStep={activeStep} orientation="horizontal" >
          {passos.map((passo, index) => {
            return (
              <Step key={index}>
                <StepButton onClick={handleStep(index)}>{passo.label}</StepButton>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
      <Grid container className={classes.container} alignItems="center">
        {
          passos[activeStep].dados
        }
      </Grid>
      <Grid container justify="space-between" spacing={2}>
        <Grid item>
          <Box px={2}>
            <Button disabled={activeStep === 0} onClick={handleBack} variant="contained">
              Voltar
          </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box px={2}>
            <Button variant="contained" color="primary" onClick={activeStep === passos.length - 1 ? null : handleNext}>
              {activeStep === passos.length - 1 ? 'Salvar' : 'Próximo'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
