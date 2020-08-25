import React from 'react';
import Dialog from '../../../componentes/Dialog';
import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab } from '@material-ui/core';
import OrdemDeServicoContext, { OrdemDeServicoProvider } from '../OrdemDeServicoContext';
import FormOrdemDeServico from '../FormOrdemDeServico';
import ItensDePeca from '../../ItensDePeca';
import ItensDeServico from '../../ItensDeServico';

const DialogInserirOrdemDeServico: React.FC = () => {
  return (
    <Dialog title="Nova ordem de serviço" open maxWidth="lg" fullWidth>
      <OrdemDeServicoProvider>
        <OrdemDeServicoContext.Consumer >
          {({ indexTab, setIndexTab }) => (
            <>

              <Tabs value={indexTab} onChange={(e, v) => setIndexTab(v)} variant="fullWidth" indicatorColor="primary">
                <Tab label="Peças" />
                <Tab label="Ordem de serviço" />
                <Tab label="Serviços" />
              </Tabs>
              <SwipeableViews style={{ height: "calc(100% - 64px)" }} containerStyle={{ height: "calc(100% - 64px)" }} enableMouseEvents index={indexTab} async onChangeIndex={(e) => setIndexTab(e)} resistance animateTransitions >
                <ItensDePeca />
                <FormOrdemDeServico />
                <ItensDeServico />
              </SwipeableViews>
            </>
          )}
        </OrdemDeServicoContext.Consumer>
      </OrdemDeServicoProvider>
    </Dialog>
  );
}

export default DialogInserirOrdemDeServico;