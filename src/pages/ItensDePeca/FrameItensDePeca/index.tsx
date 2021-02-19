import React, { memo, useMemo, useState } from 'react';
import { makeStyles, Hidden, Container, Divider } from '@material-ui/core';
import ListagemItensDePeca from '../ListagemItensDePeca';
import FormItensDePeca from '../FormItensDePeca';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

const FrameItensDePeca: React.FC = () => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const listagem = useMemo(() => (
    <ListagemItensDePeca />
  ), []);

  const form = useMemo(() => (
    <FormItensDePeca />
  ), []);

  return (
    <Container maxWidth="md" className={classes.root} >
      <Hidden mdUp>
        <SwipeableViews
          axis="y"
          index={activeIndex}
          onChangeIndex={(e) => setActiveIndex(e)}
          enableMouseEvents
          style={{ height: "100%", padding: "50, 0px" }}
          containerStyle={{ height: "100%" }}
          slideStyle={{ height: "100%", padding: "50, 0px" }}
          resistance
        >
          {listagem}
          {form}
        </SwipeableViews>
      </Hidden>
      <Hidden smDown>
        {listagem}
        <Divider />
        {form}
      </Hidden>
    </Container>
  );
}

export default memo(FrameItensDePeca);