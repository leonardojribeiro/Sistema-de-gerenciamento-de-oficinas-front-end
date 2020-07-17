import React, { useRef, memo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@material-ui/core';
import CampoTexto from './Formulario/Campos/CampoTexto';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import Formulario from './Formulario/Formulario';
import CampoSenha from './Formulario/Campos/CampoSenha';


function DialogoLogin() {
  const history = useHistory();
  const { efetuarLogin } = useContext(AuthContext);
  const ref = useRef();

  function manipularEnvio(usuario) {
    if (usuario) {
      efetuarLogin(usuario);
    }
  }

  function fechar() {
    history.goBack();
  }

  return (
    <Dialog open onClose={fechar} disableBackdropClick >
      <DialogTitle>Login</DialogTitle>
      <Formulario ref={ref} dadosIniciais={{}} aoEnviar={manipularEnvio}>
        <DialogContent>
          <Box p={2}>
            <CampoTexto
              autoFocus
              nome="nomeUsuario"
              fullWidth
              required
              label="Usuário"
              autoComplete="username"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={fechar}>Cancelar</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
      </Formulario>
    </Dialog>
  );
}

export default memo(DialogoLogin);