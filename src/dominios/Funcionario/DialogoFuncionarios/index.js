import React, { useCallback, useEffect, useState, useContext, useMemo } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import { Box, } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Link } from 'react-router-dom';
import DialogoInserirFuncionario from '../DialogoInserirFuncionario';
import ListagemFuncionarios from '../ListagemFuncionarios';
import DialogoAlterarFuncionario from '../DialogoAlterarFuncionario';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';

function DialogoFuncionarios() {
  const [clientes, setClientes] = useState([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const clientes = await get(`/funcionario`);
    if (clientes) {
      setClientes(clientes);
    }
  }, [get,]);

  useEffect(() => {
    if (pathname === "/funcionarios") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta, tipo }) => {
    const modelos = await get(`/funcionario/consulta?consulta=${consulta}&tipo=${tipo}`);
    if (modelos) {
      setClientes(modelos);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta aoEnviar={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemFuncionarios clientes={clientes} />
      <BotaoInserir titulo="Inserir funcionario" component={Link} to="funcionarios/inserir" />
    </>
  ), [clientes, manipularBusca])


  return (
    <Dialogo maxWidth="lg" fullWidth aberto titulo="Clientes">
      {conteudo}
      <DialogoInserirFuncionario aberto={pathname === "/funcionarios/inserir"} />
      <DialogoAlterarFuncionario aberto={pathname === "/funcionarios/alterar"} />
    </Dialogo>
  );
}

export default DialogoFuncionarios;