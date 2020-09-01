import React, { useCallback, useEffect, useState, useContext, useMemo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box, } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Link, Route, Switch } from 'react-router-dom';
import DialogInserirFuncionario from '../DialogInserirFuncionario';
import ListagemFuncionarios from '../ListagemFuncionarios';
import DialogAlterarFuncionario from '../DialogAlterarFuncionario';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import Funcionario from '../../../Types/Funcionario';

const DialogFuncionarios: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[] | undefined>(undefined);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const funcionarios = await get(`/funcionario`) as Funcionario[];
    if (funcionarios) {
      setFuncionarios(funcionarios);
    }
  }, [get,]);

  useEffect(() => {
    listar();
  }, [listar, pathname]);

  const handleSearch = useCallback(async ({ consulta, tipo }) => {
    const funcionarios = await get(`/funcionario/consulta?consulta=${consulta}&tipo=${tipo}`) as Funcionario[]
    if (funcionarios) {
      setFuncionarios(funcionarios);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta onSubmit={handleSearch} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemFuncionarios funcionarios={funcionarios} />
      <Link to="funcionarios/inserirfuncionario">
        <BotaoInserir titulo="Inserir funcionario" />
      </Link>
    </>
  ), [funcionarios, handleSearch])


  return (
    <Dialogo maxWidth="lg" fullWidth open title="Funcionários">
      {conteudo}
      <Switch>
        <Route path="/funcionarios/inserirfuncionario">
          <DialogInserirFuncionario/>
        </Route>
        <Route path="/funcionarios/alterarfuncionario">
          <DialogAlterarFuncionario/>
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default DialogFuncionarios;