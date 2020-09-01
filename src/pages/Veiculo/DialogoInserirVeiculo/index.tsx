import React, { useContext, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, useRouteMatch, useLocation, Link, Switch, Route } from 'react-router-dom';
import { DialogActions, Button, MenuItem, Box, Tooltip, IconButton, } from '@material-ui/core';
import { useState } from 'react';
import { Form, CampoDeTexto, DateField, CampoDeSelecao } from '../../../componentes/Form';
import Modelo from '../../../Types/Modelo';
import Cliente from '../../../Types/Cliente';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DialogoInserirModelo from '../../Modelo/DialogoInserirModelo';
import DialogoInserirCliente from '../../Cliente/DialogoInserirCliente';


const DialogoInserirVeiculo: React.FC = () => {
  const { get, post, } = useContext(ApiContext);
  const history = useHistory();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
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

  const listarClientes = useCallback(async () => {
    const cliente = await get("/cliente") as Cliente[];
    if (cliente) {
      setClientes(cliente);
    }
  }, [get]);

  const listarModelos = useCallback(async () => {
    const modelos = await get("/modelo") as Modelo[];
    if (modelos) {
      setModelos(modelos);
    }
  }, [get,]);

  useEffect(() => {
    if (pathname.endsWith("inserirveiculo")) {
      listarClientes();
      listarModelos();
    }
  }, [listarClientes, listarModelos, pathname]);

  return (
    <Dialogo open title="Inserir veículo" maxWidth="sm" fullWidth>
      <Form onSubmit={manipularEnvio}>
        <CampoDeTexto name="placa" label="Placa" fullWidth required autoFocus />
        <DateField name="anoFabricacao" label="Ano de fabricação" fullWidth required views={["year"]} format="yyyy" />
        <DateField name="anoModelo" label="Ano de modelo" fullWidth required views={["year"]} format="yyyy" />
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <CampoDeSelecao name="modelo" label="Modelo" required fullWidth>
            {
              modelos.map((modelo, indice) => <MenuItem key={indice} value={modelo._id}>{modelo.descricao}</MenuItem>)
            }
          </CampoDeSelecao>
          <Link to={`${path}/inserirmodelo`}>
            <Tooltip title="Inserir modelo">
              <IconButton>
                <CreateNewFolderIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <CampoDeSelecao name="cliente" label="Cliente" required fullWidth >
            {
              clientes.map((cliente, indice) => <MenuItem key={indice} value={cliente._id}>{cliente.nome}</MenuItem>)
            }
          </CampoDeSelecao>
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