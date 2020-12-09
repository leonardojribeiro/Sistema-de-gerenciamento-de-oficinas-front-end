import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PaginaInicial from '../componentes/paginaInicial/PaginaInicial';
import DialogLogin from '../pages/Login/DialogLogin';

const PublicRoutes: React.FC = () => {
  return (
    <>
      <PaginaInicial />
      <Switch>
        <Route path="/login" exact>
          <DialogLogin />
        </Route>
      </Switch>
    </>
  );
}

export default PublicRoutes;