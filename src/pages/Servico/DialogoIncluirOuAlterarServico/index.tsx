import React, { useContext, useCallback, memo, useState, useRef, useEffect } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, useLocation } from 'react-router-dom';
import { DialogActions, Button, } from '@material-ui/core';

import { Form, CampoDeTexto, MoneyField } from '../../../componentes/Form';
import Servico from '../../../Types/Servico';
import useQuery from '../../../hooks/useQuery';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import comparar from '../../../recursos/Comparar';
import BotaoIncluirOuAlterar from '../../../componentes/BotaoIncluirOuAlterar';


const DialogoIncluirOuAlterarServico: React.FC = () => {
  const [servico, setServico] = useState<Servico | undefined>(undefined);
  const { post, put, get } = useContext(ApiContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const isEdit = pathname.endsWith("alterarservico");
  const id = useQuery("id");
  const refAlerta = useRef<AlertaHandles | undefined>(undefined);

  console.log(isEdit)

  const manipularEnvio = useCallback(async (dados) => {
    if (dados) {
      if (isEdit) {
        if (!comparar(servico, dados)) {
          dados._id = servico?._id;
          const resposta = await put("/servico", dados);
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
        const resposta = await post("/servico", dados);
        if (resposta) {
          history.goBack();
        }
      }
    }
  }, [history, isEdit, post, put, servico]);

  const popular = useCallback(async () => {
    const resposta = await get(`/servico/id?_id=${id}`) as Servico
    if (resposta) {
      setServico(resposta)
    }
  }, [get, id,]);

  useEffect(() => {
    if (isEdit) {
      popular();
    }
  }, [isEdit, popular])

  return (
    <Dialogo open title={isEdit ? "Alterar serviço" : "Incluir Serviço"} maxWidth="xs" fullWidth>
      <Form onSubmit={manipularEnvio} initialData={servico}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <MoneyField name="valor" min={0.01} max={10000} label="Valor" required fullWidth />
        <CampoDeTexto name="tempoDuracao" type="number" required fullWidth label="Tempo de duração (minutos)" />
        <BotaoIncluirOuAlterar isEdit={isEdit} />
      </Form>
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(DialogoIncluirOuAlterarServico);