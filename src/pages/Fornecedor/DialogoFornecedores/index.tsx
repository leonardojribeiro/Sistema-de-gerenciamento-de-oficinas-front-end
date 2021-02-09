import React from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route, } from 'react-router-dom';
import DialogoIncluirOuAlterarCliente from '../DialogoIncluirOuAlterarFornecedor';
import Listagem from '../../../componentes/Listagem';

const DialogoFornecedores: React.FC = () => {
  return (
    <Dialogo maxWidth="lg" fullWidth open title="Fornecedores">
      <Listagem
        dominio="fornecedor"
        formSearchFilters={['nome', 'cpf', 'email', 'telefone']}
        linkToInsert="/fornecedores/incluirfornecedor"
        linkToInsertTitle="incluir fornecedor"
        getPrimaryText={cliente => cliente.nomeFantasia}
        getSecondaryText={cliente=>`Celular: ${cliente.telefoneCelular}`}
        getTitleLinkToChange={cliente => `Alterar o fornecedor ${cliente.nomeFantasia}`}
        getLinkToChange={cliente => `/fornecedores/alterarfornecedor?id=${cliente._id}`}
      />
      <Switch>
        <Route path={["/fornecedores/incluirfornecedor","/fornecedores/alterarfornecedor"]} component={DialogoIncluirOuAlterarCliente} />
      </Switch>
    </Dialogo>
  );
}

export default DialogoFornecedores;