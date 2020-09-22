import React, { useContext, useCallback, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import { DialogActions, Button, Box, Tooltip, IconButton } from '@material-ui/core';
import { Form, CampoDeTexto, } from '../../../componentes/Form';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DialogInserirMarca from '../../Marca/DialogInserirMarca';
import AutoCompleteMarca from '../../../componentes/AutoComplete/AutoCompleteMarca';

const DialogoInserirPeca: React.FC = () => {
  const { post } = useContext(ApiContext);
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const manipularEnvio = useCallback(async (peca) => {
    if (peca) {
      const resposta = await post("/peca", peca);
      if (resposta) {
        history.goBack();
      }
    }
  }, [history, post]);

  return (
    <Dialogo open title="Inserir peça" fullWidth maxWidth="xs">
      <Form onSubmit={manipularEnvio}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <AutoCompleteMarca name="marca" label="Marca" required listOptionsIn/>
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
      <Switch>
        <Route path={`${url}/inserirmarca`} component={DialogInserirMarca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoInserirPeca);