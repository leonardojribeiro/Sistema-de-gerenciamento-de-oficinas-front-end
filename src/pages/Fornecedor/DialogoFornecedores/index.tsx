import React, { useMemo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route, } from 'react-router-dom';
import FormCliente from '../FormFornecedor';
import Listagem from '../../../componentes/Listagem';
import ShowPessoa from '../../../componentes/ShowPessoa';
import { formatarTelefone } from '../../../recursos/Formato';

const DialogoFornecedores: React.FC = () => {
  const listagem = useMemo(() => {
    return (
      <Listagem
        dominio="fornecedor"
        formSearchFilters={['nomeFantasia', 'cpfCnpj', 'email', 'telefone']}
        linkToInsert="/fornecedores/incluirfornecedor"
        linkToInsertTitle="incluir fornecedor"
        getPrimaryText={fornecedor => fornecedor.nomeFantasia}
        getSecondaryText={fornecedor => `Celular: ${formatarTelefone(fornecedor.telefoneCelular)}`}
        getTitleLinkToChange={fornecedor => `Alterar o fornecedor ${fornecedor.nomeFantasia}`}
        getLinkToChange={fornecedor => `/fornecedores/alterarfornecedor?id=${fornecedor._id}`}
        getLinkToShow={fornecedor => `/fornecedores/exibirfornecedor?id=${fornecedor._id}`}
      />
    )
  }, [])
  
  return (
    <Dialogo maxWidth="md" fullWidth open title="Fornecedores">
      {listagem}
      <Switch>
        <Route path={["/fornecedores/incluirfornecedor", "/fornecedores/alterarfornecedor"]} component={FormCliente} />
        <Route path="/fornecedores/exibirfornecedor"  >
          <ShowPessoa
            title="Fornecedor"
            dominio="fornecedor"
            linkToEdit="/fornecedores/alterarfornecedor"
          />
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default DialogoFornecedores;