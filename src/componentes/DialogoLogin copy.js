import React, { useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import CampoTexto from './CampoTexto';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';


function DialogoLogin() {

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [usuarioValido, setUsuarioValido] = useState(true);
  const [senhaValida, setSenhaValida] = useState(true);

  const refUsuario = useRef();
  const refSenha = useRef();

  const history = useHistory();

  const {efetuarLogin } = useContext(AuthContext);
  
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
      efetuarLogin({
        nomeUsuario,
        senha
      });
    }
  }

  function fechar(){
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
      <DialogContent>
        <form onKeyDown={handleKeyDown} >
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