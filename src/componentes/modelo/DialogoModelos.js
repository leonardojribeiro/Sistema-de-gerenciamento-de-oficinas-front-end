import React, { useState, useContext, useRef, useCallback, useEffect } from 'react';
import Dialogo from '../Dialogo';
import { Box, Button } from '@material-ui/core';
import Formulario from '../Formulario/Formulario';
import CampoDeBusca from '../Formulario/Campos/CampoDeBusca';
import useAuth from '../../hooks/useAuth';
import ApiContext from '../../contexts/ApiContext';
import { Link, useLocation } from 'react-router-dom';
import DialogoInserirModelo from './DialogoInserirModelo';
import DialogoAlterarModelo from './DialogoAlterarModelo';
import { useMemo } from 'react';
import ListagemModelos from './ListagemModelos';


function DialogoModelos() {
  const { idOficina } = useAuth();
  const [modelos, setModelos] = useState([]);
  const formularioBuscaReferencia = useRef();
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const modelos = await get(`/modelo?idOficina=${idOficina}`);
    if (modelos) {
      setModelos(modelos);
    }
  }, [get, idOficina]);

  useEffect(() => {
    if (pathname === "/modelos") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ descricao }) => {
    const modelos = await get(`/modelo/descricao?idOficina=${idOficina}&descricao=${descricao}`);
    if (modelos) {
      setModelos(modelos);
    }
  }, [get, idOficina]);

  const conteudo = useMemo(() => (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Formulario ref={formularioBuscaReferencia} aoEnviar={manipularBusca}>
          <CampoDeBusca
            fullWidth
            nome="descricao"
            label="Buscar"
          />
        </Formulario>
        <Box ml={1}>
          <Button
            style={{ whiteSpace: 'nowrap' }}
            variant="outlined"
            component={Link}
            to={"/modelos/inserir"}
          >Inserir modelo</Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemModelos modelos={modelos} />
    </>
  ), [manipularBusca, modelos])


  return (
    <Dialogo aberto titulo="Modelos">
      {conteudo}
      <DialogoInserirModelo aberto={pathname === "/modelos/inserir"} />
      <DialogoAlterarModelo aberto={pathname === "/modelos/alterar"} />
    </Dialogo>
  );
}

export default DialogoModelos;