import React, { memo, useContext } from 'react';
import { Box, makeStyles, Grid, Typography } from '@material-ui/core';
import ListagemItensDePeca from './ListagemItensDePeca';
import FormItensDePeca from './FormItensDePeca';
import OrdemDeServicoContext from '../OrdemDeServico/OrdemDeServicoContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    position: "relative",
  },
  listagem: {
    height: "60%",
  }
}));

const ItensDePeca: React.FC = () => {
  const classes = useStyles();
  const {valorTotalPecas} = useContext(OrdemDeServicoContext)
  return (
    <Box className={classes.root}>
      <ListagemItensDePeca />
      <Grid container>
        <Grid item>
          <Typography>Valor Total:{valorTotalPecas()}</Typography>
        </Grid>
      </Grid>
      <FormItensDePeca />
    </Box>
  );
}

export default memo(ItensDePeca);