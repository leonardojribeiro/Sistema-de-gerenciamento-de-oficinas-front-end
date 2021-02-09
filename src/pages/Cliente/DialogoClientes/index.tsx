import React, { memo } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import DialogoIncluirOuAlterarCliente from '../DialogoIncluirOuAlterarCliente';
import Listagem from '../../../componentes/Listagem';
import Dialog from '../../../componentes/Dialog';
import DialogoVeiculosCliente from '../DialogoVeiculosCliente';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { IconButton, Tooltip } from '@material-ui/core';

const DialogoClientes: React.FC = () => {
  return (
    <Dialog maxWidth="lg" fullWidth open title="Clientes">
      <Listagem
        dominio="cliente"
        formSearchFilters={['nome', 'cpf', 'email', 'telefone']}
        linkToInsert="/clientes/incluircliente"
        linkToInsertTitle="incluir cliente"
        getPrimaryText={cliente => cliente.nome}
        getSecondaryText={cliente=>`Celular: ${cliente.telefoneCelular}`}
        getTitleLinkToChange={cliente => `Alterar o cliente ${cliente.nome}`}
        getLinkToChange={cliente => `/clientes/alterarcliente?id=${cliente._id}`}
        renderSecondaryActions={cliente => (
          <Tooltip title="Veículos desse cliente">
            <IconButton component={Link} to={`clientes/veiculos?cliente=${cliente._id}`}>
              <DriveEtaIcon />
            </IconButton>
          </Tooltip>
        )}
      />
      <Switch>
        <Route path={["/clientes/incluircliente", "/clientes/alterarcliente"]} component={DialogoIncluirOuAlterarCliente} />
        <Route path="/clientes/veiculos" component={DialogoVeiculosCliente} />
      </Switch>
    </Dialog >
  );
}

export default memo(DialogoClientes);