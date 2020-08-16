import React, { useContext, useCallback,  memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button,  } from '@material-ui/core';

import { Form, CampoDeTexto, MoneyField } from '../../../componentes/Form';


const DialogInserirServico: React.FC = () => {
  const { post } = useContext(ApiContext);
  const history = useHistory();


  const manipularEnvio = useCallback(async (servico) => {
    if (servico) {
      console.log(servico)
      const resposta = await post("/servico", servico);
      if (resposta) {
        history.goBack();
      }
    }
  }, [history, post]);


  return (
    <Dialogo open title="Inserir Serviço">
      <Form onSubmit={manipularEnvio}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <CampoDeTexto name="tempoDuracao" type="number" required fullWidth label="Tempo de duração (minutos)"/>
        <MoneyField name="valor" label="Valor" required fullWidth/>
        <DialogActions >
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
    </Dialogo>
  );
}

export default memo(DialogInserirServico);