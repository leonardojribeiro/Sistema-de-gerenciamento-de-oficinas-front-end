import React, { useCallback, useEffect, useState, useContext, useMemo } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import { Box,} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Link } from 'react-router-dom';
import DialogoInserirCliente from '../DialogoInserirCliente';
import ListagemClientes from '../ListagemClientes';
import DialogoAlterarCilente from '../DialogoAlterarCliente';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';

function DialogoClientes() {
  const { idOficina } = useAuth();
  const [clientes, setClientes] = useState([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const clientes = await get(`/cliente?idOficina=${idOficina}`);
    if (clientes) {
      setClientes(clientes);
    }
  }, [get, idOficina]);

  useEffect(() => {
    if (pathname === "/clientes") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta, tipo }) => {
    const modelos = await get(`/cliente/consulta?idOficina=${idOficina}&consulta=${consulta}&tipo=${tipo}`);
    if (modelos) {
      setClientes(modelos);
    }
  }, [get, idOficina]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta aoEnviar={manipularBusca}/>
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemClientes clientes={clientes}/>
      <BotaoInserir titulo="Inserir cliente" component={Link} to="clientes/inserir"/>
    </>
  ), [clientes, manipularBusca])


  return (
    <Dialogo maxWidth="lg" fullWidth aberto titulo="Clientes">
      {conteudo}
      <DialogoInserirCliente aberto={pathname === "/clientes/inserir"}/>
      <DialogoAlterarCilente aberto={pathname === "/clientes/alterar"} />
    </Dialogo>
  );
}

export default DialogoClientes;