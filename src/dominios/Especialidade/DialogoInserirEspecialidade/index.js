import React, { useContext, useCallback, memo } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import { Button, DialogActions } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import useAuth from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { CampoDeTexto, Formulario, } from '../../../componentes/Formulario';

function DialogInserirEspecialidade({aberto}) {
  const { post } = useContext(ApiContext);
  const { idOficina } = useAuth();
  const history = useHistory();

  const manipularEnvio = useCallback(async (especialidade)=>{
    if (especialidade) {
      especialidade.idOficina = idOficina;
      const resposta = await post("/especialidade", especialidade);
      if (resposta) {
        history.goBack();
      }
    }
  },[history, idOficina, post])

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