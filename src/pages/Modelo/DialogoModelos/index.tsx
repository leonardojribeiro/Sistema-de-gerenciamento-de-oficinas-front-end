import React, { useState, useContext, useCallback, useEffect, useMemo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box,} from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation,  Switch, Route } from 'react-router-dom';
import DialogoInserirModelo from '../DialogoInserirModelo';
import DialogoAlterarModelo from '../DialogoAlterarModelo';
import ListagemModelos from '../ListagemModelos';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import Modelo from '../../../Types/Modelo';

const DialogoModelos: React.FC = () => {
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();
  const filtros = ["Descrição", "Marca"]
  const listar = useCallback(async () => {
    const modelos = await get(`/modelo`) as Modelo[];
    if (modelos) {
      setModelos(modelos);
    }
  }, [get,]);

  useEffect(() => {
    if (pathname === "/modelos") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta, tipo }) => {
    const modelos = await get(`/modelo/consulta?consulta=${consulta}&tipo=${tipo}`) as Modelo[];
    if (modelos) {
      setModelos(modelos);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta onSubmit={manipularBusca} filtros={filtros}/>
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemModelos modelos={modelos} />
      <BotaoInserir titulo="Inserir modelo" linkTo="modelos/inserirmodelo" />
    </>
  ), [filtros, manipularBusca, modelos])


  return (
    <Dialogo maxWidth="sm" fullWidth open title="Modelos">
      {conteudo}
      <Switch>
        <Route path="/modelos/inserirmodelo" component={DialogoInserirModelo} />
        <Route path="/modelos/alterarmodelo" component={DialogoAlterarModelo} />
      </Switch>
    </Dialogo>
  );
}

export default DialogoModelos;