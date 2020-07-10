import React, { useRef, useContext } from 'react';
import Dialogo from '../Dialogo';
import Form from '../Formulario/Form';
import CampoTexto from '../Formulario/Campos/CampoTexto';
import DragAndDrop from '../Formulario/Campos/DragAndDrop';
import { Button, DialogActions } from '@material-ui/core';
import ApiContext from '../../contexts/ApiContext';
import AuthContext from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

function DialogInserirMarca() {
  const { multipartPost } = useContext(ApiContext);
  const { usuario } = useContext(AuthContext);
  const ref = useRef();
  const history = useHistory();
  async function handleSubmit() {
    const marca = ref.current.submitForm();
    if (marca) {
      marca.idOficina = usuario.idOficina._id;
      const resposta = await multipartPost("/marca", marca);
      if(resposta){
        history.goBack();
      }
    }
  }

  return (
    <Dialogo titulo="Inserir marca">
      <Form ref={ref} >
        <CampoTexto
          nome="descricao"
          label="Descrição"
          fullWidth
          required
        />
        <DragAndDrop
          nome="logomarca"
          required
        />
      </Form>
      <DialogActions >
        <Button onClick={handleSubmit}>Salvar</Button>
      </DialogActions>
    </Dialogo>
  );
}

export default DialogInserirMarca;