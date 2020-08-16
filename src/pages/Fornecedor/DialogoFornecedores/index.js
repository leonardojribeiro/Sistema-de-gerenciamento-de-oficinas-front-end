import React, { useCallback, useEffect, useState, useContext, useMemo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Box,} from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Link } from 'react-router-dom';
import DialogoInserirCliente from '../DialogoInserirFornecedor';
import ListagemFornecedores from '../ListagemFornecedores';
import DialogoAlterarCilente from '../DialogoAlterarFornecedor';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';

function DialogoFornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const fornecedores = await get("/fornecedor");
    if (fornecedores) {
      setFornecedores(fornecedores);
    }
  }, [get]);

  useEffect(() => {
    if (pathname === "/fornecedores") {
      document.title = "Fornecedores"
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta, tipo }) => {
    const modelos = await get(`/cliente/consulta?consulta=${consulta}&tipo=${tipo}`);
    if (modelos) {
      setFornecedores(modelos);
    }
  }, [get,]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta aoEnviar={manipularBusca}/>
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemFornecedores fornecedores={fornecedores}/>
      <BotaoInserir titulo="Inserir fornecedor" component={Link} to="fornecedores/inserir"/>
    </>
  ), [fornecedores, manipularBusca])


  return (
    <Dialogo maxWidth="md" fullWidth aberto titulo="Fornecedor">
      {conteudo}
      <DialogoInserirCliente aberto={pathname === "/fornecedores/inserir"}/>
      <DialogoAlterarCilente aberto={pathname === "/fornecedores/alterar"} />
    </Dialogo>
  );
}

export default DialogoFornecedores;