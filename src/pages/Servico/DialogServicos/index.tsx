import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogInserirServico from '../DialogInserirServico';
import ListagemServicos from '../ListagemServicos';
import DialogAlterarServico from '../DialogAlterarServico';


const DialogServicos: React.FC = () => {
  

  return (
    <Dialogo maxWidth="sm" fullWidth open title="Serviços">
      <ListagemServicos/>
      <Switch>
        <Route path="/servicos/inserirservico" component={DialogInserirServico}/>
        <Route path="/servicos/alterarservico" component={DialogAlterarServico}/>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogServicos);