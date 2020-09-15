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

interface ListaPecas {
  pecas: Peca[],
  total: number;
}

const DialogoPecas: React.FC = () => {
  const [pecas, setPecas] = useState<ListaPecas>({} as ListaPecas);
  const [page, setPage] = useState<number>(1);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();
  const consultaValues = useRef<ConsultaValues | undefined>();

  const listar = useCallback(async () => {
    if (!(Boolean(consultaValues.current?.consulta) || Boolean(consultaValues.current?.marca))) {
      const resposta = await get(`/peca?limite=100&pagina=${page}`);
      if (resposta) {
        setPecas(resposta as ListaPecas);
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
    const resposta = await get(`/peca/consulta?descricao=${dados.consulta}&marca=${dados.marca}&limite=100&pagina=${pagina}`);
    if (resposta) {
      setPecas(resposta as ListaPecas);
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
      <ListagemPeca pecas={pecas.pecas} />
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(pecas.total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <BotaoInserir titulo="Inserir peça" linkTo="/pecas/inserirpeca" />
      <Switch>
        <Route path="/pecas/inserirpeca" component={DialogoInserirPeca} />
        <Route path="/pecas/alterarpeca" component={DialogoAlterarPeca} />
      </Switch>
    </Dialogo>
  );
}

export default DialogoPecas;