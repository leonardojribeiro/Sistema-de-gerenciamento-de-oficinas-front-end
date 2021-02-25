import React, { memo } from 'react'
import Fade from '@material-ui/core/Fade';
import LinearProgressMUI from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';

interface CircularProgressProps {
  open: boolean;
}

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: '4px',
  }
}));

function LinearProgress({ open }: CircularProgressProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Fade
        in={open}
        style={{
          transitionDelay: open ? '100ms' : '0ms',
        }}
        timeout={600}
        unmountOnExit
      >
        <LinearProgressMUI />
      </Fade>
    </div>
  )
}
export default memo(LinearProgress);