import React, { useContext, useCallback, memo } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import { Button, DialogActions } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import useAuth from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { CampoDeTexto, Formulario, DragAndDrop } from '../../../componentes/Formulario';

function DialogInserirMarca({aberto}) {
  const { multipartPost } = useContext(ApiContext);
  const { idOficina } = useAuth();
  const history = useHistory();

  const manipularEnvio = useCallback(async (marca)=>{
    if (marca) {
      marca.idOficina = idOficina
      const resposta = await multipartPost("/marca", marca);
      if (resposta) {
        history.goBack();
      }
    }
  },[history, idOficina, multipartPost])

  return (
    <Dialogo aberto={aberto} titulo="Inserir marca">
      <Formulario aoEnviar={manipularEnvio}>
        <CampoDeTexto nome="descricao" label="Descrição" fullWidth required autoFocus />
        <DragAndDrop nome="logomarca" required />
        <DialogActions>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Formulario>
    </Dialogo>
  );
}

export default memo(DialogInserirMarca);