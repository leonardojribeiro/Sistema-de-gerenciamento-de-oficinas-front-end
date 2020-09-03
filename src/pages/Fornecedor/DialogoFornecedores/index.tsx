import React, { useCallback, useEffect, useState, useContext, useMemo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box, } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Switch, Route } from 'react-router-dom';
import DialogoInserirCliente from '../DialogoInserirFornecedor';
import ListagemFornecedores from '../ListagemFornecedores';
import DialogoAlterarCilente from '../DialogoAlterarFornecedor';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import Fornecedor from '../../../Types/Fornecedor';

const DialogoFornecedores: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const fornecedores = await get("/fornecedor") as Fornecedor[];
    if (fornecedores) {
      setFornecedores(fornecedores);
    }
  }, [get]);

  useEffect(() => {
    if (pathname === "/fornecedores") {
      document.title = "Fornecedores"
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta, tipo }) => {
    const fornecedores = await get(`/cliente/consulta?consulta=${consulta}&tipo=${tipo}`) as Fornecedor[];
    if (fornecedores) {
      setFornecedores(fornecedores);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemFornecedores fornecedores={fornecedores} />
      <BotaoInserir titulo="Inserir fornecedor" linkTo="fornecedores/inserirfornecedor" />
    </>
  ), [fornecedores, manipularBusca])


  return (
    <Dialogo maxWidth="lg" fullWidth open title="Fornecedores">
      {conteudo}
      <Switch>
        <Route path="/fornecedores/inserirfornecedor" component={DialogoInserirCliente} />
        <Route path="/fornecedores/alterarfornecedor" component={DialogoAlterarCilente} />
      </Switch>
    </Dialogo>
  );
}

export default DialogoFornecedores;