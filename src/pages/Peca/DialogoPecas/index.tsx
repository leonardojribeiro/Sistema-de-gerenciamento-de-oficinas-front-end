import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirOuAlterarPeca from '../DialogoIncluirOuAlterarPeca';
import ListagemPeca from '../ListagemPecas';

const DialogoPecas: React.FC = () => {

  return (
    <Dialogo maxWidth="sm" fullWidth open title="Peças">
      <ListagemPeca />
      <Switch>
        <Route path="/pecas/incluirpeca" component={DialogoIncluirOuAlterarPeca} />
        <Route path="/pecas/alterarpeca" component={DialogoIncluirOuAlterarPeca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoPecas);