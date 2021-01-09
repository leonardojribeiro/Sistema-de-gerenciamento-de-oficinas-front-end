import React, { memo, } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route, } from 'react-router-dom';
import DialogIncluirOuAlterarEspecialidade from '../DialogoIncluirOuAlterarEspecialidade';
import Listagem from '../../../componentes/Listagem';


function DialgoEspecialidades() {
  return (
    <Dialogo open fullWidth maxWidth="xs" title="Especialidades">
       <Listagem
        dominio='especialidade'
        formSearchFilters={['descricao']}
        getPrimaryText={item => item.descricao}
        getLinkToChange={item => `/especialidades/alterarespecialidade?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar a especialidade ${item.descricao}`}
        linkToInsertTitle="Incluir especialidade"
        linkToInsert="/especialidades/incluirespecialidade"
      />
      <Switch>
        <Route path={["/especialidades/incluirespecialidade", "/especialidades/alterarespecialidade"]} component={DialogIncluirOuAlterarEspecialidade} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialgoEspecialidades);