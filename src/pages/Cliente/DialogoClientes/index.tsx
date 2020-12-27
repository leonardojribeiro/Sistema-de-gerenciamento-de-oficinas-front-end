import React, { memo } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import DialogoIncluirCliente from '../DialogoIncluirCliente';
import DialogoAlterarCliente from '../DialogoAlterarCliente';
import ListagemPessoa from '../../../componentes/ListagemPessoa';
import Dialog from '../../../componentes/Dialog';
import DialogoVeiculosCliente from '../DialogoVeiculosCliente';

const DialogoClientes: React.FC = () => {
  const listar = useLocation().pathname === "/clientes";
  
  return (
    <Dialog maxWidth="lg" fullWidth open title="Clientes">
      <ListagemPessoa
        dominio="cliente"
        linkToChangeText={cliente => `Alterar o cliente ${cliente.nome}`}
        linkToChangePath={cliente => `clientes/alterarcliente?id=${cliente._id}`}
        linkToInsertPath="clientes/incluircliente"
        linkToInsertText="incluir cliente"
        listar={listar}
      />
      <Switch>
        <Route path="/clientes/incluircliente" component={DialogoIncluirCliente} />
        <Route path="/clientes/alterarcliente" component={DialogoAlterarCliente} />
        <Route path="/clientes/veiculos" component={DialogoVeiculosCliente} />
      </Switch>
    </Dialog >
  );
}

export default memo(DialogoClientes);