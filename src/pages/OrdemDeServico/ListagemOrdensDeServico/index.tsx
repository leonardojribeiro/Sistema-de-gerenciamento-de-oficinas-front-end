import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dialog from '../../../componentes/Dialog';
import ItemOrdemDeServico from '../../../componentes/ItemOrdemDeServico';
import Listagem from '../../../componentes/Listagem';
import DialogoAlterarOrdemDeServico from '../DialogoAlterarOrdemDeServico';
import ShowOrdemDeServico from '../ShowOrdemDeServico';

function ListagemOrdensDeServico(): JSX.Element {
  return (
    <Dialog title="Ordens de serviço" open fullWidth maxWidth='md' >
      <Listagem
        dominio="ordemdeservico"
        linkToInsert="/ordensdeservico/incluirordemdeservico"
        linkToInsertTitle="Incluir ordem de serviço"
        formSearchFilters={["status", "veiculo",]}
        renderListItem={ordemDeServico => <ItemOrdemDeServico ordemDeServico={ordemDeServico} />}
      />
      <Switch>
        <Route path={["/ordensdeservico/alterarordemdeservico", "/ordensdeservico/incluirordemdeservico"]} component={DialogoAlterarOrdemDeServico} />
        <Route path="/ordensdeservico/exibirordemdeservico" component={ShowOrdemDeServico} />
      </Switch>
    </Dialog>
  );
}

export default memo(ListagemOrdensDeServico);