import React, { useContext, useCallback, memo, useState, useRef, useEffect } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Form, CampoDeTexto, } from '../../../componentes/Form';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import FormMarca from '../../Marca/FormMarca';
import AutoCompleteMarca from '../../../componentes/AutoComplete/AutoCompleteMarca';
import Peca from '../../../Types/Peca';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import useQuery from '../../../hooks/useQuery';
import comparar from '../../../recursos/Comparar';
import BotaoIncluirOuAlterar from '../../../componentes/BotaoIncluirOuAlterar';

const FormPeca: React.FC = () => {
  const { post } = useContext(ApiContext);
  const history = useHistory();
  const { get, put } = useContext(ApiContext);
  const [peca, setPeca] = useState<Peca | undefined>();
  const refAlerta = useRef<AlertaHandles>();
  const id = useQuery("id");
  const { path, url } = useRouteMatch();
  const isEdit = id !== null;

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
  }, [popular, isEdit])


  return (
    <Dialogo open title={isEdit ? "Alterar peça" : "Incluir peça"} fullWidth maxWidth="xs">
      <Form onSubmit={manipularEnvio} initialData={peca}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <AutoCompleteMarca name="marca" label="Marca" required />
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
        <Route path={`${url}/incluirmarca`} component={FormMarca} />
      </Switch>
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(FormPeca);