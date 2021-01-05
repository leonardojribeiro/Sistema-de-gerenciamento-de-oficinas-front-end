import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Route, Switch } from 'react-router-dom';
import DialogoIncluirOuAlterarMarca from '../DialogoIncluirOuAlterarMarca';
import ListagemMarcas from '../ListagemMarcas';

const DialogMarcas: React.FC = () => {
  return (
    <Dialogo open fullWidth maxWidth="xs" title="Marcas">
      <ListagemMarcas />
      <Switch>
        <Route path={["/marcas/incluirmarca", "/marcas/alterarmarca"]}>
          <DialogoIncluirOuAlterarMarca />
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogMarcas);