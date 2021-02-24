import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import FormModelo from '../FormModelo';
import Listagem from '../../../componentes/Listagem';
import Avatar from '@material-ui/core/Avatar';

const DialogoModelos: React.FC = () => {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  return (
    <Dialogo maxWidth="xs" fullWidth open title="Modelos">
      <Listagem
        formSearchFilters={['descricao', 'marca',]}
        dominio="modelo"
        getPrimaryText={item => item.descricao}
        getSecondaryText={item => item.marca.descricao}
        renderAvatar={item => (
          <Avatar src={`${imagensUrl}/${item.marca.uriLogo}`} alt={item.marca.descricao} />
        )}
        getLinkToChange={item => `/modelos/alterarmodelo?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar o modelo ${item.descricao}`}
        linkToInsertTitle="Incluir modelo"
        linkToInsert="/modelos/incluirmodelo"
      />
      <Switch>
        <Route path={["/modelos/incluirmodelo", "/modelos/alterarmodelo"]} component={FormModelo} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoModelos);