import React, { memo, useContext } from 'react';
import { Switch, Route, Redirect, } from 'react-router-dom';
import PaginaInicial from './componentes/paginaInicial/PaginaInicial';
import AuthContext from './contexts/AuthContext';
import PaginaInicialOficina from './componentes/paginaInicialOficina/PaginaInicialOficina';
import DialgoMarcas from './dominios/Marca/DialogoMarcas';
import DialogoLogin from './componentes/DialogoLogin';
import DialogoModelos from './dominios/Modelo/DialogoModelos';
import DialogoPecas from './dominios/Peca/DialogoPecas';
import DialogoClientes from './dominios/Cliente/DialogoClientes';
import DialogoOpcoes from './componentes/DialogoOpcoes';
import DialogoVeiculos from './dominios/Veiculo/DialogoVeiculos';


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

                <Route path="/pecas"> 
                  <DialogoPecas/>
                </Route>

                <Route path="/clientes"> 
                  <DialogoClientes/>
                </Route>

                <Route path="/veiculos"> 
                  <DialogoVeiculos/>
                </Route>

                <Route path="/login" exact>
                  <Redirect to="/" />
                </Route>

                <Route path="/opcoes"> 
                  <DialogoOpcoes/>
                </Route>
              </Switch>
            </>
          )
      }

    </>
  );
}

export default memo(Rotas);