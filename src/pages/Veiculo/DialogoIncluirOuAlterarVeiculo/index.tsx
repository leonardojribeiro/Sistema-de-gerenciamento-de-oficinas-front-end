import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, Link, useRouteMatch, Switch, Route, useLocation } from 'react-router-dom';
import { Box, Tooltip, IconButton, } from '@material-ui/core';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { Form, CampoDeTexto, DateField } from '../../../componentes/Form';
import comparar from '../../../recursos/Comparar';
import Veiculo from '../../../Types/Veiculo';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DialogoIncluirModelo from '../../Modelo/DialogoIncluirModelo';
import DialogoIncluirCliente from '../../Cliente/DialogoIncluirCliente';
import AutoCompleteModelo from '../../../componentes/AutoComplete/AutoCompleteModelo';
import AutoCompleteCliente from '../../../componentes/AutoComplete/AutoCompleteCliente';
import BotaoIncluirOuAlterar from '../../../componentes/BotaoIncluirOuAlterar';

const DialogoIncluirOuAlterarVeiculo: React.FC = () => {
  const { get, put, post } = useContext(ApiContext);
  const history = useHistory();
  const [veiculo, setVeiculo] = useState<Veiculo | undefined>();
  const refAlerta = useRef<AlertaHandles>();
  const id = useQuery("id");
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const isEdit = pathname.endsWith("alterarveiculo");

  const manipularEnvio = useCallback(async (dados) => {
    if (isEdit) {
      if (dados && veiculo) {
        if (!comparar(veiculo, dados)) {
          dados._id = veiculo._id
          const resposta = await put("/veiculo", dados);
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
      if (dados) {
        const resposta = await post("/veiculo", dados);
        if (resposta) {
          history.goBack();
        }
      }
    }
  }, [isEdit, veiculo, put, history, post]);


  const popular = useCallback(async () => {
    const resposta = await get(`/veiculo/id?_id=${id}`) as Veiculo;
    if (resposta) {
      setVeiculo(resposta);
    }
  }, [get, id,]);


  useEffect(() => {
    if (isEdit) {
      popular();
    }
  }, [isEdit, pathname, popular]);

  return (
    <Dialogo open title={isEdit ? "Alterar veículo" : "Incluir veículo"} fullWidth maxWidth="sm">
      <Form onSubmit={manipularEnvio} initialData={veiculo}>
        <CampoDeTexto name="placa" label="Placa" fullWidth required autoFocus />
        <DateField name="anoFabricacao" label="Ano de fabricação" fullWidth required />
        <DateField name="anoModelo" label="Ano de modelo" fullWidth required />
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <AutoCompleteModelo name="modelo" label="Modelo" required listOptionsIn />
          <Link to={`${path}/incluirmodelo`}>
            <Tooltip title="Incluir modelo">
              <IconButton>
                <CreateNewFolderIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <AutoCompleteCliente name="cliente" label="Cliente" required listOptionsIn />
          <Link to={`${path}/incluircliente`}>
            <Tooltip title="Incluir cliente">
              <IconButton>
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <BotaoIncluirOuAlterar isEdit={isEdit} />
      </Form>
      <Alerta ref={refAlerta} />
      <Switch>
        <Route path={`${url}/incluirmodelo`} component={DialogoIncluirModelo} />
        <Route path={`${url}/incluircliente`} component={DialogoIncluirCliente} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoIncluirOuAlterarVeiculo);