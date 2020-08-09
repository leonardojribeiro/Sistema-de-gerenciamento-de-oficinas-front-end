import React, { memo, useCallback, useContext  } from 'react';
import { DialogActions, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { Formulario, CampoDeTexto, CampoDeSenha } from './Formulario';
import Dialogo from './Dialogo';
import ApiContext from '../contexts/ApiContext';

function DialogoLogin() {
  const history = useHistory();
  const { setUsuario } = useContext(AuthContext);
  const {post} = useContext(ApiContext);
  
  const efetuarLogin = useCallback(async ({ nomeUsuario, senha }) => {
    const resposta = await post(
      "/usuario/login",
      {
        nomeUsuario,
        senha
      }
    );

    if (resposta) {
      setUsuario(resposta);
      localStorage.setItem("tokenUsuario", resposta.token);
      return true;
    }
    return false;
  }, [post, setUsuario]);

  function manipularEnvio(usuario) {
    if (usuario) {
      efetuarLogin(usuario)
    }
  }

  function fechar() {
    history.goBack();
  }

  return (
    <Dialogo aberto titulo="Login" >
      <Formulario limparAoEnviar aoEnviar={manipularEnvio}>
          <Box p={2}>
            <CampoDeTexto
              autocapitalize="off"
              autoCorrect={false}
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
        <DialogActions>
          <Button onClick={fechar}>Cancelar</Button>
          <Button type="reset">limpar</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
      </Formulario>
    </Dialogo>
  );
}

export default memo(DialogoLogin);