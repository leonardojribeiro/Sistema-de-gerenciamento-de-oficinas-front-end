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
import FormConsultaPeca, { ConsultaValues } from '../FormConsultaPeca';

const DialogoPecas: React.FC = () => {
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();
  const consultaValues = useRef<ConsultaValues | undefined>();

  const listar = useCallback(async () => {
    if (!(Boolean(consultaValues.current?.consulta) || Boolean(consultaValues.current?.marca))) {
      const resposta = await get(`/peca?limite=100&pagina=${page}`) as any;
      if (resposta) {
        setPecas(resposta.pecas as Peca[]);
        setPages(Math.ceil(Number( resposta.total) / 100));
      }
    }
  }, [get, page]);

  useEffect(() => {
    if (pathname === "/pecas") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async (dados, pagina = page) => {
    consultaValues.current = dados;
    const resposta = await get(`/peca/consulta?consulta=${dados.consulta}&marca=${dados.marca}&limite=100&pagina=${pagina}`) as any;
    if (resposta) {
      setPecas(resposta.pecas as Peca[]);
      setPages(Math.ceil(Number( resposta.total) / 100));
    }
  }, [get, page]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
    if (consultaValues.current) {
      manipularBusca(consultaValues.current, value)
    }
  }, [manipularBusca]);

  return (
    <Dialogo maxWidth="sm" fullWidth open title="Peças">
      <FormConsultaPeca onSubmit={manipularBusca} />
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