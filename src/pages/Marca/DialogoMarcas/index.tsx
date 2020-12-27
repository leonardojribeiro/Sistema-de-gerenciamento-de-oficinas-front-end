import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Route, Switch } from 'react-router-dom';
import DialogoIncluirMarca from '../DialogoIncluirMarca';
import DialogoAlterarMarca from '../DialogoAlterarMarca';
import ListagemMarcas from '../ListagemMarcas';

const DialogMarcas: React.FC = () => {

  return (
    <Dialogo open fullWidth maxWidth="xs" title="Marcas">
      <ListagemMarcas />
      <Switch>
        <Route path="/marcas/incluirmarca">
          <DialogoIncluirMarca />
        </Route>
        <Route path="/marcas/alterarmarca">
          <DialogoAlterarMarca />
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogMarcas);