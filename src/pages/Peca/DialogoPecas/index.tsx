import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import FormPeca from '../FormPeca';
import Listagem from '../../../componentes/Listagem';
import Avatar from '@material-ui/core/Avatar';

const DialogoPecas: React.FC = () => {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  return (
    <Dialogo maxWidth="xs" fullWidth open title="Peças">
      <Listagem
        dominio="peca"
        formSearchFilters={["descricao", "marca"]}
        getPrimaryText={item => item?.descricao}
        getSecondaryText={item => item?.marca?.descricao}
        renderAvatar={item => (
          <Avatar src={`${imagensUrl}/${item?.marca?.uriLogo}`} alt={item?.marca?.descricao} />
        )}
        getLinkToChange={item => `/pecas/alterarpeca?id=${item?._id}`}
        getTitleLinkToChange={item => `Alterar a peça ${item?.descricao}`}
        linkToInsertTitle="Incluir peça"
        linkToInsert="/pecas/incluirpeca"
      />
      <Switch>
        <Route path={["/pecas/incluirpeca", "/pecas/alterarpeca"]} component={FormPeca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoPecas);