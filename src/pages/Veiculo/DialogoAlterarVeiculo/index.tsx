import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, Link, useRouteMatch, Switch, Route, useLocation } from 'react-router-dom';
import { DialogActions, Button, Box, Tooltip, IconButton, } from '@material-ui/core';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { useMemo } from 'react';
import { Form, CampoDeTexto, DateField } from '../../../componentes/Form';
import comparar from '../../../recursos/Comparar';
import Veiculo from '../../../Types/Veiculo';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DialogoInserirModelo from '../../Modelo/DialogoInserirModelo';
import DialogoInserirCliente from '../../Cliente/DialogoInserirCliente';
import AutoCompleteModelo from '../../../componentes/ComboBox/AutoCompleteModelo';
import AutoCompleteCliente from '../../../componentes/ComboBox/AutoCompleteCliente';

const DialogAlterarVeiculo: React.FC = () => {
  const { get, put } = useContext(ApiContext);
  const history = useHistory();
  const [veiculo, setVeiculo] = useState<Veiculo | undefined>();
  const refAlerta = useRef<AlertaHandles>();
  const id = useQuery("id");
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


  useEffect(() => {
    if (pathname.endsWith("alterarveiculo")) {
      popular();
    }
  }, [pathname, popular]);

  const conteudo = useMemo(() => (
    <Form onSubmit={manipularEnvio} initialData={veiculo}>
      <CampoDeTexto name="placa" label="Placa" fullWidth required autoFocus />
      <DateField name="anoFabricacao" label="Ano de fabricação" fullWidth required />
      <DateField name="anoModelo" label="Ano de modelo" fullWidth required />
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
        <AutoCompleteModelo name="modelo" label="Modelo" required />
        <Link to={`${path}/inserirmodelo`}>
          <Tooltip title="Inserir modelo">
            <IconButton>
              <CreateNewFolderIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
      <AutoCompleteCliente name="cliente" label="Cliente" required />
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
  ), [manipularEnvio, path, veiculo])

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