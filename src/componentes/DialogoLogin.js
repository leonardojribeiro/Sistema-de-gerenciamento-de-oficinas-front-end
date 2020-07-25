import React, { memo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Formulario, CampoDeTexto, CampoDeSenha } from './Formulario';

function DialogoLogin() {
  const history = useHistory();
  const { efetuarLogin } = useContext(AuthContext);

  function manipularEnvio(usuario) {
    if (usuario) {
      efetuarLogin(usuario)
    }
  }

  function fechar() {
    history.goBack();
  }

  return (
    <Dialog open onClose={fechar} disableBackdropClick >
      <DialogTitle>Login</DialogTitle>
      <Formulario limparAoEnviar aoEnviar={manipularEnvio}>
        <DialogContent>
          <Box p={2}>
            <CampoDeTexto
              autoFocus
              nome="nomeUsuario"
              fullWidth
              required
              label="Usuário"
              autoComplete="username"
            />
          </Box>
          <Box p={2}>
            <CampoDeSenha
              nome="senha"
              fullWidth
              required
              label="Senha"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={fechar}>Cancelar</Button>
          <Button type="reset">limpar</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
      </Formulario>
    </Dialog>
  );
}

export default memo(DialogoLogin);