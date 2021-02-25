import React, { memo } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgressMUI from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Fade } from '@material-ui/core';

export interface CircularProgressProps {
  open: boolean;
  value?: number;
}

const useStyles = makeStyles((theme) => {
  return ({
    backdrop: {
      zIndex: theme.zIndex.modal + 1,
    },
  })
});

function CircularProgress({ open, value }: CircularProgressProps): JSX.Element {
  const classes = useStyles();
  return (
    <Fade
       
      in={open}
      style={{
        transitionDelay: open ? '800ms' : '0ms',
      }}
      timeout={600}
      unmountOnExit
    >
      <Backdrop className={classes.backdrop} open >
        <CircularProgressMUI variant={value ? "static" : "indeterminate"} value={value} />
      </Backdrop >
    </Fade>
  )
}
export default memo(CircularProgress);