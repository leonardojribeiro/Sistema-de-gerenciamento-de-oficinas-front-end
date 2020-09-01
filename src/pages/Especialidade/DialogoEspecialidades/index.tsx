import React, { useState, useCallback, memo, useEffect, useContext, useMemo } from 'react';
import { Box, } from '@material-ui/core';
import Dialogo from '../../../componentes/Dialog';
import { useLocation, Switch, Route, } from 'react-router-dom';
import ApiContext from '../../../contexts/ApiContext';
import DialogoInserirEspecialidade from '../DialogoInserirEspecialidade';
import DialogAlterarEspecialidade from '../DialogoAlterarEspecialidade';
import ListagemEspecialidades from '../ListagemEspecialidades';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import Especialidade from '../../../Types/Especialidade';


function DialgoEspecialidades() {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const especialidades = await get("/especialidade") as Especialidade[];
    if (especialidades) {
      setEspecialidades(especialidades);
    }
  }, [get,]);

  useEffect(() => {
    if (pathname === "/especialidades") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta }) => {
    const especialidades = await get(`/especialidade/descricao?descricao=${consulta}`) as Especialidade[];
    if (especialidades) {
      setEspecialidades(especialidades);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemEspecialidades especialidades={especialidades} />
      <BotaoInserir titulo="Inserir especialidade" linkTo="especialidades/inserirespecialidade" />
    </>
  ), [manipularBusca, especialidades])

  return (
    <Dialogo open fullWidth maxWidth="xs" title="Especialidades">
      {conteudo}
      <Switch>
        <Route path="/especialidades/inserirespecialidade" component={DialogoInserirEspecialidade} />
        <Route path="/especialidades/alterarespecialidade" component={DialogAlterarEspecialidade} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialgoEspecialidades);