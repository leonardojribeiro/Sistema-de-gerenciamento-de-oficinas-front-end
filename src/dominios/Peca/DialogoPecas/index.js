import React, { useState, useContext, useCallback, useEffect } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import { Box, } from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import ApiContext from '../../../contexts/ApiContext';
import { Link, useLocation } from 'react-router-dom';
import DialogoInserirPeca from '../DialogoInserirPeca';
import DialogoAlterarPeca from '../DialogoAlterarPeca';
import ListagemPeca from '../ListagemPecas';
import { useMemo } from 'react';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';


function DialogoPecas() {
  const { idOficina } = useAuth();
  const [pecas, setPecas] = useState([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();
  const filtros = ["Descricao", "Marca"]
  const listar = useCallback(async () => {
    const pecas = await get(`/peca?idOficina=${idOficina}`);
    if (pecas) {
      setPecas(pecas);
    }
  }, [get, idOficina]);

  useEffect(() => {
    if (pathname === "/pecas") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta, tipo }) => {
    const pecas = await get(`/peca/consulta?idOficina=${idOficina}&consulta=${consulta}&tipo=${tipo}`);
    if (pecas) {
      setPecas(pecas);
    }
  }, [get, idOficina]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta aoEnviar={manipularBusca} filtros={filtros}/>
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemPeca pecas={pecas} />
      <BotaoInserir titulo="Inserir peça" component={Link} to="/pecas/inserir" />
    </>
  ), [filtros, manipularBusca, pecas])


  return (
    <Dialogo maxWidth="sm" fullWidth aberto titulo="Peças">
      {conteudo}
      <DialogoInserirPeca aberto={pathname === "/pecas/inserir"} />
      <DialogoAlterarPeca aberto={pathname === "/pecas/alterar"} />
    </Dialogo>
  );
}

export default DialogoPecas;