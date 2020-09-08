import React, { memo, useCallback, useContext } from 'react';
import { DialogActions, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { Form, CampoDeTexto, CampoDeSenha,} from '../../componentes/Form';
import Dialogo from '../../componentes/Dialog';
import ApiContext from '../../contexts/ApiContext';
import Usuario from '../../Types/Usuario';

const DialogLogin: React.FC = () => {
  const history = useHistory();
  const { setUsuario } = useContext(AuthContext);
  const { post } = useContext(ApiContext);

  const efetuarLogin = useCallback(async ({ nomeUsuario, senha }) => {
    const resposta = await post(
      "/usuario/login",
      {
        nomeUsuario,
        senha
      }
    ) as Usuario;

    if (resposta) {
      setUsuario(resposta);
      localStorage.setItem("tokenUsuario", resposta.token as string);
      return true;
    }
    return false;
  }, [post, setUsuario]);

  function handleLogin(usuario: object) {
    if (usuario) {
      efetuarLogin(usuario)
    }
  }

  function fechar() {
    history.goBack();
  }

  return (
    <Dialogo open title="Login" >
      <Form clearOnSubmit onSubmit={handleLogin}>
        <Box p={2}>
          <CampoDeTexto
            autoFocus
            name="nomeUsuario"
            fullWidth
            required
            type="email"
            label="Usuário"
            autoCapitalize="off"
            autoComplete="off"
          />
        </Box>
        <Box p={2}>
          <CampoDeSenha
            name="senha"
            fullWidth
            required
            label="Senha"
            autoComplete="password"
          />
        </Box>
        <DialogActions>
          <Button onClick={fechar}>Cancelar</Button>
          <Button type="reset">limpar</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
      </Form>
    </Dialogo>
  );
}

export default memo(DialogLogin);