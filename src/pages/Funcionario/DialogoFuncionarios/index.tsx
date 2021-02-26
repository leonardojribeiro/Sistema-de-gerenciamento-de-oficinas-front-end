import React, { useMemo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Route, Switch } from 'react-router-dom';
import FormFuncionario from '../FormFuncionario';
import Listagem from '../../../componentes/Listagem';
import ShowPessoa from '../../../componentes/ShowPessoa';

const DialogFuncionarios: React.FC = () => {
  const listagem = useMemo(() => {
    return (
      <Listagem
        dominio="funcionario"
        formSearchFilters={['nome', 'cpf', 'email', 'telefone']}
        getPrimaryText={funcionario => funcionario.nome}
        getSecondaryText={funcionario => `Celular: ${funcionario.telefoneCelular}`}
        getTitleLinkToChange={funcionario => `Alterar o funcionário ${funcionario.nome}`}
        getLinkToChange={funcionario => `/funcionarios/alterarfuncionario?id=${funcionario._id}`}
        linkToInsert="/funcionarios/incluirfuncionario"
        linkToInsertTitle="incluir funcionário"
        getLinkToShow={fornecedor => `/funcionarios/exibirfuncionario?id=${fornecedor._id}`}
      />
    )
  }, [])

  return (
    <Dialogo maxWidth="md" fullWidth open title="Funcionários">
      {listagem}
      <Switch>
        <Route path={["/funcionarios/incluirfuncionario", "/funcionarios/alterarfuncionario"]} component={FormFuncionario} />
        <Route path="/funcionarios/exibirfuncionario">
          <ShowPessoa
            dominio="funcionario"
            linkToEdit="/funcionarios/alterarfuncionario"
            title="Funcionário"
          />
        </Route>
      </Switch>
    </Dialogo >
  );
}

export default DialogFuncionarios;