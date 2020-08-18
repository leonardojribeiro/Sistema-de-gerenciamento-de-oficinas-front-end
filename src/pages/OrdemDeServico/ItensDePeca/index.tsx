import React, { memo } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import ListagemItensDePeca from './ListagemItensDePeca';
import FormItensDePeca from './FormItensDePeca';

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
  return (
    <Box className={classes.root}>
      <ListagemItensDePeca />
      <FormItensDePeca />
    </Box>
  );
}

export default memo(ItensDePeca);