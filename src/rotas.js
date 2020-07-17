import React, { memo, useContext } from 'react';
import { Switch, Route, Redirect, } from 'react-router-dom';
import PaginaInicial from './componentes/paginaInicial/PaginaInicial';
import AuthContext from './contexts/AuthContext';
import PaginaInicialOficina from './componentes/paginaInicialOficina/PaginaInicialOficina';
import DialgoMarcas from './componentes/marca/DialogoMarcas';
import DialogoLogin from './componentes/DialogoLogin';
import DialogoModelos from './componentes/modelo/DialogoModelos';


function Rotas() {
  const { usuario } = useContext(AuthContext);
  return (
    <>
      <Switch>
        <Route path="/login" exact>
          <DialogoLogin/>
        </Route>
        <Route path="/t" exact>
        </Route>
      </Switch>
      {
        !usuario ? (
          <PaginaInicial />
        )
          : (
            <>
              <PaginaInicialOficina />
              <Switch>
                <Route path="/marcas">
                  <DialgoMarcas/>
                </Route>

                <Route path="/modelos"> 
                  <DialogoModelos/>
                </Route>


                <Route path="/login" exact>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </>
          )
      }

    </>
  );
}

export default memo(Rotas);