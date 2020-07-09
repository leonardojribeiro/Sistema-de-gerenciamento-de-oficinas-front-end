import React, { useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@material-ui/core';
import CampoTexto from './Formulario/Campos/CampoTexto';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import Form from './Formulario/Form';
import CampoSenha from './Formulario/Campos/CampoSenha';


function DialogoLogin() {
  const history = useHistory();

  const { efetuarLogin } = useContext(AuthContext);

  const ref = useRef();

  function handleSubmit() {
    const usuario = ref.current.submitForm()

    if(usuario){
      efetuarLogin(usuario);
    }
  }

  function fechar() {
    history.goBack();
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  return (
    <Dialog open onClose={fechar} disableBackdropClick >
      <DialogTitle>Login</DialogTitle>
      <DialogContent onKeyDown={handleKeyDown} >
        <Form ref={ref} dadosIniciais={{}}>
          <Box p={2}>
            <CampoTexto
              autoFocus
              nome="nomeUsuario"
              fullWidth
              required
              label="Usuário"
            />
          </Box>
          <Box p={2}>
            <CampoSenha
              nome="senha"
              fullWidth
              required
              label="Senha"
            />
          </Box>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={fechar}>Cancelar</Button>
        <Button onClick={handleSubmit}>Login</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogoLogin;