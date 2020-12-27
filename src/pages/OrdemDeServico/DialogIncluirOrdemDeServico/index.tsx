import React, { memo, useContext } from 'react';
import Dialog from '../../../componentes/Dialog';
import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab, } from '@material-ui/core'; 
import FormOrdemDeServico from '../FormOrdemDeServico';
import FrameItensDePeca from '../../ItensDePeca/FrameItensDePeca';
import FrameItensDeServico from '../../ItensDeServico/FrameItensDeServico';
import SwipeableContext from '../../../contexts/SwipeableContext';

const DialogoIncluirOrdemDeServico: React.FC = () => {
  //const { indexTab, setIndexTab } = useContext(OrdemDeServicoContext);
  const {activeIndex,setActiveIndex} = useContext(SwipeableContext);
  return (
    <Dialog title="Nova ordem de serviço" open maxWidth="lg" fullWidth fullScreen>
      <Tabs value={activeIndex} onChange={(e, v) => setActiveIndex(v)}  variant="fullWidth" indicatorColor="primary">
        <Tab label="Peças" wrapped />
        <Tab label="Ordem de serviço" wrapped />
        <Tab label="Serviços" wrapped />
      </Tabs>
      <SwipeableViews style={{ height: "calc(100% - 64px)", }} containerStyle={{ height: "calc(100% )", }} index={activeIndex} onChangeIndex={(e) => setActiveIndex(e)} enableMouseEvents value={0}   resistance animateTransitions >
        <FrameItensDePeca />
        <FormOrdemDeServico />
        <FrameItensDeServico />
      </SwipeableViews>
    </Dialog>
  );
}

export default memo(DialogoIncluirOrdemDeServico);