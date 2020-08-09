import React, { useState, useCallback, memo, useEffect, useContext, useMemo } from 'react';
import { Box, } from '@material-ui/core';
import Dialogo from '../../../componentes/Dialogo';
import { useLocation, Link } from 'react-router-dom';
import ApiContext from '../../../contexts/ApiContext';
import DialogoInserirMarca from '../DialogoInserirMarca';
import DialogoAlterarMarca from '../DialogoAlterarMarca';
import Listagem from '../ListagemMarcas';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';


function DialgoMarcas() {
  const [marcas, setMarcas] = useState([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const marcas = await get(`/marca`);
    if (marcas) {
      setMarcas(marcas);
    }
  }, [get,]);

  useEffect(() => {
    if (pathname === "/marcas") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta }) => {
    const marcas = await get(`/marca/descricao?descricao=${consulta}`);
    if (marcas) {
      setMarcas(marcas);
    }
  }, [get,]);

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