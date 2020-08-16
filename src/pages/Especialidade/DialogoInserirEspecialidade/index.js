import React, { useContext, useCallback, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Button, DialogActions } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { CampoDeTexto, Formulario, } from '../../../componentes/Form';

function DialogInserirEspecialidade({ aberto }) {
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
    <Dialogo aberto={aberto} titulo="Inserir especialidade">
      <Formulario aoEnviar={manipularEnvio}>
        <CampoDeTexto nome="descricao" label="Descrição" fullWidth required autoFocus />
        <DialogActions>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Formulario>
    </Dialogo>
  );
}

export default memo(DialogInserirEspecialidade);