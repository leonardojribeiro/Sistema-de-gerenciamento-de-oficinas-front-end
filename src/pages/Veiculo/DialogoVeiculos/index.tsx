import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirOuAlterarVeiculo from '../DialogoIncluirOuAlterarVeiculo';
import ListagemVeiculos from '../ListagemVeiculos';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import HistoricoVeiculo from '../HistoricoVeiculo';

const DialogoVeiculos: React.FC = () => {

  return (
    <Dialogo maxWidth="sm" fullWidth open title="Veículos">
      <ListagemVeiculos/>
      <BotaoIncluir titulo="Incluir veiculo" linkTo="/veiculos/incluiralterarveiculo" />
      <Switch>
        <Route path="/veiculos/incluiralterarveiculo" component={DialogoIncluirOuAlterarVeiculo} />
        <Route path="/veiculos/historico" component={HistoricoVeiculo}/>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoVeiculos);