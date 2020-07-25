import React from 'react';
import { Box, Grid, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  rodape: {
    backgroundColor: theme.palette.primary.main
  }
}));

function Rodape() {
  const classes = useStyles();
  return (
    <Box p={3} className={classes.rodape}>
      <Grid container justify="space-around">
        <Grid item xs={12}>
          <Typography align="center">
            Web App desenvolvido como avaliação parcial do tabalho de conclusão de curso de Sistemas de Informação
          </Typography>
        </Grid>
        <Grid item component={Link} to="http://www.ueg.br/" target="_blank">
          <Typography >
            Universidade Estadual de Goiás
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Rodape;