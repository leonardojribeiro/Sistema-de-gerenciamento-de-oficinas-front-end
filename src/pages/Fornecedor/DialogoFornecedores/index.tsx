import React from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route, useLocation } from 'react-router-dom';
import DialogoIncluirOuAlterarCliente from '../DialogoIncluirOuAlterarFornecedor';
import ListagemPessoa from '../../../componentes/ListagemPessoa';

const DialogoFornecedores: React.FC = () => {
  const listar = useLocation().pathname === "/fornecedores";
  return (
    <Dialogo maxWidth="lg" fullWidth open title="Fornecedores">
      <ListagemPessoa
        dominio="fornecedor"
        linkToChangeText={fornecedor => `Alterar o fornecerdor ${fornecedor.nomeFantasia}`}
        linkToChangePath={fornecedor => `/fornecedores/incluiralterarfornecedor?id=${fornecedor._id}`}
        linkToInsertPath="/fornecedores/incluiralterarfornecedor"
        linkToInsertText="incluir fornecedor"
        listar={listar}
      />
      <Switch>
        <Route path="/fornecedores/incluiralterarfornecedor" component={DialogoIncluirOuAlterarCliente} />
      </Switch>
    </Dialogo>
  );
}

export default DialogoFornecedores;