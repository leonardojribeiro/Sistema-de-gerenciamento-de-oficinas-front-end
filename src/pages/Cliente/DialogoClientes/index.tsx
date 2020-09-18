import React, { memo } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import DialogoInserirCliente from '../DialogoInserirCliente';
import DialogoAlterarCliente from '../DialogoAlterarCliente';
import ListagemPessoa from '../../../componentes/ListagemPessoa';
import Dialog from '../../../componentes/Dialog';

const DialogoClientes: React.FC = () => {
  const listar = useLocation().pathname === "/clientes";
  
  return (
    <Dialog maxWidth="lg" fullWidth open title="Clientes">
      <ListagemPessoa
        dominio="cliente"
        linkToChangeText={cliente => `Alterar o cliente ${cliente.nome}`}
        linkToChangePath={cliente => `clientes/alterarcliente?id=${cliente._id}`}
        linkToInsertPath="clientes/inserircliente"
        linkToInsertText="Inserir cliente"
        listar={listar}
      />
      <Switch>
        <Route path="/clientes/inserircliente" component={DialogoInserirCliente} />
        <Route path="/clientes/alterarcliente" component={DialogoAlterarCliente} />
      </Switch>
    </Dialog >
  );
}

export default memo(DialogoClientes);