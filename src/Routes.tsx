import React, { memo, useContext, useCallback, useEffect } from 'react';
import { Switch, Route, } from 'react-router-dom';
import PaginaInicial from './componentes/paginaInicial/PaginaInicial';
import AuthContext from './contexts/AuthContext';
import Home from './pages/Home/Home';
import DialgoMarcas from './pages/Marca/DialogMarcas';
import DialogoLogin from './pages/Login/DialogLogin';
import DialogoModelos from './pages/Modelo/DialogoModelos';
import DialogoPecas from './pages/Peca/DialogoPecas';
import DialogoClientes from './pages/Cliente/DialogoClientes';
import DialogoOpcoes from './pages/Opcoes';
import DialogoVeiculos from './pages/Veiculo/DialogoVeiculos';
import DialogoFornecedores from './pages/Fornecedor/DialogoFornecedores';
import DialogoFuncionarios from './pages/Funcionario/DialogFuncionarios';
import ApiContext from './contexts/ApiContext';
import useAuth from './hooks/useAuth';
import Usuario from './Types/Usuario';
import DialogServicos from './pages/Servico/DialogServicos';
import DialogoEspecialidades from './pages/Especialidade/DialogoEspecialidades';
import Teste from './Teste';
import DialogInserirOrdemDeServico from './pages/OrdemDeServico/DialogInserirOrdemDeServico';
import DialogAlterarOrdemDeServico from './pages/OrdemDeServico/DialogoAlterarOrdemDeServico';
import { OrdemDeServicoProvider } from './pages/OrdemDeServico/OrdemDeServicoContext';

const Routes: React.FC = () => {
  const authContext = useContext(AuthContext);
  const apiContext = useContext(ApiContext);
  const { logado } = useAuth();
  //console.log(useLocation())
  const efetuarLoginPorToken = useCallback(async () => {
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
      throw new Error("Esse componente deve estar em uma sub-árvore depois do <ApiContext.Provider>.");
    }
  }, [apiContext, authContext]);


  useEffect(() => {
    if (!logado && authContext && authContext.usuario.token) {
      efetuarLoginPorToken();
    }
  }, [authContext, efetuarLoginPorToken, logado]);

  return (
    <>
      {
        !logado ? (
          <>
            <PaginaInicial />
            <Switch>
              <Route path="/login" exact>
                <DialogoLogin />
              </Route>
            </Switch>

          </>
        )
          : (
            <>
              <Home />
              <Switch>
                <Route path="/marcas" component={DialgoMarcas} />
                <Route path="/modelos" component={DialogoModelos} />
                <Route path="/pecas" component={DialogoPecas} />
                <Route path="/clientes" component={DialogoClientes} />
                <Route path="/veiculos" component={DialogoVeiculos} />
                <Route path="/especialidades" component={DialogoEspecialidades} />
                <Route path="/fornecedores" component={DialogoFornecedores} />
                <Route path="/funcionarios" component={DialogoFuncionarios} />
                <Route path="/servicos" component={DialogServicos} />
                <Route path="/opcoes" component={DialogoOpcoes} />
                <OrdemDeServicoProvider>
                  <Route path="/ordensdeservico/inserir" component={DialogInserirOrdemDeServico} />
                  <Route path="/ordensdeservico/alterarordemdeservico" component={DialogAlterarOrdemDeServico} />
                </OrdemDeServicoProvider>
                <Route path="/popular" exact component={Teste} />
              </Switch>
            </>
          )
      }
    </>
  );
}

export default memo(Routes);