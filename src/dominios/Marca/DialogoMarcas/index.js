import React, { useState, useCallback, memo, useEffect, useContext, useMemo } from 'react';
import { Box, } from '@material-ui/core';
import Dialogo from '../../../componentes/Dialogo';
import { useLocation, Link } from 'react-router-dom';
import ApiContext from '../../../contexts/ApiContext';
import useAuth from '../../../hooks/useAuth';
import DialogoInserirMarca from '../DialogoInserirMarca';
import DialogoAlterarMarca from '../DialogoAlterarMarca';
import Listagem from '../ListagemMarcas';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';


function DialgoMarcas() {
  const { idOficina } = useAuth();
  const [marcas, setMarcas] = useState([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const marcas = await get(`/marca?idOficina=${idOficina}`);
    if (marcas) {
      setMarcas(marcas);
    }
  }, [get, idOficina]);

  useEffect(() => {
    if (pathname === "/marcas") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta }) => {
    const marcas = await get(`/marca/descricao?idOficina=${idOficina}&descricao=${consulta}`);
    if (marcas) {
      setMarcas(marcas);
    }
  }, [get, idOficina]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta aoEnviar={manipularBusca}/>
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <Listagem marcas={marcas} />
      <BotaoInserir titulo="Inserir marca" component={Link} to="marcas/inserir"/>
    </>
  ), [manipularBusca, marcas])

  return (
    <Dialogo aberto fullWidth maxWidth="xs" titulo="Marcas">
      {conteudo}
      <DialogoInserirMarca aberto={pathname === "/marcas/inserir"} />
      <DialogoAlterarMarca aberto={pathname === "/marcas/alterar"} />
    </Dialogo>
  );
}

export default memo(DialgoMarcas);