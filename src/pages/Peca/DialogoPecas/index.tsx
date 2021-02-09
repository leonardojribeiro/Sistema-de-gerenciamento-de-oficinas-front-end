import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirOuAlterarPeca from '../DialogoIncluirOuAlterarPeca';
import Listagem from '../../../componentes/Listagem';

const DialogoPecas: React.FC = () => {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  return (
    <Dialogo maxWidth="xs" fullWidth open title="Peças">
      <Listagem
        dominio="peca"
        formSearchFilters={["descricao", "marca"]}
        getPrimaryText={item => item.descricao}
        getSecondaryText={item => item.marca.descricao}
        // getURLAvatar={item => `${imagensUrl}/${item.marca.uriLogo}`}
        // getAltAvatar={item => item.marca.descricao}
        getLinkToChange={item => `/pecas/alterarpeca?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar a peça ${item.descricao}`}
        linkToInsertTitle="Incluir peça"
        linkToInsert="/pecas/incluirpeca"
      />
      <Switch>
        <Route path={["/pecas/incluirpeca", "/pecas/alterarpeca"]} component={DialogoIncluirOuAlterarPeca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoPecas);