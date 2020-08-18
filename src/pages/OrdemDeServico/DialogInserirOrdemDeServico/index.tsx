import React, { useState } from 'react';
import Dialog from '../../../componentes/Dialog';
import SwipeableViews from 'react-swipeable-views';
import {Toolbar, Tabs, Tab } from '@material-ui/core';
import ListagemItensDePeca from '../ItensDePeca/ListagemItensDePeca/index';
import ItensDePeca from '../ItensDePeca';
import { OrdemDeServicoProvider } from '../OrdemDeServicoContext';
import ItensDeServico from '../ItensDeServico';
// import { Container } from './styles';

const DialogInserirOrdemDeServico: React.FC = () => {
  const [index, serIndex] = useState(0);

  return (
    <Dialog title="Nova ordem de serviço" open maxWidth="lg" fullWidth fullScreen>
      <Toolbar>
        <Tabs value={index} onChange={(e, v) => serIndex(v)} indicatorColor="primary">
          <Tab label="Peças" />
          <Tab label="Ordem de serviço" />
          <Tab label="Serviço" />
        </Tabs>
      </Toolbar>
      <OrdemDeServicoProvider>
        <SwipeableViews style={{ height: "calc(100% - 64px)" }} containerStyle={{ height: "calc(100% - 64px)" }} enableMouseEvents index={index} onChangeIndex={(e) => serIndex(e)} resistance animateTransitions >
          <ItensDePeca/>
          <span/>
          <ItensDeServico/>
        </SwipeableViews>
      </OrdemDeServicoProvider>
    </Dialog>
  );
}

export default DialogInserirOrdemDeServico;