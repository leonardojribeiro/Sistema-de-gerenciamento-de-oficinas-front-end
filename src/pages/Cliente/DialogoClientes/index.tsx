import React, { memo } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import DialogoIncluirOuAlterarCliente from '../DialogoIncluirOuAlterarCliente';
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
        linkToChangePath={cliente => `/clientes/incluiralterarcliente?id=${cliente._id}`}
        linkToInsertPath="/clientes/incluiralterarcliente"
        linkToInsertText="incluir cliente"
        listar={listar}
      />
      <Switch>
        <Route path="/clientes/incluiralterarcliente" component={DialogoIncluirOuAlterarCliente} />
        <Route path="/clientes/veiculos" component={DialogoVeiculosCliente} />
      </Switch>
    </Dialog >
  );
}

export default memo(DialogoClientes);