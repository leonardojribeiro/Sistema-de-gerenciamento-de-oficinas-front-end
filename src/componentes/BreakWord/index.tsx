import React, { memo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

interface BreakWordProps {
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