import React, { useState, useContext, useCallback, useEffect, useRef } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box, } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Switch, Route } from 'react-router-dom';
import DialogoInserirPeca from '../DialogoInserirPeca';
import DialogoAlterarPeca from '../DialogoAlterarPeca';
import ListagemPeca from '../ListagemPecas';
import BotaoInserir from '../../../componentes/BotaoInserir';
import Peca from '../../../Types/Peca';
import Pagination from '@material-ui/lab/Pagination';
import FormConsulta, { ConsultaValues } from '../FormConsulta';

const DialogoPecas: React.FC = () => {
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();
  const consultaValues = useRef<ConsultaValues | undefined>();

  const listar = useCallback(async () => {
    if (!(Boolean(consultaValues.current?.consulta) || Boolean(consultaValues.current?.marca))) {
      const resposta = await get(`/peca?limit=100&page=${page}`) as any;
      if (resposta) {
        setPecas(resposta.pecas as Peca[]);
        const quantidade = resposta.total as number;
        setPages(Math.ceil(quantidade / 100));
      }
    }
  }, [get, page]);

  useEffect(() => {
    if (pathname === "/pecas") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async (consulta: String, marca: String, pagina = page) => {
    consultaValues.current = {
      consulta,
      marca,
    }
    console.log(`/peca/consulta?consulta=${consulta}&marca=${marca}&limit=100&page=${pagina}`)
    const resposta = await get(`/peca/consulta?consulta=${consulta}&marca=${marca}&limit=100&page=${pagina}`) as any;
    if (resposta) {
      setPecas(resposta.pecas as Peca[]);
      const quantidade = resposta.total as number;
      setPages(Math.ceil(quantidade / 100));
    }
  }, [get, page]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
    if (consultaValues.current) {
      manipularBusca(consultaValues.current.consulta, consultaValues.current.marca, value)
    }
  }, [manipularBusca]);


  return (
    <Dialogo maxWidth="sm" fullWidth open title="Peças">
      <FormConsulta onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemPeca pecas={pecas} />
      <BotaoInserir titulo="Inserir peça" linkTo="/pecas/inserirpeca" />
      <Box display="flex" justifyContent="center">
        <Pagination count={pages} onChange={handlePageChange} page={page} />
      </Box>
      <Switch>
        <Route path="/pecas/inserirpeca" component={DialogoInserirPeca} />
        <Route path="/pecas/alterarpeca" component={DialogoAlterarPeca} />
      </Switch>
    </Dialogo>
  );
}

export default DialogoPecas;