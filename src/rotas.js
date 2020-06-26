import React, { memo, useContext } from 'react';
import { Switch, Route,} from 'react-router-dom';
import CadastroOficina from './dominios/oficina/CadastroOficina';
import PaginaInicial from './componentes/paginaInicial/PaginaInicial';
import Teste from './componentes/teste';
import AuthContext from './contexts/AuthContext';
import PaginaInicialOficina from './componentes/paginaInicialOficina/PaginaInicialOficina';


function Rotas(props) {
  const { usuario } = useContext(AuthContext);
  return (
    <Switch>
      <Route path="/oficina/cadastro/" exact>
        <CadastroOficina />
      </Route>
      {
        !usuario ? (
          <Route path="/" >
            <PaginaInicial />
          </Route>
        )
        : (
          <Route path="/" exact>
            <PaginaInicialOficina />
          </Route>
        )
      }
      <Route path="/t" exact>
        <Teste />
      </Route>
    </Switch>
  );
}

export default memo(Rotas);