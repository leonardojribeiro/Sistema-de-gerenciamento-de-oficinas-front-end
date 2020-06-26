import React, { useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import CampoTexto from './CampoTexto';
import { useState } from 'react';


function DialogoLogin({ aberto, fechar, enviar }) {

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [usuarioValido, setUsuarioValido] = useState(true);
  const [senhaValida, setSenhaValida] = useState(true);

  const refUsuario = useRef();
  const refSenha = useRef();
  
  function validarUsuario(usuarioCopia = nomeUsuario) {
    if (usuarioCopia.length) {
      setUsuarioValido(true);
      return true;
    }
    else {
      setUsuarioValido(false);
      refUsuario.current.focus();
      return false;
    }
  }

  function validarSenha(senhaCopia = senha) {
    if (senhaCopia.length) {
      setSenhaValida(true);
      return true;
    }
    else {
      setSenhaValida(false)
      refSenha.current.focus();
      return false;
    }
  }

  function handleSubmit() {
    if (validarUsuario() && validarSenha()) {
      enviar({
        nomeUsuario,
        senha
      });
    }
  }

  function handleKeyDown(e) {
    if (e.keyCode === 27) {
      fechar();
    }
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  return (
    <Dialog open={aberto} onClose={fechar} disableBackdropClick onKeyDown={handleKeyDown}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form >
          <CampoTexto
            autoFocus
            obrigatorio
            ref={refUsuario}
            label="Usuário"
            valor={nomeUsuario}
            onChange={setNomeUsuario}
            valido={usuarioValido}
            erroObrigatorio="Usuário é obrigatório."
            validar={validarUsuario}
          />
          <CampoTexto
            obrigatorio
            ref={refSenha}
            label="Senha"
            valor={senha}
            type="password"
            onChange={setSenha}
            valido={senhaValida}
            erroObrigatorio="Senha é obrigatória."
            validar={validarSenha}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={fechar}>Cancelar</Button>
        <Button onClick={handleSubmit}>Login</Button>
      </DialogActions>
    </Dialog>
  );
}


export default DialogoLogin;