import React, { memo, } from 'react';
import { Box, makeStyles, Hidden } from '@material-ui/core';
import ListagemItensDePeca from './ListagemItensDePeca';
import FormItensDePeca from './FormItensDePeca';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

const ItensDePeca: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root} >
      <Hidden mdUp>
        <SwipeableViews
          axis="y"
          enableMouseEvents
          style={{ height: "100%", padding: "50, 0px"}}
          containerStyle={{ height: "100%" }}
          slideStyle={{ height: "100%", padding: "50, 0px"}}
          resistance
        >
          <ListagemItensDePeca />
          <FormItensDePeca />
        </SwipeableViews>
      </Hidden>
      <Hidden smDown>
        <ListagemItensDePeca />
        <FormItensDePeca />
      </Hidden>
    </Box>
  );
}

export default memo(ItensDePeca);