import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dialog from '../../../componentes/Dialog';
import Listagem from '../../../componentes/Listagem';
import DialogIncluirOrdemDeServico from '../DialogIncluirOrdemDeServico';
import DialogoAlterarOrdemDeServico from '../DialogoAlterarOrdemDeServico';


const ListagemOrdensDeServico: React.FC = () => {

  return (
    <Dialog title="Ordens de serviço" open fullWidth maxWidth='lg' >
      <Listagem
        dominio="ordemdeservico"
        getPrimaryText={ordemDeServico => ordemDeServico.veiculo.placa.toLocaleUpperCase()}
        getSecondaryText={ordemDeServico => ordemDeServico.sintoma}
        getLinkToChange={ordemDeServico => `/ordensdeservico/alterarordemdeservico?id=${ordemDeServico._id}`}
        getTitleLinkToChange={() => ""}
        linkToInsert="/ordensdeservico/incluirordemdeservico"
        linkToInsertTitle="Incluir ordem de serviço"
        formSearchFilters={["veiculo", "status", "categoria" ,]}
      />
      <Switch>
        <Route path="/ordensdeservico/incluir" component={DialogIncluirOrdemDeServico} />
        <Route path="/ordensdeservico/alterarordemdeservico" component={DialogoAlterarOrdemDeServico} />
      </Switch>
    </Dialog>
  );
}

export default memo(ListagemOrdensDeServico);