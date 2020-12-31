import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirServico from '../DialogoIncluirServico';
import ListagemServicos from '../ListagemServicos';

const DialogServicos: React.FC = () => {
  return (
    <Dialogo maxWidth="sm" fullWidth open title="Serviços">
      <ListagemServicos />
      <Switch>
        <Route path="/servicos/incluirservico" component={DialogoIncluirServico} />
        <Route path="/servicos/alterarservico" component={DialogoIncluirServico} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogServicos);