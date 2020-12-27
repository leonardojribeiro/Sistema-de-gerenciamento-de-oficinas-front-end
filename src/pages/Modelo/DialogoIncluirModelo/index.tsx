import React, { useContext, useCallback, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, useRouteMatch, Switch, Route, Link, } from 'react-router-dom';
import { DialogActions, Button, IconButton, Tooltip, Box } from '@material-ui/core';
import { Form, CampoDeTexto } from '../../../componentes/Form';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DialogoIncluirMarca from '../../Marca/DialogoIncluirMarca';
import AutoCompleteMarca from '../../../componentes/AutoComplete/AutoCompleteMarca';

const DialogoIncluirModelo: React.FC = () => {
  const { post } = useContext(ApiContext);
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const manipularEnvio = useCallback(async (modelo) => {
    if (modelo) {
      console.log(modelo)
      const resposta = await post("/modelo", modelo);
      if (resposta) {
        history.goBack();
      }
    }
  }, [history, post]);

  return (
    <Dialogo open title="incluir modelo" maxWidth="xs" fullWidth>
      <Form onSubmit={manipularEnvio}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <AutoCompleteMarca name="marca" label="Marca" required listOptionsIn/>
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
      <Switch>
        <Route path={`${url}/incluirmarca`} component={DialogoIncluirMarca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoIncluirModelo);