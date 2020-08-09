import React, { useState, useCallback, memo, useEffect, useContext, useMemo } from 'react';
import { Box, } from '@material-ui/core';
import Dialogo from '../../../componentes/Dialogo';
import { useLocation, Link } from 'react-router-dom';
import ApiContext from '../../../contexts/ApiContext';
import DialogoInserirEspecialidade from '../DialogoInserirEspecialidade';
import DialogoAlterarEspecialidade from '../DialogoAlterarEspecialidade';
import Listagem from '../ListagemEspecialidades';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';


function DialgoEspecialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const especialidades = await get("/especialidade");
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
    const especialidades = await get(`/especialidade/descricao?descricao=${consulta}`);
    if (especialidades) {
      setEspecialidades(especialidades);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta aoEnviar={manipularBusca}/>
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <Listagem especialidades={especialidades} />
      <BotaoInserir titulo="Inserir especialidade" component={Link} to="especialidades/inserir"/>
    </>
  ), [manipularBusca, especialidades])

  return (
    <Dialogo aberto fullWidth maxWidth="xs" titulo="Especialidades">
      {conteudo}
      <DialogoInserirEspecialidade aberto={pathname === "/especialidades/inserir"} />
      <DialogoAlterarEspecialidade aberto={pathname === "/especialidades/alterar"} />
    </Dialogo>
  );
}

export default memo(DialgoEspecialidades);