import React, { memo, useMemo } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import FormCliente from '../FormCliente';
import Listagem from '../../../componentes/Listagem';
import Dialog from '../../../componentes/Dialog';
import DialogoVeiculosCliente from '../DialogoVeiculosCliente';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { IconButton, Tooltip } from '@material-ui/core';
import ShowPessoa from '../../../componentes/ShowPessoa';

const DialogoClientes: React.FC = () => {
  const listagem = useMemo(() => {
    return (
      <Listagem
        dominio="cliente"
        formSearchFilters={['nome', 'cpf', 'email', 'telefone']}
        linkToInsert="/clientes/incluircliente"
        linkToInsertTitle="incluir cliente"
        getPrimaryText={cliente => cliente.nome}
        getSecondaryText={cliente => `Celular: ${cliente.telefoneCelular}`}
        getTitleLinkToChange={cliente => `Alterar o cliente ${cliente.nome}`}
        getLinkToChange={cliente => `/clientes/alterarcliente?id=${cliente._id}`}
        renderSecondaryActions={cliente => (
          <Tooltip title="Veículos desse cliente">
            <IconButton component={Link} to={`clientes/veiculos?cliente=${cliente._id}&nome=${cliente.nome}`}>
              <DriveEtaIcon />
            </IconButton>
          </Tooltip>
        )}
        getLinkToShow={cliente => `/clientes/exibircliente?id=${cliente._id}`}
      />
    )
  }, []);

  return (
    <Dialog maxWidth="lg" fullWidth open title="Clientes">
      {listagem}
      <Switch>
        <Route path={["/clientes/incluircliente", "/clientes/alterarcliente"]} component={FormCliente} />
        <Route path="/clientes/veiculos" component={DialogoVeiculosCliente} />
        <Route path="/clientes/exibircliente">
          <ShowPessoa
            title="Cliente"
            dominio="cliente"
            linkToEdit="/clientes/alterarcliente"
          />
        </Route>
      </Switch>
    </Dialog >
  );
}

export default memo(DialogoClientes);