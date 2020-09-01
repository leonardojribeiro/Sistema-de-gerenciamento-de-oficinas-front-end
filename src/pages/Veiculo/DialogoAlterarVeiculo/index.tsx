import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, Link, useRouteMatch, Switch, Route, useLocation } from 'react-router-dom';
import { DialogActions, Button, MenuItem, Box, Tooltip, IconButton, } from '@material-ui/core';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { useMemo } from 'react';
import { Form, CampoDeTexto, CampoDeSelecao, DateField } from '../../../componentes/Form';
import comparar from '../../../recursos/Comparar';
import Cliente from '../../../Types/Cliente';
import Modelo from '../../../Types/Modelo';
import Veiculo from '../../../Types/Veiculo';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DialogoInserirModelo from '../../Modelo/DialogoInserirModelo';
import DialogoInserirCliente from '../../Cliente/DialogoInserirCliente';

const DialogAlterarVeiculo: React.FC = () => {
  const { get, put } = useContext(ApiContext);
  const history = useHistory();
  const [veiculo, setVeiculo] = useState<Veiculo | undefined>();
  const refAlerta = useRef<AlertaHandles>();
  const id = useQuery("id");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  const manipularEnvio = useCallback(async (veiculoASerAlterado) => {
    if (veiculoASerAlterado && veiculo) {
      if (!comparar(veiculo, veiculoASerAlterado)) {
        veiculoASerAlterado._id = veiculo._id
        const resposta = await put("/veiculo", veiculoASerAlterado);
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
  }, [history, veiculo, put]);


  const popular = useCallback(async () => {
    const resposta = await get(`/veiculo/id?_id=${id}`) as Veiculo;
    if (resposta) {
      setVeiculo(resposta)
    }
  }, [get, id,]);

  const listarClientes = useCallback(async () => {
    const cliente = await get("/cliente") as Cliente[];
    if (cliente) {
      setClientes(cliente);
    }
  }, [get,]);

  const listarModelos = useCallback(async () => {
    const modelos = await get("/modelo") as Modelo[];
    if (modelos) {
      setModelos(modelos);
    }
  }, [get,]);

  useEffect(() => {
    if (pathname.endsWith("alterarveiculo")) {
      listarClientes();
      listarModelos();
      popular();
    }
  }, [listarClientes, listarModelos, pathname, popular]);

  const conteudo = useMemo(() => (
    <Form onSubmit={manipularEnvio} initialData={veiculo}>
      <CampoDeTexto name="placa" label="Placa" fullWidth required autoFocus />
      <DateField name="anoFabricacao" label="Ano de fabricação" fullWidth required />
      <DateField name="anoModelo" label="Ano de modelo" fullWidth required />
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
  ), [clientes, manipularEnvio, modelos, path, veiculo])

  return (
    <Dialogo open title="Alterar veículo" fullWidth maxWidth="sm">
      {conteudo}
      <Alerta ref={refAlerta} />
      <Switch>
        <Route path={`${url}/inserirmodelo`} component={DialogoInserirModelo} />
        <Route path={`${url}/inserircliente`} component={DialogoInserirCliente} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogAlterarVeiculo);