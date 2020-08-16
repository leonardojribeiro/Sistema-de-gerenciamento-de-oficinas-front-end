import React, { forwardRef, useImperativeHandle, useState, memo } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

export interface ProgressoCircularHandles {
  setValor: React.Dispatch<React.SetStateAction<number>>,
  setAberto: React.Dispatch<React.SetStateAction<boolean>>,
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const ProgressoCircular = forwardRef<ProgressoCircularHandles | undefined>((props, ref) => {
  const classes = useStyles();

  const [aberto, setAberto] = useState<boolean>(false);
  const [valor, setValor] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    setValor,
    setAberto,
  }));

  return (
    <>
      {aberto ? <Backdrop className={classes.backdrop} open={aberto} >
        <CircularProgress variant={valor > 0 ? "static" : "indeterminate"} value={valor} />
      </Backdrop > : null}
    </>
  )
});

export default memo(ProgressoCircular);