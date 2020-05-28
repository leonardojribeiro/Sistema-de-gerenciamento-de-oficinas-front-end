import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import CadastroOficina from './dominios/oficina/CadastroOficina';
import PaginaInicial from './componentes/paginaInicial/PaginaInicial';
import Teste from './componentes/teste';


function Rotas(props) {
  return (
    <Switch>
      <Route path="/oficina/cadastro/" exact>
        <CadastroOficina/>
      </Route>
      <Route path="/" exact>
        <PaginaInicial/>
      </Route>
      <Route path="/t" exact>
        <Teste/>
      </Route>
    </Switch>
  );
}

export default memo(Rotas);