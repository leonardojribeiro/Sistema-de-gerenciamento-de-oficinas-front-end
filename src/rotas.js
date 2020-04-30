import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CadastroOficina from './dominios/oficina/CadastroOficina';
import PaginaInicial from './componentes/paginaInicial/PaginaInicial';

export default function Rotas({tema}) {
  return (
    <Switch>
      <Route path="/oficina/cadastro/" exact>
        <CadastroOficina tema={tema}/>
      </Route>
      <Route path="/" exact>
        <PaginaInicial/>
      </Route>
    </Switch>
  );
}