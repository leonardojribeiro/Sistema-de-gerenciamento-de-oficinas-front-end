import React, { useCallback, useEffect, useState, useContext, memo, useRef } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Switch, Route } from 'react-router-dom';
import DialogoInserirCliente from '../DialogoInserirCliente';
import ListagemClientes from '../ListagemClientes';
import DialogoAlterarCliente from '../DialogoAlterarCliente';
import BotaoInserir from '../../../componentes/BotaoInserir';
import Cliente from '../../../Types/Cliente';
import { Pagination } from '@material-ui/lab';
import FormConsultaPessoa from '../../../componentes/FormConsultaPessoa';

interface ListaClientes {
  clientes: Cliente[];
  total: number;
}

const DialogoClientes: React.FC = () => {
  const [clientes, setClientes] = useState<ListaClientes>({} as ListaClientes);
  const [page, setPage] = useState<number>(1);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();
  const consultaValues = useRef();

  const listar = useCallback(async () => {
    if (!consultaValues.current) {
      const resposta = await get(`cliente?pagina=${page}&limite=20`) as ListaClientes;
      if (resposta) {
        setClientes(resposta);
      }
    }
  }, [get, page]);

  useEffect(() => {
    if (pathname === "/clientes") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async (dados, pagina = page) => {
    consultaValues.current = dados;
    const resposta = await get(`/cliente/consulta?${dados.filtro}=${dados.consulta}&limite=20&pagina=${pagina}`) as any;
    if (resposta) {
      setClientes(resposta);
    }
  }, [get, page]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
    if (consultaValues.current) {
      manipularBusca(consultaValues.current, value)
    }
  }, [manipularBusca]);

  return (
    <Dialogo maxWidth="lg" fullWidth open title="Clientes">
      <FormConsultaPessoa onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemClientes clientes={clientes.clientes} />
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(clientes.total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <BotaoInserir titulo="Inserir cliente" linkTo="clientes/inserircliente" />
      <Switch>
        <Route path="/clientes/inserircliente" component={DialogoInserirCliente} />
        <Route path="/clientes/alterarcliente" component={DialogoAlterarCliente} />
      </Switch>
    </Dialogo >
  );
}

export default memo(DialogoClientes);