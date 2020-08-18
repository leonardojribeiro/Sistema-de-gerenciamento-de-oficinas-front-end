import React, { memo, useContext, useCallback, useEffect } from 'react';
import { Switch, Route, Redirect, } from 'react-router-dom';
import PaginaInicial from './componentes/paginaInicial/PaginaInicial';
import AuthContext from './contexts/AuthContext';
import PaginaInicialOficina from './componentes/paginaInicialOficina/PaginaInicialOficina';
import DialgoMarcas from './pages/Marca/DialogMarcas';
import DialogoLogin from './pages/Login/DialogLogin';
// import DialogoModelos from './pages/Modelo/DialogoModelos';
// import DialogoPecas from './pages/Peca/DialogoPecas';
// import DialogoClientes from './pages/Cliente/DialogoClientes';
import DialogoOpcoes from './pages/Opcoes';
// import DialogoVeiculos from './pages/Veiculo/DialogoVeiculos';
// import DialogoEspecialidades from './pages/Especialidade/DialogoEspecialidades';
// import DialogoFornecedores from './pages/Fornecedor/DialogoFornecedores';
import DialogoFuncionarios from './pages/Funcionario/DialogFuncionarios';
import ApiContext from './contexts/ApiContext';
import useAuth from './hooks/useAuth';
import Usuario from './Types/Usuario';
import DialogServicos from './pages/Servico/DialogServicos';
import DialogOrdensDeServico from './pages/OrdemDeServico/DialogOrdensDeServico';
import DialogoVeiculos from './pages/Veiculo/DialogoVeiculos';
import DialogoModelos from './pages/Modelo/DialogoModelos';
import DialogoPecas from './pages/Peca/DialogoPecas';
import DialogoClientes from './pages/Cliente/DialogoClientes';


const Routes: React.FC = () => {
  const authContext = useContext(AuthContext);
  const apiContext = useContext(ApiContext);
  const { logado } = useAuth();
  const efetuarLoginPorToken = useCallback(async (token) => {
    if (apiContext) {
      const resposta = await apiContext.get(
        "/usuario/loginPorToken"
      )
      if (resposta) {
        if (authContext) {
          authContext.setUsuario({ ...authContext.usuario, ...resposta } as Usuario);
        }
        else {
          throw new Error("Esse componente deve estar em uma sub-árvore depois do <AuthContext.Provider>.");
        }
      }
    }
    else {
      throw new Error("Esse componente deve estar em uma sub-árvore depois do <AuthContext.Provider>.");
    }
  }, [apiContext, authContext]);


  useEffect(() => {
    if (!logado && authContext && authContext.usuario?.token) {
      efetuarLoginPorToken(authContext.usuario.token);
    }
  }, [authContext, efetuarLoginPorToken, logado]);

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


                <Route path="/veiculos">
                  <DialogoVeiculos />
                </Route>

                <Route path="/funcionarios">
                  <DialogoFuncionarios />
                </Route>

                <Route path="/servicos">
                  <DialogServicos />
                </Route>

                <Route path="/ordensdeservico">
                  <DialogOrdensDeServico />
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

export default memo(Routes);
/*
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
                </Route>*/