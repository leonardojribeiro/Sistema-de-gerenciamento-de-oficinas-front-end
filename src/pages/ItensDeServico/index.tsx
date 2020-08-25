import React, { memo } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import FormItensDeServico from './FormItensDeServico';
import ListagemItensDeServico from './ListagemItensDeServico';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    position: "relative",
  },
  listagem: {
    height: "60%",
  }
}));

const ItensDeServico: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <ListagemItensDeServico />
      <FormItensDeServico />
    </Box>
  );
}

export default memo(ItensDeServico);