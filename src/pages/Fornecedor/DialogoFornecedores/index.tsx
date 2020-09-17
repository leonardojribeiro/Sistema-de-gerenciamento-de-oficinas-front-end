import React from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoInserirCliente from '../DialogoInserirFornecedor';
import DialogoAlterarCilente from '../DialogoAlterarFornecedor';
import ListagemPessoa from '../../../componentes/ListagemPessoa';

const DialogoFornecedores: React.FC = () => {
  return (
    <Dialogo maxWidth="lg" fullWidth open title="Fornecedores">
      <ListagemPessoa
        dominio="fornecedor"
        linkToChangeText={fornecedor => `Alterar o fornecerdor ${fornecedor.nomeFantasia}`}
        linkToChangePath={fornecedor => `fornecedores/alterarfornecedor?id=${fornecedor._id}`}
        linkToInsertPath="fornecedores/inserirfornecedores"
        linkToInsertText="Inserir fornecedor"
      />
      <Switch>
        <Route path="/fornecedores/inserirfornecedor" component={DialogoInserirCliente} />
        <Route path="/fornecedores/alterarfornecedor" component={DialogoAlterarCilente} />
      </Switch>
    </Dialogo>
  );
}

export default DialogoFornecedores;