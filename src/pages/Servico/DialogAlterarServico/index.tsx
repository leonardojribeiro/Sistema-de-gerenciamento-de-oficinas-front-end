import React, { useContext, useCallback, memo, useEffect, useState, useRef } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, } from '@material-ui/core';

import { Form, CampoDeTexto, MoneyField } from '../../../componentes/Form';
import useQuery from '../../../hooks/useQuery';
import Servico from '../../../Types/Servico';
import comparar from '../../../recursos/Comparar';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';


const DialogInserirServico: React.FC = () => {
  const [servico, setServico] = useState<Servico | undefined>(undefined);
  const { put, get } = useContext(ApiContext);
  const history = useHistory();
  const id = useQuery("id");
  const refAlerta = useRef<AlertaHandles | undefined>(undefined);

  const manipularEnvio = useCallback(async (dados) => {
    if (dados) {
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
  }, [history, put, servico]);

  const popular = useCallback(async () => {
    const resposta = await get(`/servico/id?_id=${id}`) as Servico
    if (resposta) {
      setServico(resposta)
    }
  }, [get, id,]);

  useEffect(() => {
    popular();
  },[popular])

  return (
    <Dialogo open title="Alterar Serviço">
      <Form onSubmit={manipularEnvio} initialData={servico}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <CampoDeTexto name="tempoDuracao" type="number" required fullWidth label="Tempo de duração (minutos)" />
        <MoneyField name="valor" label="Valor" required fullWidth />
        <DialogActions >
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(DialogInserirServico);