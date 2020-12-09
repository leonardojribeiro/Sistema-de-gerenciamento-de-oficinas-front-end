import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SwipeableContextProvider } from '../contexts/SwipeableContext';
import DialogoClientes from '../pages/Cliente/DialogoClientes';
import DialogoEspecialidades from '../pages/Especialidade/DialogoEspecialidades';
import DialogoFornecedores from '../pages/Fornecedor/DialogoFornecedores';
import DialogFuncionarios from '../pages/Funcionario/DialogFuncionarios';
import Home from '../pages/Home/Home';
import DialogMarcas from '../pages/Marca/DialogMarcas';
import DialogoModelos from '../pages/Modelo/DialogoModelos';
import DialogOpcoes from '../pages/Opcoes';
import DialogInserirOrdemDeServico from '../pages/OrdemDeServico/DialogInserirOrdemDeServico';
import DialogoAlterarOrdemDeServico from '../pages/OrdemDeServico/DialogoAlterarOrdemDeServico';
import { OrdemDeServicoProvider } from '../pages/OrdemDeServico/OrdemDeServicoContext';
import DialogoPecas from '../pages/Peca/DialogoPecas';
import DialogServicos from '../pages/Servico/DialogServicos';
import DialogoVeiculos from '../pages/Veiculo/DialogoVeiculos';
import Teste from '../Teste';

const AdminitradorOficinaRoutes: React.FC = () => {
  return (
    <>
      <Home />
      <Switch>
        <Route path="/marcas" component={DialogMarcas} />
        <Route path="/modelos" component={DialogoModelos} />
        <Route path="/pecas" component={DialogoPecas} />
        <Route path="/clientes" component={DialogoClientes} />
        <Route path="/veiculos" component={DialogoVeiculos} />
        <Route path="/especialidades" component={DialogoEspecialidades} />
        <Route path="/fornecedores" component={DialogoFornecedores} />
        <Route path="/funcionarios" component={DialogFuncionarios} />
        <Route path="/servicos" component={DialogServicos} />
        <Route path="/opcoes" component={DialogOpcoes} />
        <SwipeableContextProvider initialIndexActive={1}>
          <OrdemDeServicoProvider>
            <Route path="/ordensdeservico/inserir" component={DialogInserirOrdemDeServico} />
            <Route path="/ordensdeservico/alterarordemdeservico" component={DialogoAlterarOrdemDeServico} />
          </OrdemDeServicoProvider>
        </SwipeableContextProvider>
        <Route path="/popular" exact component={Teste} />
      </Switch>
    </>
  );
}

export default AdminitradorOficinaRoutes;