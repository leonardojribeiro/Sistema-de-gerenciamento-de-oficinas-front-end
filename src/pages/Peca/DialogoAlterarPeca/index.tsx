import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, Link, Route, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import { DialogActions, Button, Box, Tooltip, IconButton } from '@material-ui/core';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { useMemo } from 'react';
import { Form, CampoDeTexto } from '../../../componentes/Form';
import Peca from '../../../Types/Peca';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DialogoIncluirMarca from '../../Marca/DialogoIncluirMarca';
import AutoCompleteMarca from '../../../componentes/AutoComplete/AutoCompleteMarca';

const DialogoAlterarModelo: React.FC = () => {
  const { get, put } = useContext(ApiContext);
  const history = useHistory();
  const [peca, setPeca] = useState<Peca | undefined>();
  const refAlerta = useRef<AlertaHandles>();
  const id = useQuery("id");
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  const manipularEnvio = useCallback(async (pecaASerAlterada) => {
    if (pecaASerAlterada && peca) {
      if (!(pecaASerAlterada.descricao === peca.descricao) || !(pecaASerAlterada.marca === peca.marca)) {
        pecaASerAlterada._id = peca._id;
        const resposta = await put("/peca", pecaASerAlterada);
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
  }, [history, peca, put]);


  const popular = useCallback(async () => {
    const resposta = await get(`/peca/id?_id=${id}`) as Peca;
    if (resposta) {
      setPeca(resposta)
    }
  }, [get, id,]);

  useEffect(() => {
    if (pathname.endsWith("alterarpeca")) {
      popular();
    }
  }, [popular, pathname])

  const conteudo = useMemo(() => (
    <Form onSubmit={manipularEnvio} initialData={peca}>
      <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
        <AutoCompleteMarca label="Marca" name="marca" required listOptionsIn/>
        <Link to={`${path}/incluirmarca`}>
          <Tooltip title="incluir marca">
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
  ), [manipularEnvio, path, peca])

  return (
    <Dialogo open title="Alterar peça" fullWidth maxWidth="xs">
      {conteudo}
      <Alerta ref={refAlerta} />
      <Switch>
        <Route path={`${url}/incluirmarca`} component={DialogoIncluirMarca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoAlterarModelo);