import React, { memo, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import CampoTexto from './CampoTexto';
import { useState } from 'react';


function DialogoLogin({ open, onClose, onSubmit }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [usuarioValido, setUsuarioValido] = useState(true);
  const [senhaValida, setSenhaValida] = useState(true);

  const refUsuario = useRef();
  const refSenha = useRef();

  function validarUsuario(usuarioCopia = usuario) {
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
      onSubmit({
        usuario,
        senha
      })
    }
  }

  function handelKeyDown(e){
    if(e.keyCode === 13 ){
      handleSubmit();
    }
  }

  return (
    <Dialog open={open} onClose={onClose} disableBackdropClick onKeyDown={handelKeyDown}> 
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <CampoTexto
          obrigatorio
          ref={refUsuario}
          label="Usuário"
          valor={usuario}
          onChange={(e) => { setUsuario(e) }}
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
          onChange={(e) => { setSenha(e) }}
          valido={senhaValida}
          erroObrigatorio="Senha é obrigatória."
          validar={validarSenha}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Login</Button>
      </DialogActions>
    </Dialog>
  );
}


export default memo(DialogoLogin);