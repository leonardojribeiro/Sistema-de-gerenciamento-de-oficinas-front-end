import React, { memo, } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route, } from 'react-router-dom';
import DialogIncluirOuAlterarEspecialidade from '../DialogoIncluirOuAlterarEspecialidade';
import ListagemEspecialidades from '../ListagemEspecialidades';


function DialgoEspecialidades() {
  return (
    <Dialogo open fullWidth maxWidth="xs" title="Especialidades">
      <ListagemEspecialidades />
      <Switch>
        <Route path={["/especialidades/incluirespecialidade", "/especialidades/alterarespecialidade"]} component={DialogIncluirOuAlterarEspecialidade} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialgoEspecialidades);