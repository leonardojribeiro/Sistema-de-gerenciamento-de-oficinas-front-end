import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirModelo from '../DialogoIncluirModelo';
import DialogoAlterarModelo from '../DialogoAlterarModelo';
import ListagemModelos from '../ListagemModelos';

const DialogoModelos: React.FC = () => {

  return (
    <Dialogo maxWidth="sm" fullWidth open title="Modelos">
      <ListagemModelos />
      <Switch>
        <Route path="/modelos/incluirmodelo" component={DialogoIncluirModelo} />
        <Route path="/modelos/alterarmodelo" component={DialogoAlterarModelo} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoModelos);