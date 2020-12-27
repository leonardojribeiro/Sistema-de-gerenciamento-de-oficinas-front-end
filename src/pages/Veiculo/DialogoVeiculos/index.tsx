import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirVeiculo from '../DialogoIncluirVeiculo';
import DialogAlterarVeiculo from '../DialogoAlterarVeiculo';
import ListagemVeiculos from '../ListagemVeiculos';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import HistoricoVeiculo from '../HistoricoVeiculo';

const DialogoVeiculos: React.FC = () => {

  return (
    <Dialogo maxWidth="sm" fullWidth open title="Veículos">
      <ListagemVeiculos/>
      <BotaoIncluir titulo="incluir veiculo" linkTo="/veiculos/incluirveiculo" />
      <Switch>
        <Route path="/veiculos/incluirveiculo" component={DialogoIncluirVeiculo} />
        <Route path="/veiculos/alterarveiculo"  component={DialogAlterarVeiculo} />
        <Route path="/veiculos/historico" component={HistoricoVeiculo}/>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoVeiculos);