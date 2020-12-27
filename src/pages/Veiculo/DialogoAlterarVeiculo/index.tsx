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
import DialogoIncluirModelo from '../../Modelo/DialogoIncluirModelo';
import DialogoIncluirCliente from '../../Cliente/DialogoIncluirCliente';
import AutoCompleteModelo from '../../../componentes/AutoComplete/AutoCompleteModelo';
import AutoCompleteCliente from '../../../componentes/AutoComplete/AutoCompleteCliente';

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
      setVeiculo(resposta);
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
        <AutoCompleteModelo name="modelo" label="Modelo" required listOptionsIn/>
        <Link to={`${path}/incluirmodelo`}>
          <Tooltip title="incluir modelo">
            <IconButton>
              <CreateNewFolderIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
      <AutoCompleteCliente name="cliente" label="Cliente" required listOptionsIn/>
        <Link to={`${path}/incluircliente`}>
          <Tooltip title="incluir cliente">
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
        <Route path={`${url}/incluirmodelo`} component={DialogoIncluirModelo} />
        <Route path={`${url}/incluircliente`} component={DialogoIncluirCliente} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogAlterarVeiculo);