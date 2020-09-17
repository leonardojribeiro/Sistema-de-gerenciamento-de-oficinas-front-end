import React, { useCallback, useEffect, useState, useContext, useRef } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box, } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Switch, Route } from 'react-router-dom';
import DialogoInserirCliente from '../DialogoInserirFornecedor';
import ListagemFornecedores from '../ListagemFornecedores';
import DialogoAlterarCilente from '../DialogoAlterarFornecedor';
import BotaoInserir from '../../../componentes/BotaoInserir';
import Fornecedor from '../../../Types/Fornecedor';
import FormConsultaPessoa from '../../../componentes/FormConsultaPessoa';
import { Pagination } from '@material-ui/lab';

interface ListaFornecedores {
  fornecedores: Fornecedor[];
  total: number;
}

const DialogoFornecedores: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<ListaFornecedores>({} as ListaFornecedores);
  const [page, setPage] = useState<number>(1);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();
  const consultaValues = useRef();

  const listar = useCallback(async () => {
    if (!consultaValues.current) {
      const resposta = await get(`fornecedor?pagina=${page}&limite=20`) as ListaFornecedores;
      if (resposta) {
        setFornecedores(resposta);
      }
    }
  }, [get, page]);

  useEffect(() => {
    if (pathname === "/fornecedores") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async (dados = consultaValues.current, pagina = page) => {
    consultaValues.current = dados;
    const resposta = await get(`/fornecedor/consulta?${dados.filtro}=${dados.consulta}&limite=20&pagina=${pagina}`) as any;
    if (resposta) {
      setFornecedores(resposta);
    }
  }, [get, page]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
    if (consultaValues.current) {
      //manipularBusca(consultaValues.current, value)
    }
  }, [manipularBusca]);

  return (
    <Dialogo maxWidth="lg" fullWidth open title="Fornecedores">
      <FormConsultaPessoa onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemFornecedores fornecedores={fornecedores.fornecedores} />
      <BotaoInserir titulo="Inserir fornecedor" linkTo="fornecedores/inserirfornecedor" />
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(fornecedores.total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <Switch>
        <Route path="/fornecedores/inserirfornecedor" component={DialogoInserirCliente} />
        <Route path="/fornecedores/alterarfornecedor" component={DialogoAlterarCilente} />
      </Switch>
    </Dialogo>
  );
}

export default DialogoFornecedores;