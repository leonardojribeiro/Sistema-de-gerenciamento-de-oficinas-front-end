import React, { useState, useContext, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box, } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Switch, Route } from 'react-router-dom';
import { useMemo } from 'react';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import Servico from '../../../Types/Servico';
import DialogInserirServico from '../DialogInserirServico';
import ListagemServicos from '../ListagemServicos';
import DialogAlterarServico from '../DialogAlterarServico';


const DialogServicos: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[] | undefined>(undefined);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const servicos = await get("/servico") as Servico[];
    if (servicos) {
      setServicos(servicos);
    }
  }, [get,]);

  useEffect(() => {
    if (pathname === "/servicos") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta, tipo }) => {
    const servicos = await get(`/servico/consulta?consulta=${consulta}&tipo=${tipo}`) as Servico[];
    if (servicos) {
      setServicos(servicos);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemServicos servicos={servicos} />
      <BotaoInserir titulo="Inserir serviços" linkTo="/servicos/inserir" />
    </>
  ), [manipularBusca, servicos])


  return (
    <Dialogo maxWidth="sm" fullWidth open title="Serviços">
      {conteudo}
      <Switch>
        <Route path="/servicos/inserir">
          <DialogInserirServico/>
        </Route>
        <Route path="/servicos/alterar">
          <DialogAlterarServico/>
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogServicos);