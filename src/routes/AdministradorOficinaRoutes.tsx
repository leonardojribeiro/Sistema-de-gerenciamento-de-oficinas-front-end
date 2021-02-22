import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DialogoClientes from '../pages/Cliente/DialogoClientes';
import DialogoEspecialidades from '../pages/Especialidade/DialogoEspecialidades';
import DialogoFornecedores from '../pages/Fornecedor/DialogoFornecedores';
import DialogFuncionarios from '../pages/Funcionario/DialogoFuncionarios';
import Home from '../pages/Home/Home';
import DialogLogin from '../pages/Login/DialogLogin';
import DialogMarcas from '../pages/Marca/DialogoMarcas';
import DialogoModelos from '../pages/Modelo/DialogoModelos';
import DialogOpcoes from '../pages/Opcoes';
import DialogoAlterarOrdemDeServico from '../pages/OrdemDeServico/DialogoAlterarOrdemDeServico';
import ListagemOrdensDeServico from '../pages/OrdemDeServico/ListagemOrdensDeServico';
import { OrdemDeServicoProvider } from '../pages/OrdemDeServico/OrdemDeServicoContext';
import DialogoPecas from '../pages/Peca/DialogoPecas';
import DialogServicos from '../pages/Servico/DialogServicos';
import DialogoVeiculos from '../pages/Veiculo/DialogoVeiculos';
import HistoricoVeiculo from '../pages/Veiculo/HistoricoVeiculo';
import Teste from '../Teste';

const AdminitradorOficinaRoutes: React.FC = () => {
  return (
    <>
      <Home />
      <Switch>
        <Route path="/login" exact component={DialogLogin} />
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
        <Route path="/veiculos/historico" component={HistoricoVeiculo} />
        <Route path="/teste" component={Teste} />
        <OrdemDeServicoProvider>
          <Route path="/ordensdeservico" component={ListagemOrdensDeServico} />
          <Route path={["/ordensdeservico/incluir", "/ordensdeservico/alterarordemdeservico"]} component={DialogoAlterarOrdemDeServico} />
        </OrdemDeServicoProvider>
      </Switch>
    </>
  );
}

export default AdminitradorOficinaRoutes;