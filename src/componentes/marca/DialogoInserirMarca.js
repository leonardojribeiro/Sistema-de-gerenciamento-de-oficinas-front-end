import React, { useRef, useContext, useCallback, memo } from 'react';
import Dialogo from '../Dialogo';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../Formulario/Campos/CampoTexto';
import DragAndDrop from '../Formulario/Campos/DragAndDrop';
import { Button, DialogActions } from '@material-ui/core';
import ApiContext from '../../contexts/ApiContext';
import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

function DialogInserirMarca({aberto}) {
  const { multipartPost } = useContext(ApiContext);
  const { idOficina } = useAuth();
  const formularioReferencia = useRef();
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
      <Formulario ref={formularioReferencia} aoEnviar={manipularEnvio}>
        <CampoTexto
          nome="descricao"
          label="Descrição"
          fullWidth
          required
          autoFocus
        />
        <DragAndDrop
          nome="logomarca"
          required
        />
        <DialogActions >
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Formulario>
    </Dialogo>
  );
}

export default memo(DialogInserirMarca);