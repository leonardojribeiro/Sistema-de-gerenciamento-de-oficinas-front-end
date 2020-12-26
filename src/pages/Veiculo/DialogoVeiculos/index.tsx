import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoInserirVeiculo from '../DialogoInserirVeiculo';
import DialogAlterarVeiculo from '../DialogoAlterarVeiculo';
import ListagemVeiculos from '../ListagemVeiculos';
import BotaoInserir from '../../../componentes/BotaoInserir';
import HistoricoVeiculo from '../HistoricoVeiculo';

const DialogoVeiculos: React.FC = () => {

  return (
    <Dialogo maxWidth="sm" fullWidth open title="Veículos">
      <ListagemVeiculos/>
      <BotaoInserir titulo="Inserir veiculo" linkTo="/veiculos/inserirveiculo" />
      <Switch>
        <Route path="/veiculos/inserirveiculo" component={DialogoInserirVeiculo} />
        <Route path="/veiculos/alterarveiculo"  component={DialogAlterarVeiculo} />
        <Route path="/veiculos/historico" component={HistoricoVeiculo}/>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoVeiculos);