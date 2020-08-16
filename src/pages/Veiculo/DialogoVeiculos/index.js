import React, { useState, useContext, useCallback, useEffect } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box,} from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { Link, useLocation } from 'react-router-dom';
import DialogoInserirVeiculo from '../DialogoInserirVeiculo';
import DialogoAlterarVeiculo from '../DialogoAlterarVeiculo';
import ListagemVeiculos from '../ListagemVeiculos';
import { useMemo } from 'react';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';


function DialogoVeiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const veiculos = await get("/veiculo");
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
    const pecas = await get(`/peca/consulta?consulta=${consulta}&tipo=${tipo}`);
    if (pecas) {
      setVeiculos(pecas);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta aoEnviar={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemVeiculos veiculos={veiculos} />
      <BotaoInserir titulo="Inserir veiculo" component={Link} to="veiculos/inserir"/>
    </>
  ), [manipularBusca, veiculos])

  return (
    <Dialogo maxWidth="sm" fullWidth aberto titulo="Veículos">
      {conteudo}
      <DialogoInserirVeiculo aberto={pathname === "/veiculos/inserir"} />
      <DialogoAlterarVeiculo aberto={pathname === "/veiculos/alterar"} />
    </Dialogo>
  );
}

export default DialogoVeiculos;