import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: '#fff',
  },
}));

const ProgressoCircular = forwardRef((props, ref) => {
  const classes = useStyles();

  const [aberto, setAberto] = useState(false);
  const [valor, setValor] = useState(0);

  useImperativeHandle(ref, ()=>({
    setValor,
    setAberto,
  }));

  return (
    <Backdrop className={classes.backdrop} open={aberto}>
      <CircularProgress variant={valor > 0 ? "static" : "indeterminate" } value={valor}/>
    </Backdrop>
  );
});

export default ProgressoCircular;