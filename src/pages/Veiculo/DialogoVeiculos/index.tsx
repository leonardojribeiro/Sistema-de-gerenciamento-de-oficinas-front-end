import React, { useState, useContext, useCallback, useEffect } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box, } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Switch, Route } from 'react-router-dom';
import DialogoInserirVeiculo from '../DialogoInserirVeiculo';
import DialogAlterarVeiculo from '../DialogoAlterarVeiculo';
import ListagemVeiculos from '../ListagemVeiculos';
import { useMemo } from 'react';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import Veiculo from '../../../Types/Veiculo';


const DialogoVeiculos: React.FC = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const veiculos = await get("/veiculo") as Veiculo[];
    if (veiculos) {
      setVeiculos(veiculos);
    }
  }, [get,]);

  useEffect(() => {
    if (pathname === "/veiculos") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta, tipo }) => {
    const pecas = await get(`/peca/consulta?consulta=${consulta}&tipo=${tipo}`) as Veiculo[];
    if (pecas) {
      setVeiculos(pecas);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemVeiculos veiculos={veiculos} />
      <BotaoInserir titulo="Inserir veiculo" linkTo="/veiculos/inserirveiculo" />
    </>
  ), [manipularBusca, veiculos])

  return (
    <Dialogo maxWidth="sm" fullWidth open title="Veículos">
      {conteudo}
      <Switch>
        <Route path="/veiculos/inserirveiculo" component={DialogoInserirVeiculo} />
        <Route path="/veiculos/alterarveiculo"  component={DialogAlterarVeiculo} />
      </Switch>
    </Dialogo>
  );
}

export default DialogoVeiculos;