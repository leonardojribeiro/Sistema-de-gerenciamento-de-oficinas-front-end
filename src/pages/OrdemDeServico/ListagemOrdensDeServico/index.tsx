import { Avatar } from '@material-ui/core';
import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import CircularProgressWithLabel from '../../../componentes/CircularProgressWithLabel';
import Dialog from '../../../componentes/Dialog';
import Listagem from '../../../componentes/Listagem';
import { formatarData, formatarMoeda, formatarPlaca } from '../../../recursos/Formato';
import DialogoAlterarOrdemDeServico from '../DialogoAlterarOrdemDeServico';
import ShowOrdemDeServico from '../ShowOrdemDeServico';


const ListagemOrdensDeServico: React.FC = () => {

  return (
    <Dialog title="Ordens de serviço" open fullWidth maxWidth='lg' >
      <Listagem
        dominio="ordemdeservico"
        getPrimaryText={ordemDeServico => `${formatarPlaca(ordemDeServico.veiculo.placa)} - ${formatarData(ordemDeServico.dataDeRegistro)}`}
        getSecondaryText={ordemDeServico => `Sintoma: ${ordemDeServico.sintoma}. Valor total :R$${formatarMoeda(ordemDeServico.valorTotal)}`}
        getLinkToChange={ordemDeServico => `/ordensdeservico/alterarordemdeservico?id=${ordemDeServico._id}`}
        getTitleLinkToChange={() => "Alterar ordem de serviço"}
        linkToInsert="/ordensdeservico/incluirordemdeservico"
        linkToInsertTitle="Incluir ordem de serviço"
        formSearchFilters={["status", "veiculo",]}
        getLinkToShow={ordemDeServico => `/ordensdeservico/exibirordemdeservico?id=${ordemDeServico._id}`}
        renderAvatar={ordemDeServico => (
          <Avatar>
            <CircularProgressWithLabel value={ordemDeServico.andamento} />
          </Avatar>
        )}
      />
      <Switch>
        <Route path={["/ordensdeservico/alterarordemdeservico", "/ordensdeservico/incluirordemdeservico" ]} component={DialogoAlterarOrdemDeServico} />
        <Route path="/ordensdeservico/exibirordemdeservico" component={ShowOrdemDeServico} />
      </Switch>
    </Dialog>
  );
}

export default memo(ListagemOrdensDeServico);