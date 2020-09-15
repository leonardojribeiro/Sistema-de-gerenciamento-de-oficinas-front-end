import React, { useCallback, useEffect, useState, useContext, useMemo, memo, useRef } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box, FormControlLabel, Grid, Radio, } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Switch, Route } from 'react-router-dom';
import DialogoInserirCliente from '../DialogoInserirCliente';
import ListagemClientes from '../ListagemClientes';
import DialogoAlterarCliente from '../DialogoAlterarCliente';
import BotaoInserir from '../../../componentes/BotaoInserir';
import Cliente from '../../../Types/Cliente';
import { Pagination } from '@material-ui/lab';
import { CampoDeRadio, Form } from '../../../componentes/Form';
import SearchField from '../../../componentes/Form/Fields/SearchField';
import FormConsultaPessoa from '../../../componentes/FormConsultaPessoa';

const DialogoClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();
  const consultaValues = useRef();

  const listar = useCallback(async () => {
    const resposta = await get(`cliente?pagina=${page}&limite=2`) as any;
    if (resposta) {
      setClientes(resposta.clientes as Cliente[]);
      setPages(Math.ceil(Number(resposta.total) / 2));
    }
  }, [get, page]);

  useEffect(() => {
    if (pathname === "/clientes") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async (dados, pagina = page) => {
    consultaValues.current = dados;
    const resposta = await get(`/cliente/consulta?${dados.filtro}=${dados.consulta}&limite=100&pagina=${pagina}`) as any;
    if (resposta) {
      setClientes(resposta.clientes as Cliente[]);
      setPages(Math.ceil(Number(resposta.total) / 100));
    }
  }, [get, page]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
    if (consultaValues.current) {
      manipularBusca(consultaValues.current, value)
    }
  }, [manipularBusca]);


  const conteudo = useMemo(() => (
    <>
      <FormConsultaPessoa onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemClientes clientes={clientes} />
      <Box display="flex" justifyContent="center">
        <Pagination count={pages} onChange={handlePageChange} page={page} />
      </Box>
      <BotaoInserir titulo="Inserir cliente" linkTo="clientes/inserircliente" />
    </>
  ), [clientes, handlePageChange, manipularBusca, page, pages])


  return (
    <Dialogo maxWidth="lg" fullWidth open title="Clientes">
      {conteudo}
      <Switch>
        <Route path="/clientes/inserircliente" component={DialogoInserirCliente} />
        <Route path="/clientes/alterarcliente" component={DialogoAlterarCliente} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoClientes);