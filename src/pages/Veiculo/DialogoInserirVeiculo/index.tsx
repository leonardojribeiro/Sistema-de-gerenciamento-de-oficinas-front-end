import React, { useContext, useCallback, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, useRouteMatch, useLocation, Link, Switch, Route } from 'react-router-dom';
import { DialogActions, Button, Box, Tooltip, IconButton, } from '@material-ui/core';
import { Form, CampoDeTexto, DateField, } from '../../../componentes/Form';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DialogoInserirModelo from '../../Modelo/DialogoInserirModelo';
import DialogoInserirCliente from '../../Cliente/DialogoInserirCliente';
import AutoCompleteModelo from '../../../componentes/ComboBox/AutoCompleteModelo';
import AutoCompleteCliente from '../../../componentes/ComboBox/AutoCompleteCliente';


const DialogoInserirVeiculo: React.FC = () => {
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
    <Dialogo open title="Inserir veículo" maxWidth="sm" fullWidth>
      <Form onSubmit={manipularEnvio}>
        <CampoDeTexto name="placa" label="Placa" fullWidth required autoFocus />
        <DateField name="anoFabricacao" label="Ano de fabricação" fullWidth required views={["year"]} format="yyyy" />
        <DateField name="anoModelo" label="Ano de modelo" fullWidth required views={["year"]} format="yyyy" />
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <AutoCompleteModelo name="modelo" label="Modelo" required listOptionsIn />
          <Link to={`${path}/inserirmodelo`}>
            <Tooltip title="Inserir modelo">
              <IconButton>
                <CreateNewFolderIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <AutoCompleteCliente name="cliente" label="Cliente" listOptionsIn />
          <Link to={`${path}/inserircliente`}>
            <Tooltip title="Inserir cliente">
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
        <Route path={`${url}/inserirmodelo`} component={DialogoInserirModelo} />
        <Route path={`${url}/inserircliente`} component={DialogoInserirCliente} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoInserirVeiculo);