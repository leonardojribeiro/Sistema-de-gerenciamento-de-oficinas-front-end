import React, { useState, useCallback, memo, useEffect, useContext, useRef } from 'react';
import { Box, } from '@material-ui/core';
import Dialogo from '../../../componentes/Dialog';
import { useLocation, Link, Route, Switch } from 'react-router-dom';
import ApiContext from '../../../contexts/ApiContext';
import DialogoInserirMarca from '../DialogInserirMarca';
import DialogAlterarMarca from '../DialogAlterarMarca';
import ListagemMarcas from '../ListagemMarcas';
import BotaoInserir from '../../../componentes/BotaoInserir';
import Marca from '../../../Types/Marca';
import { Pagination } from '@material-ui/lab';
import FormConsultaMarca from '../FormConsultaMarca';

interface ListaMarcas {
  marcas: Marca[];
  total: number;
}

const DialogMarcas: React.FC = () => {
  const [marcas, setMarcas] = useState<ListaMarcas>({} as ListaMarcas);
  const [page, setPage] = useState<number>(1);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();
  const consultaValues = useRef<any>();

  const listar = useCallback(async () => {
    if (!consultaValues.current) {
      const resposta = await get(`/marca?pagina=${page}&limite=100`);
      if (resposta) {
        setMarcas(resposta as ListaMarcas);
      }
    }
  }, [get, page]);

  useEffect(() => {
    if (pathname === "/marcas") {
      listar();
    }
  }, [listar, pathname]);

  const handleSearch = useCallback(async (consulta, pagina = page) => {
    consultaValues.current = consulta;
    const resposta = await get(`/marca/consulta?descricao=${consulta}&limite=100&pagina=${pagina}`) as any;
    if (resposta) {
      setMarcas(resposta as ListaMarcas);
    }
  }, [get, page]);

  const handlePageChange = useCallback((event, value: number) => {
    setPage(value);
    if (consultaValues.current) {
      handleSearch(consultaValues.current, value)
    }
  }, [handleSearch]);

  return (
    <Dialogo open fullWidth maxWidth="xs" title="Marcas">
      <FormConsultaMarca onSubmit={handleSearch} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemMarcas marcas={marcas.marcas} />
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(marcas.total)/100)} onChange={handlePageChange} page={page} />
      </Box>
      <Link to="marcas/inserirmarca" >
        <BotaoInserir titulo="Inserir marca" />
      </Link>
      <Switch>
        <Route path="/marcas/inserirmarca">
          <DialogoInserirMarca />
        </Route>
        <Route path="/marcas/alterarmarca">
          <DialogAlterarMarca />
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogMarcas);