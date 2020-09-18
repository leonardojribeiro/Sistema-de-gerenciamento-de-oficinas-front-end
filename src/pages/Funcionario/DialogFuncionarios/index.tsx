import React from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Route, Switch, useLocation } from 'react-router-dom';
import DialogInserirFuncionario from '../DialogInserirFuncionario';
import DialogAlterarFuncionario from '../DialogAlterarFuncionario';
import ListagemPessoa from '../../../componentes/ListagemPessoa';

const DialogFuncionarios: React.FC = () => {
  const listar = useLocation().pathname === "/funcionarios";

  return (
    <Dialogo maxWidth="lg" fullWidth open title="Funcionários">
      <ListagemPessoa
        dominio="funcionario"
        linkToChangeText={funcionario => `Alterar o funcionário ${funcionario.nome}`}
        linkToChangePath={funcionario => `funcionarios/alterarfuncionario?id=${funcionario._id}`}
        linkToInsertPath="funcionarios/inserirfuncionario"
        linkToInsertText="Inserir funcionário"
        listar={listar}
      />
      <Switch>
        <Route path="/funcionarios/inserirfuncionario">
          <DialogInserirFuncionario />
        </Route>
        <Route path="/funcionarios/alterarfuncionario">
          <DialogAlterarFuncionario />
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default DialogFuncionarios;