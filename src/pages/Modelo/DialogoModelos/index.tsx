import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirOuAlterarModelo from '../DialogoIncluirOuAlterarModelo';
import ListagemModelos from '../ListagemModelos';

const DialogoModelos: React.FC = () => {

  return (
    <Dialogo maxWidth="sm" fullWidth open title="Modelos">
      <ListagemModelos />
      <Switch>
        <Route path="//marcas/incluiralterarmodelo" component={DialogoIncluirOuAlterarModelo} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoModelos);