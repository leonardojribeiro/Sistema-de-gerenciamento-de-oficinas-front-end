import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirOuAlterarServico from '../DialogoIncluirOuAlterarServico';
import ListagemServicos from '../ListagemServicos';

const DialogServicos: React.FC = () => {
  return (
    <Dialogo maxWidth="sm" fullWidth open title="Serviços">
      <ListagemServicos />
      <Switch>
        <Route path="/servicos/incluirservico" component={DialogoIncluirOuAlterarServico} />
        <Route path="/servicos/alterarservico" component={DialogoIncluirOuAlterarServico} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogServicos);