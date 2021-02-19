import { Fab, makeStyles } from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';
import React, { memo, useCallback } from 'react';
const useStyles = makeStyles((theme) => ({
  arrowContainer: {
    marginTop: '-64px',
    position: 'fixed',
    height: "64px",
    width: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ArrowTop: React.FC = () => {
  const classes = useStyles();

  const handleClick = useCallback(() => {
    // setActiveIndex(1);
  }, []);

  return (
    <div className={classes.arrowContainer} >
      <Fab variant='extended' color='primary' onClick={handleClick}>
        <ExpandLess />
        incluir
      </Fab>
    </div>
  );
}

export default memo(ArrowTop);