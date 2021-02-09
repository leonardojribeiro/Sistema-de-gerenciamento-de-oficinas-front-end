import React, { memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route } from 'react-router-dom';
import DialogoIncluirOuAlterarModelo from '../DialogoIncluirOuAlterarModelo';
import Listagem from '../../../componentes/Listagem';

const DialogoModelos: React.FC = () => {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  return (
    <Dialogo maxWidth="xs" fullWidth open title="Modelos">
      <Listagem
        formSearchFilters={['descricao', 'marca', ]}
        dominio="modelo"
        getPrimaryText={item => item.descricao}
        getSecondaryText={item => item.marca.descricao}
        getURLAvatar={item => `${imagensUrl}/${item.marca.uriLogo}`}
        getAltAvatar={item => item.marca.descricao}
        getLinkToChange={item => `/modelos/alterarmodelo?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar o modelo ${item.descricao}`}
        linkToInsertTitle="Incluir modelo"
        linkToInsert="/modelos/incluirmodelo"
      />
      <Switch>
        <Route path={["/modelos/incluirmodelo", "/modelos/alterarmodelo"]} component={DialogoIncluirOuAlterarModelo} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoModelos);