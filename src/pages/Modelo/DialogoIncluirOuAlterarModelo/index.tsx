import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, useRouteMatch, Switch, Route, Link } from 'react-router-dom';
import { Box, Tooltip, IconButton } from '@material-ui/core';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import comparar from '../../../recursos/Comparar';
import { Form, CampoDeTexto } from '../../../componentes/Form';
import Modelo from '../../../Types/Modelo';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DialogoIncluirOuAlterarMarca from '../../Marca/DialogoIncluirOuAlterarMarca';
import AutoCompleteMarca from '../../../componentes/AutoComplete/AutoCompleteMarca';
import BotaoIncluirOuAlterar from '../../../componentes/BotaoIncluirOuAlterar';

const DialogoIncluirOuAlterarModelo: React.FC = () => {
  const { get, put, post } = useContext(ApiContext);
  const history = useHistory();
  const [modelo, setModelo] = useState<Modelo | undefined>();
  const refAlerta = useRef<AlertaHandles>();
  const { path, url } = useRouteMatch();
  const id = useQuery("id");
  const isEdit = id !== null;

  const manipularEnvio = useCallback(async (modeloASerAlterado) => {
    if (isEdit) {
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
    }
    else {
      const resposta = await post("/modelo", modeloASerAlterado);
      if (resposta) {
        history.goBack();
      }
    }
  }, [history, isEdit, modelo, post, put]);

  const popular = useCallback(async () => {
    const resposta = await get(`/modelo/id?_id=${id}`) as Modelo;
    if (resposta) {
      setModelo(resposta)
    }
  }, [get, id]);


  useEffect(() => {
    if (isEdit) {
      popular()
    }
  }, [isEdit, popular]);

  return (
    <Dialogo open title={isEdit ? "Alterar modelo" : "Incluir modelo"} maxWidth="xs" fullWidth>
      <Form onSubmit={manipularEnvio} initialData={modelo}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <AutoCompleteMarca name="marca" label="Marca" required listOptionsIn={isEdit} />
          <Link to={`${path}/incluirmarca`}>
            <Tooltip title="Incluir marca">
              <IconButton>
                <CreateNewFolderIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <BotaoIncluirOuAlterar isEdit={isEdit} />
      </Form>
      <Alerta ref={refAlerta} />
      <Switch>
        <Route path={`${url}/incluirmarca`} component={DialogoIncluirOuAlterarMarca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoIncluirOuAlterarModelo);