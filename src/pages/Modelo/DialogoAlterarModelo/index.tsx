import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, useRouteMatch, useLocation, Switch, Route, Link } from 'react-router-dom';
import { DialogActions, Button, Box, Tooltip, IconButton } from '@material-ui/core';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { useMemo } from 'react';
import comparar from '../../../recursos/Comparar';
import { Form, CampoDeTexto } from '../../../componentes/Form';
import Modelo from '../../../Types/Modelo';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DialogInserirMarca from '../../Marca/DialogInserirMarca';
import AutoCompleteMarca from '../../../componentes/ComboBox/AutoCompleteMarca';

const DialogoAlterarModelo: React.FC = () => {
  const { get, put } = useContext(ApiContext);
  const history = useHistory();
  const [modelo, setModelo] = useState<Modelo | undefined>();
  const refAlerta = useRef<AlertaHandles>();
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  const manipularEnvio = useCallback(async (modeloASerAlterado) => {
    if (modeloASerAlterado && modelo) {
      if (!comparar(modelo, modeloASerAlterado)) {
        modeloASerAlterado._id = modelo._id
        const resposta = await put("/modelo", modeloASerAlterado);
        if (resposta) {
          history.goBack();
        }
      }
      else {
        if (refAlerta.current) {
          refAlerta.current.setTipo("warning");
          refAlerta.current.setMensagem("Nenhuma alteração foi efetuada.");
          refAlerta.current.setAberto(true);
        }
      }
    }
  }, [history, modelo, put]);

  const id = useQuery("id");

  const popular = useCallback(async () => {
    const resposta = await get(`/modelo/id?_id=${id}`) as Modelo;
    if (resposta) {
      setModelo(resposta)
    }
  }, [get, id]);


  useEffect(() => {
    if (pathname.endsWith("alterarmodelo")) {
      popular()
    }
  }, [pathname, popular]);

  const conteudo = useMemo(() => (
    <Form onSubmit={manipularEnvio} initialData={modelo}>
      <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
        <AutoCompleteMarca name="marca" label="Marca" required listOptionsIn={pathname.endsWith("alterarmodelo")}/>
        <Link to={`${path}/inserirmarca`}>
          <Tooltip title="Inserir marca">
            <IconButton>
              <CreateNewFolderIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>
      <DialogActions >
        <Button type="submit">Salvar</Button>
      </DialogActions>
    </Form>
  ), [manipularEnvio, modelo, path, pathname])

  return (
    <Dialogo open title="Alterar modelo" maxWidth="xs" fullWidth>
      {conteudo}
      <Alerta ref={refAlerta} />
      <Switch>
        <Route path={`${url}/inserirmarca`} component={DialogInserirMarca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoAlterarModelo);