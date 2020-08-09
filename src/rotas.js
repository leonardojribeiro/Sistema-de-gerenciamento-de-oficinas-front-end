import React, { memo, useContext, useCallback, useEffect } from 'react';
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
import DialogoEspecialidades from './dominios/Especialidade/DialogoEspecialidades';
import DialogoFornecedores from './dominios/Fornecedor/DialogoFornecedores';
import DialogoFuncionarios from './dominios/Funcionario/DialogoFuncionarios';
import ApiContext from './contexts/ApiContext';
import useAuth from './hooks/useAuth';


function Rotas() {
  const { usuario, setUsuario, } = useContext(AuthContext);
  const { post } = useContext(ApiContext);
  const { logado } = useAuth();
  const efetuarLoginPorToken = useCallback(async (token) => {
    const resposta = await post(
      "/usuario/loginPorToken",
      {
        token
      }
    )
    if (resposta) {
      setUsuario(resposta);
    }
  }, [post, setUsuario]);


  useEffect(() => {
    if (!logado && usuario) {
      efetuarLoginPorToken(usuario.token);
    }
  }, [efetuarLoginPorToken, logado, usuario]);

  return (
    <>
      <Switch>
        <Route path="/login" exact>
          <DialogoLogin />
        </Route>
      </Switch>
      {
        !logado ? (
          <PaginaInicial />
        )
          : (
            <>
              <PaginaInicialOficina />
              <Switch>
                <Route path="/marcas">
                  <DialgoMarcas />
                </Route>

                <Route path="/modelos">
                  <DialogoModelos />
                </Route>

                <Route path="/pecas">
                  <DialogoPecas />
                </Route>

                <Route path="/clientes">
                  <DialogoClientes />
                </Route>

                <Route path="/veiculos">
                  <DialogoVeiculos />
                </Route>

                <Route path="/especialidades">
                  <DialogoEspecialidades />
                </Route>

                <Route path="/fornecedores">
                  <DialogoFornecedores />
                </Route>

                <Route path="/funcionarios">
                  <DialogoFuncionarios />
                </Route>

                <Route path="/login" exact>
                  <Redirect to="/" />
                </Route>

                <Route path="/opcoes">
                  <DialogoOpcoes />
                </Route>
              </Switch>
            </>
          )
      }

    </>
  );
}

export default memo(Rotas);