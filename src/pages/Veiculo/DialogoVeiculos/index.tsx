import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirOuAlterarVeiculo from '../DialogoIncluirOuAlterarVeiculo';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import HistoricoVeiculo from '../HistoricoVeiculo';
import Listagem from '../../../componentes/Listagem';
import { Avatar, IconButton, Tooltip } from '@material-ui/core';
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
        renderAvatar={item => (
          <Avatar src={`${imagensUrl}/${item.modelo.marca.uriLogo}`} alt={item.modelo.marca.descricao} />
        )}
        getLinkToChange={item => `/veiculos/alterarveiculo?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar o veículo ${item.placa}`}
        linkToInsertTitle="Incluir veículo"
        linkToInsert="/veiculos/incluirveiculo"
        getLinkToShow={item => `/veiculos/historico?veiculo=${item._id}`}
        renderSecondaryActions={item => (
          <Tooltip title={`Nova ordem de serviço para este veículo`}>
            <IconButton component={Link} to={`/ordensdeservico/incluir?veiculo=${item._id}`}>
              <AssignmentIcon />
            </IconButton>
          </Tooltip>
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