import React, { useContext, useCallback, memo, useState, useRef, useEffect } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, Link, Switch, Route, useLocation, useRouteMatch } from 'react-router-dom';
import { Box, Tooltip, IconButton } from '@material-ui/core';
import { Form, CampoDeTexto, } from '../../../componentes/Form';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DialogoIncluirMarca from '../../Marca/DialogoIncluirMarca';
import AutoCompleteMarca from '../../../componentes/AutoComplete/AutoCompleteMarca';
import Peca from '../../../Types/Peca';
import { AlertaHandles } from '../../../componentes/Alerta';
import useQuery from '../../../hooks/useQuery';
import comparar from '../../../recursos/Comparar';
import BotaoIncluirOuAlterar from '../../../componentes/BotaoIncluirOuAlterar';

const DialogoIncluirOuAlterarPeca: React.FC = () => {
  const { post } = useContext(ApiContext);
  const history = useHistory();
  const { get, put } = useContext(ApiContext);
  const [peca, setPeca] = useState<Peca | undefined>();
  const refAlerta = useRef<AlertaHandles>();
  const id = useQuery("id");
  const { pathname } = useLocation();
  const { path, url } = useRouteMatch();
  const isEdit = pathname.endsWith("alterarpeca");

  const manipularEnvio = useCallback(async (dados) => {
    if (dados) {
      if (isEdit) {
        if (!comparar(peca, dados)) {
          dados._id = peca?._id;
          const resposta = await put("/peca", dados);
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
      else {
        const resposta = await post("/peca", dados);
        if (resposta) {
          history.goBack();
        }
      }
    }
  }, [history, isEdit, peca, post, put]);


  const popular = useCallback(async () => {
    const resposta = await get(`/peca/id?_id=${id}`) as Peca;
    if (resposta) {
      setPeca(resposta)
    }
  }, [get, id,]);

  useEffect(() => {
    if (isEdit) {
      popular();
    }
  }, [popular, pathname, isEdit])


  return (
    <Dialogo open title={isEdit ? "Alterar peça" : "Incluir peça"} fullWidth maxWidth="xs">
      <Form onSubmit={manipularEnvio} initialData={peca}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <AutoCompleteMarca name="marca" label="Marca" required listOptionsIn />
          <Link to={`${path}/incluirmarca`}>
            <Tooltip title="Incluir marca">
              <IconButton>
                <CreateNewFolderIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <BotaoIncluirOuAlterar isEdit={isEdit} />
      </Form>
      <Switch>
        <Route path={`${url}/incluirmarca`} component={DialogoIncluirMarca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoIncluirOuAlterarPeca);