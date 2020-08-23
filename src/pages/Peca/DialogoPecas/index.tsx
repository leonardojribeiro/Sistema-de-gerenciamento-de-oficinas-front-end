import React, { useState, useContext, useCallback, useEffect } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box, } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Switch, Route } from 'react-router-dom';
import DialogoInserirPeca from '../DialogoInserirPeca';
import DialogoAlterarPeca from '../DialogoAlterarPeca';
import ListagemPeca from '../ListagemPecas';
import { useMemo } from 'react';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import Peca from '../../../Types/Peca';


const DialogoPecas: React.FC = () => {
  const [pecas, setPecas] = useState<Peca[]>([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();
  const filtros = ["Descricao", "Marca"]

  const listar = useCallback(async () => {
    const pecas = await get("/peca") as Peca[];
    if (pecas) {
      setPecas(pecas);
    }
  }, [get,]);

  useEffect(() => {
    if (pathname === "/pecas") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta, tipo }) => {
    const pecas = await get(`/peca/consulta?consulta=${consulta}&tipo=${tipo}`) as Peca[];
    if (pecas) {
      setPecas(pecas);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta onSubmit={manipularBusca} filtros={filtros} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemPeca pecas={pecas} />
      <BotaoInserir titulo="Inserir peça" linkTo="/pecas/inserir" />
    </>
  ), [filtros, manipularBusca, pecas])


  return (
    <Dialogo maxWidth="sm" fullWidth open title="Peças">
      {conteudo}
      <Switch>
        <Route path="/pecas/inserir" component={DialogoInserirPeca} />
        <Route path="/pecas/alterar" component={DialogoAlterarPeca} />
      </Switch>
    </Dialogo>
  );
}

export default DialogoPecas;