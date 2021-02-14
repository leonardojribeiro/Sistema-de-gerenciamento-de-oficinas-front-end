import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Route, Switch } from 'react-router-dom';
import DialogoIncluirOuAlterarMarca from '../DialogoIncluirOuAlterarMarca';
import Listagem from '../../../componentes/Listagem';
import { Avatar } from '@material-ui/core';

const DialogMarcas: React.FC = () => {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL as string;
  return (
    <Dialogo open fullWidth maxWidth="xs" title="Marcas">
      <Listagem
        dominio='marca'
        formSearchFilters={['descricao']}
        getPrimaryText={item => item.descricao}
        getLinkToChange={item => `/marcas/alterarmarca?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar a marca ${item.descricao}`}
        linkToInsertTitle="Incluir marca"
        linkToInsert="/marcas/incluirmarca"
        renderAvatar={item => (
          <Avatar src={`${imagensUrl}/${item.uriLogo}`} alt={item.descricao} />
        )}
      />
      <Switch>
        <Route path={["/marcas/incluirmarca", "/marcas/alterarmarca"]}>
          <DialogoIncluirOuAlterarMarca />
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogMarcas);