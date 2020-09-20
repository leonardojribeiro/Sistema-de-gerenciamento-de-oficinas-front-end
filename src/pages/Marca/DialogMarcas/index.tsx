import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Route, Switch } from 'react-router-dom';
import DialogoInserirMarca from '../DialogInserirMarca';
import DialogAlterarMarca from '../DialogAlterarMarca';
import ListagemMarcas from '../ListagemMarcas';

const DialogMarcas: React.FC = () => {

  return (
    <Dialogo open fullWidth maxWidth="xs" title="Marcas">
      <ListagemMarcas />
      <Switch>
        <Route path="/marcas/inserirmarca">
          <DialogoInserirMarca />
        </Route>
        <Route path="/marcas/alterarmarca">
          <DialogAlterarMarca />
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogMarcas);