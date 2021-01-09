import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirOuAlterarServico from '../DialogoIncluirOuAlterarServico';
import Listagem from '../../../componentes/Listagem';
import Formato from '../../../recursos/Formato';

const DialogServicos: React.FC = () => {
  return (
    <Dialogo maxWidth="xs" fullWidth open title="Serviços">
      <Listagem
        dominio='servico'
        formSearchFilters={['descricao']}
        getPrimaryText={item => item.descricao}
        getSecondaryText={item => `${item.tempoDuracao} minutos | R$${Formato.formatarMoeda(item.valor)}`}
        getLinkToChange={item => `/servicos/alterarservico?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar o servico ${item.descricao}`}
        linkToInsertTitle="Incluir serviço"
        linkToInsert="/servicos/incluirservico"
      />
      <Switch>
        <Route path={["/servicos/incluirservico", "/servicos/alterarservico"]} component={DialogoIncluirOuAlterarServico} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogServicos);