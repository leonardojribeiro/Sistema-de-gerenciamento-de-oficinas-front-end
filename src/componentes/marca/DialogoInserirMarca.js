import React, { useRef, useContext } from 'react';
import Dialogo from '../Dialogo';
import Form from '../Formulario/Form';
import CampoTexto from '../Formulario/Campos/CampoTexto';
import DragAndDrop from '../DragAndDrop';
import { Button, DialogActions } from '@material-ui/core';
import ApiContext from '../../contexts/ApiContext';
import AuthContext from '../../contexts/AuthContext';

function DialogInserirMarca() {
  const {multipartPost} = useContext(ApiContext);
  const {usuario} = useContext(AuthContext);
  const ref = useRef();
  function handleSubmit() {
    const marca = ref.current.submitForm();
    if(marca){
      marca.idOficina = usuario.idOficina._id;
      const formDados = new FormData();
      // formDados.append("descricao", marca.descricao);
      // formDados.append("idOficina", usuario.idOficina._id);
      // formDados.append("logomarca", marca.logomarca, marca.logomarca.name)
      // console.log( marca.logomarca instanceof File);
     // post("/marca", formDados);
     multipartPost("/marca", marca);
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