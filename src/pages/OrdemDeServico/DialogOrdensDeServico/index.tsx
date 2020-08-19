import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DialogInserirOrdemDeServico from '../DialogInserirOrdemDeServico';
import Dialog from '../../../componentes/Dialog';
import BotaoInserir from '../../../componentes/BotaoInserir';

const DialogOrdensDeServico: React.FC = () => {
  
  return (
    <Dialog open title="Ordens de serviço" >
      <BotaoInserir titulo="Nova ordem de serviço" linkTo="/ordensdeservico/inserir"/>
      <Switch>
        <Route path="/ordensdeservico/inserir">
          <DialogInserirOrdemDeServico />
        </Route>
      </Switch>
    </Dialog>
  );
}

export default DialogOrdensDeServico;