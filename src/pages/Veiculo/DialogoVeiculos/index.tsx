import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import FormVeiculo from '../FormVeiculo';
import HistoricoVeiculo from '../HistoricoVeiculo';
import Listagem from '../../../componentes/Listagem';
import ItemVeiculo from '../../../componentes/ItemVeiculo';

const DialogoVeiculos: React.FC = () => {
  return (
    <Dialogo maxWidth="sm" fullWidth open title="Veículos">
      <Listagem
        dominio="veiculo"
        formSearchFilters={["placa", "modelo",]}
        linkToInsertTitle="Incluir veículo"
        linkToInsert="/veiculos/incluirveiculo"
        renderListItem={veiculo => <ItemVeiculo veiculo={veiculo} baseURLToHistory="/veiculos/historico"/>}
      />
      <Switch>
        <Route path={["/veiculos/incluirveiculo", "/veiculos/alterarveiculo"]} component={FormVeiculo} />
        <Route path="/veiculos/historico" component={HistoricoVeiculo} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoVeiculos);