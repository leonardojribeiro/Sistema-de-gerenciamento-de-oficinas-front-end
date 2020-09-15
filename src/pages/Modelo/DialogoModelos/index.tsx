import React, { useState, useContext, useCallback, useEffect, useRef } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box, } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Switch, Route } from 'react-router-dom';
import DialogoInserirModelo from '../DialogoInserirModelo';
import DialogoAlterarModelo from '../DialogoAlterarModelo';
import ListagemModelos from '../ListagemModelos';
import BotaoInserir from '../../../componentes/BotaoInserir';
import Modelo from '../../../Types/Modelo';
import { Pagination } from '@material-ui/lab';
import FormConsultaPeca, { ConsultaValues } from '../../Peca/FormConsultaPeca';

interface ListaModelos {
  modelos: Modelo[];
  total: number;
}

const DialogoModelos: React.FC = () => {
  const [listaModelos, setListaModelos] = useState<ListaModelos>({} as ListaModelos);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();
  const [page, setPage] = useState<number>(1);
  const consultaValues = useRef<ConsultaValues | undefined>();

  const listar = useCallback(async () => {
    if (!(Boolean(consultaValues.current?.consulta) || Boolean(consultaValues.current?.marca))) {
      const resposta = await get(`/modelo?limite=100&pagina=${page}`);
      if (resposta) {
        setListaModelos(resposta as ListaModelos);
      }
    }
  }, [get, page]);

  useEffect(() => {
    if (pathname === "/modelos") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async (dados, pagina = page) => {
    consultaValues.current = dados;
    const resposta = await get(`/modelo/consulta?descricao=${dados.consulta}&marca=${dados.marca}&limite=100&pagina=${pagina}`) as any;
    if (resposta) {
      setListaModelos(resposta as ListaModelos);
    }
  }, [get, page]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
    if (consultaValues.current) {
      manipularBusca(consultaValues.current, value)
    }
  }, [manipularBusca]);

  return (
    <Dialogo maxWidth="sm" fullWidth open title="Modelos">
      <FormConsultaPeca onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemModelos modelos={listaModelos.modelos} />
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(listaModelos.total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <BotaoInserir titulo="Inserir modelo" linkTo="modelos/inserirmodelo" />
      <Switch>
        <Route path="/modelos/inserirmodelo" component={DialogoInserirModelo} />
        <Route path="/modelos/alterarmodelo" component={DialogoAlterarModelo} />
      </Switch>
    </Dialogo>
  );
}

export default DialogoModelos;