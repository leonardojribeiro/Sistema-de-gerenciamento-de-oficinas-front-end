import React, { useContext, useCallback, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Button, DialogActions } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { CampoDeTexto, Form, } from '../../../componentes/Form';

function DialogoIncluirEspecialidade() {
  const { post } = useContext(ApiContext);
  const history = useHistory();

  const manipularEnvio = useCallback(async (especialidade) => {
    if (especialidade) {
      const resposta = await post("/especialidade", especialidade);
      if (resposta) {
        history.goBack();
      }
    }
  }, [history, post])

  return (
    <Dialogo open title="incluir especialidade">
      <Form onSubmit={manipularEnvio}>
        <CampoDeTexto name="descricao" autoComplete="no" label="Descrição" fullWidth required autoFocus />
        <DialogActions>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
    </Dialogo>
  );
}

export default memo(DialogoIncluirEspecialidade);