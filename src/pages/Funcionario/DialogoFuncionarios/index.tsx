import React from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Route, Switch, useLocation } from 'react-router-dom';
import DialogoIncluirFuncionario from '../DialogoIncluirFuncionario';
import DialogAlterarFuncionario from '../DialogoAlterarFuncionario';
import ListagemPessoa from '../../../componentes/ListagemPessoa';

const DialogFuncionarios: React.FC = () => {
  const listar = useLocation().pathname === "/funcionarios";

  return (
    <Dialogo maxWidth="lg" fullWidth open title="Funcionários">
      <ListagemPessoa
        dominio="funcionario"
        linkToChangeText={funcionario => `Alterar o funcionário ${funcionario.nome}`}
        linkToChangePath={funcionario => `funcionarios/alterarfuncionario?id=${funcionario._id}`}
        linkToInsertPath="funcionarios/incluirfuncionario"
        linkToInsertText="incluir funcionário"
        listar={listar}
      />
      <Switch>
        <Route path="/funcionarios/incluirfuncionario">
          <DialogoIncluirFuncionario />
        </Route>
        <Route path="/funcionarios/alterarfuncionario">
          <DialogAlterarFuncionario />
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default DialogFuncionarios;