import React, { useContext, useCallback, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, useRouteMatch, useLocation, Link, Switch, Route } from 'react-router-dom';
import { DialogActions, Button, Box, Tooltip, IconButton, } from '@material-ui/core';
import { Form, CampoDeTexto, DateField, } from '../../../componentes/Form';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DialogoIncluirModelo from '../../Modelo/DialogoIncluirModelo';
import DialogoIncluirCliente from '../../Cliente/DialogoIncluirCliente';
import AutoCompleteModelo from '../../../componentes/AutoComplete/AutoCompleteModelo';
import AutoCompleteCliente from '../../../componentes/AutoComplete/AutoCompleteCliente';


const DialogoIncluirVeiculo: React.FC = () => {
  const { post, } = useContext(ApiContext);
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  const manipularEnvio = useCallback(async (veiculo) => {
    if (veiculo) {
      const resposta = await post("/veiculo", veiculo);
      if (resposta) {
        history.goBack();
      }
    }
  }, [history, post]);

  return (
    <Dialogo open title="Incluir veículo" maxWidth="sm" fullWidth>
      <Form onSubmit={manipularEnvio}>
        <CampoDeTexto name="placa" label="Placa" fullWidth required autoFocus />
        <DateField name="anoFabricacao" label="Ano de fabricação" fullWidth required views={["year"]} format="yyyy" />
        <DateField name="anoModelo" label="Ano de modelo" fullWidth required views={["year"]} format="yyyy" />
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <AutoCompleteModelo name="modelo" label="Modelo" required listOptionsIn={pathname.endsWith("incluirveiculo")} />
          <Link to={`${path}/incluirmodelo`}>
            <Tooltip title="Incluir modelo">
              <IconButton>
                <CreateNewFolderIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <AutoCompleteCliente name="cliente" label="Cliente"  listOptionsIn={pathname.endsWith("incluirveiculo")} />
          <Link to={`${path}/incluircliente`}>
            <Tooltip title="Incluir cliente">
              <IconButton>
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <DialogActions >
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
      <Switch>
        <Route path={`${url}/incluirmodelo`} component={DialogoIncluirModelo} />
        <Route path={`${url}/incluircliente`} component={DialogoIncluirCliente} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoIncluirVeiculo);