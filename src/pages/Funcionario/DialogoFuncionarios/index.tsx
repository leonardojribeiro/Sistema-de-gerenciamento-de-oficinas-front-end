import React from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Route, Switch } from 'react-router-dom';
import DialogoIncluirOuAlterarFuncionario from '../DialogoIncluirOuAlterarFuncionario';
import Listagem from '../../../componentes/Listagem';

const DialogFuncionarios: React.FC = () => {

  return (
    <Dialogo maxWidth="lg" fullWidth open title="Funcionários">
      <Listagem
        dominio="funcionario"
        formSearchFilters={['nome', 'cpf', 'email', 'telefone']}
        getPrimaryText={funcionario => funcionario.nome}
        getSecondaryText={funcionario => `Celular: ${funcionario.telefoneCelular}`}
        getTitleLinkToChange={funcionario => `Alterar o funcionário ${funcionario.nome}`}
        getLinkToChange={funcionario => `/funcionarios/alterarfuncionario?id=${funcionario._id}`}
        linkToInsert="/funcionarios/incluirfuncionario"
        linkToInsertTitle="incluir funcionário"
      />
      <Switch>
        <Route path={["/funcionarios/incluirfuncionario", "/funcionarios/alterarfuncionario"]}>
          <DialogoIncluirOuAlterarFuncionario />
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default DialogFuncionarios;