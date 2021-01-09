import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirOuAlterarVeiculo from '../DialogoIncluirOuAlterarVeiculo';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import HistoricoVeiculo from '../HistoricoVeiculo';
import Listagem from '../../../componentes/Listagem';
import { IconButton, Tooltip } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import { Link } from 'react-router-dom';
import AssignmentIcon from '@material-ui/icons/Assignment';

const DialogoVeiculos: React.FC = () => {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  return (
    <Dialogo maxWidth="sm" fullWidth open title="Veículos">
      <Listagem
        dominio="veiculo"
        formSearchFilters={["placa"]}
        getPrimaryText={item => item.placa}
        getSecondaryText={item => item.modelo.descricao}
        getURLAvatar={item => `${imagensUrl}/${item.modelo.marca.uriLogo}`}
        getAltAvatar={item => item.modelo.marca.descricao}
        getLinkToChange={item => `/veiculos/alterarveiculo?id=?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar o veículo ${item.placa}`}
        linkToInsertTitle="Incluir veículo"
        linkToInsert="/veiculos/incluirveiculo"
        renderSecondaryActions={(item) => (
          <>
            <Tooltip title={`Nova ordem de serviço para este veículo`}>
              <IconButton component={Link} to={`/ordensdeservico/incluir?veiculo=${item._id}`}>
                <AssignmentIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={`Ver histórico desse veículo`}>
              <IconButton component={Link} to={`/veiculos/historico?veiculo=${item._id}`}>
                <HistoryIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      />
      <BotaoIncluir titulo="Incluir veiculo" linkTo="/veiculos/incluirveiculo" />
      <Switch>
        <Route path={["/veiculos/incluirveiculo", "/veiculos/alterarveiculo"]} component={DialogoIncluirOuAlterarVeiculo} />
        <Route path="/veiculos/historico" component={HistoricoVeiculo} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoVeiculos);