import React, { memo } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

interface BreakWordProps{
  children: React.ReactNode;
}

const useStyles = makeStyles({
  breakWord: {
    wordBreak: "break-word"
  }
});

const BreakWord: React.FC<BreakWordProps> = (props) => {
  const classes = useStyles();
  return (
    <Typography className={classes.breakWord}>
      {props.children}
    </Typography>
  );
}

export default memo(BreakWord);