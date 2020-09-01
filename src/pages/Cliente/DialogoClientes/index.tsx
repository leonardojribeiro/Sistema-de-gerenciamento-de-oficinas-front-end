import React, { useCallback, useEffect, useState, useContext, useMemo, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box, } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Switch, Route } from 'react-router-dom';
import DialogoInserirCliente from '../DialogoInserirCliente';
import ListagemClientes from '../ListagemClientes';
import DialogoAlterarCliente from '../DialogoAlterarCliente';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import Cliente from '../../../Types/Cliente';

const DialogoClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const clientes = await get("/cliente") as Cliente[];
    if (clientes) {
      setClientes(clientes);
    }
  }, [get,]);

  useEffect(() => {
    if (pathname === "/clientes") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta, tipo }) => {
    const clientes = await get(`/cliente/consulta?consulta=${consulta}&tipo=${tipo}`) as Cliente[];
    if (clientes) {
      setClientes(clientes);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemClientes clientes={clientes} />
      <BotaoInserir titulo="Inserir cliente" linkTo="clientes/inserircliente" />
    </>
  ), [clientes, manipularBusca])


  return (
    <Dialogo maxWidth="lg" fullWidth open title="Clientes">
      {conteudo}
      <Switch>
        <Route path="/clientes/inserircliente" component={DialogoInserirCliente}/>
        <Route path="/clientes/alterarcliente" component={DialogoAlterarCliente}/>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoClientes);