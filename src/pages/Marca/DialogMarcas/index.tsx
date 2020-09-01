import React, { useState, useCallback, memo, useEffect, useContext, useMemo } from 'react';
import { Box, } from '@material-ui/core';
import Dialogo from '../../../componentes/Dialog';
import { useLocation, Link, Route, Switch } from 'react-router-dom';
import ApiContext from '../../../contexts/ApiContext';
import DialogoInserirMarca from '../DialogInserirMarca';
import DialogAlterarMarca from '../DialogAlterarMarca';
import ListagemMarcas from '../ListagemMarcas';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import Marca from '../../../Types/Marca';


const DialogMarcas: React.FC = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const marcas = await get(`/marca`);
    if (marcas) {
      setMarcas(marcas as Marca[]);
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
      setMarcas(marcas as Marca[]);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemMarcas marcas={marcas} />
      <Link to="marcas/inserirmarca" >
        <BotaoInserir titulo="Inserir marca" />
      </Link>
    </>
  ), [manipularBusca, marcas])

  return (
    <Dialogo open fullWidth maxWidth="xs" title="Marcas">
      {conteudo}
      <Switch>
        <Route path="/marcas/inserirmarca">
          <DialogoInserirMarca/>
        </Route>
        <Route path="/marcas/alterarmarca">
          <DialogAlterarMarca/>
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogMarcas);