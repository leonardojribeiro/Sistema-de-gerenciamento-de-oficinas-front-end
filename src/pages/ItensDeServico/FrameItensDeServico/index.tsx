import React, { memo } from 'react';
import { makeStyles, Hidden, Container } from '@material-ui/core';
import FormItensDeServico from '../FormItensDeServico';
import ListagemItensDeServico from '../ListagemItensDeServico';
import SwipeableViews from 'react-swipeable-views';
import SwipeableContext, { SwipeableContextProvider } from '../../../contexts/SwipeableContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));



const FrameItensDeServico: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root} >
      <Hidden mdUp>
        <SwipeableContextProvider initialIndexActive={0}>
          <SwipeableContext.Consumer>
            {({ activeIndex, setActiveIndex }) =>
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
                <ListagemItensDeServico />
                <FormItensDeServico />
              </SwipeableViews>
            }
          </SwipeableContext.Consumer>
        </SwipeableContextProvider>
      </Hidden>
      <Hidden smDown>
        <ListagemItensDeServico />
        <FormItensDeServico />
      </Hidden>
    </Container>
  );
}

export default memo(FrameItensDeServico);