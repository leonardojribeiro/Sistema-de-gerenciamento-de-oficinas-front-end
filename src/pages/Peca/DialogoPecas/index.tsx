import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoInserirPeca from '../DialogoInserirPeca';
import DialogoAlterarPeca from '../DialogoAlterarPeca';
import ListagemPeca from '../ListagemPecas';

const DialogoPecas: React.FC = () => {

  return (
    <Dialogo maxWidth="sm" fullWidth open title="Peças">
      <ListagemPeca />
      <Switch>
        <Route path="/pecas/inserirpeca" component={DialogoInserirPeca} />
        <Route path="/pecas/alterarpeca" component={DialogoAlterarPeca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoPecas);