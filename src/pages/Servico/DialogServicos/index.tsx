import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirServico from '../DialogoIncluirServico';
import ListagemServicos from '../ListagemServicos';
import DialogAlterarServico from '../DialogoAlterarServico';


const DialogServicos: React.FC = () => {


  return (
    <Dialogo maxWidth="sm" fullWidth open title="Serviços">
      <ListagemServicos />
      <Switch>
        <Route path="/servicos/incluirservico" component={DialogoIncluirServico} />
        <Route path="/servicos/alterarservico" component={DialogAlterarServico} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogServicos);