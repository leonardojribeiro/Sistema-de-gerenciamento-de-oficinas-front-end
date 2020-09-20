import React, { memo, } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Switch, Route, } from 'react-router-dom';
import DialogoInserirEspecialidade from '../DialogoInserirEspecialidade';
import DialogAlterarEspecialidade from '../DialogoAlterarEspecialidade';
import ListagemEspecialidades from '../ListagemEspecialidades';


function DialgoEspecialidades() {
  return (
    <Dialogo open fullWidth maxWidth="xs" title="Especialidades">
      <ListagemEspecialidades />
      <Switch>
        <Route path="/especialidades/inserirespecialidade" component={DialogoInserirEspecialidade} />
        <Route path="/especialidades/alterarespecialidade" component={DialogAlterarEspecialidade} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialgoEspecialidades);