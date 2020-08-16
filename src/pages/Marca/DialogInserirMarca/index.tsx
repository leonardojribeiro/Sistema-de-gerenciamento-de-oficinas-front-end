import React, { useContext, useCallback, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import { Button, DialogActions } from '@material-ui/core';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { CampoDeTexto, Form, DragAndDrop } from '../../../componentes/Form';

const DialogInserirMarca: React.FC = () => {
  const { multipartPost } = useContext(ApiContext);
  const history = useHistory();
  const handleSubmit = useCallback(async (marca)=>{
    if (marca) {
      const resposta = await multipartPost("/marca", marca);
      if (resposta) {
        history.goBack();
      }
    }
  },[history, multipartPost])

  return (
    <Dialogo open maxWidth="xs" fullWidth title="Inserir marca">
      <Form onSubmit={handleSubmit}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <DragAndDrop name="logomarca" required />
        <DialogActions>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
    </Dialogo>
  );
}

export default memo(DialogInserirMarca);