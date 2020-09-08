import React from 'react';
import { Box, Grid, Typography, makeStyles, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  rodape: {
    backgroundColor: theme.palette.background.paper,
  }
}));

const Rodape: React.FC = () => {
  const classes = useStyles();
  return (
    <Box p={3} className={classes.rodape}>
      <Grid container justify="space-around">
        <Grid item xs={12}>
          <Typography align="center">
            Web App desenvolvido como avaliação parcial do tabalho de conclusão de curso de Sistemas de Informação
          </Typography>
        </Grid>
        <Grid item>
          <a href="http://www.ueg.br/" target="blank" >
            <Typography >
              Universidade Estadual de Goiás
            </Typography>
          </a>
        </Grid>
        <Grid item>
          <Typography>
            Desenvolvido por Leonardo Ribeiro
          </Typography>
        </Grid>
        <Grid item>
          <a href="https://github.com/LeonardoJRibeiro/Sistema-de-gerenciamento-de-oficinas-front-end" target="blank">
            <Typography >
              Ver código fonte no Github
            </Typography>
          </a>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Rodape;