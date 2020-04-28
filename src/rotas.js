import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CadastroOficina from './dominios/oficina/CadastroOficina';

export default function Rotas({tema}) {
  return (
    <Switch>
      <Route path="/oficina/cadastro/" exact>
        <CadastroOficina tema={tema}/>
      </Route>
    </Switch>
  );
}