import React from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Route, Switch, useLocation } from 'react-router-dom';
import DialogoIncluirOuAlterarFuncionario from '../DialogoIncluirOuAlterarFuncionario';
import ListagemPessoa from '../../../componentes/ListagemPessoa';

const DialogFuncionarios: React.FC = () => {
  const listar = useLocation().pathname === "/funcionarios";

  return (
    <Dialogo maxWidth="lg" fullWidth open title="Funcionários">
      <ListagemPessoa
        dominio="funcionario"
        linkToChangeText={funcionario => `Alterar o funcionário ${funcionario.nome}`}
        linkToChangePath={funcionario => `/funcionarios/incluiralterarfuncionario?id=${funcionario._id}`}
        linkToInsertPath="/funcionarios/incluiralterarfuncionario"
        linkToInsertText="incluir funcionário"
        listar={listar}
      />
      <Switch>
        <Route path="/funcionarios/incluiralterarfuncionario">
          <DialogoIncluirOuAlterarFuncionario />
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default DialogFuncionarios;