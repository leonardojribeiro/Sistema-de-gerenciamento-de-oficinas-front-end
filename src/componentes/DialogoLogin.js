import React, { useRef, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, CircularProgress, } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CampoTexto from './CampoTexto';
import { useState } from 'react';
import api from '../servicos/api';
import AuthContext from '../contexts/AuthContext';
import ProgressoIndefinidoCircular from './ProgressoIndefinidoCircular';


function DialogoLogin({ open, onClose }) {
  const { setUsuario } = useContext(AuthContext);

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [usuarioValido, setUsuarioValido] = useState(true);
  const [senhaValida, setSenhaValida] = useState(true);

  const refUsuario = useRef();
  const refSenha = useRef();

  const [snackBarAberta, setSnackbarAberta] = useState(false);
  const [mensagemSnackbar, setMensagemSnackbar] = useState("");

  const [progressoIndefinidoAberto, setProgressoIndefinidoAtivo] = useState(false);

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

  async function login() {
    setProgressoIndefinidoAtivo(true);
    const resposta = await api
      .post(
        `${process.env.REACT_APP_API_URL}/usuario/login`,
        {
          usuario: nomeUsuario,
          senha
        }
      )
      .catch(e => {
        if (e.response) {
          const { mensagem } = JSON.parse(e.response.request.response);
          setMensagemSnackbar(
            Array.isArray(mensagem)
              ? mensagem.map((a, i) => <p key={i}>{a}</p>)
              : mensagem
          )
        }
        else {
          setMensagemSnackbar(e.message === "Network Error" ? "Erro ao se conectar com o servidor." : e.message);
        }
        setSnackbarAberta(true);
      });

    if (resposta) {
      if (resposta.status === 200) {
        onClose();
        setUsuario(resposta.data);
        localStorage.setItem("tokenUsuario", resposta.data.token);
      }
    }
    setProgressoIndefinidoAtivo(false);
  }

  function handleSubmit() {
    if (validarUsuario() && validarSenha()) {
      login();
    }
  }

  function handleKeyDown(e) {
    if(e.keyCode === 27){
      onClose();
    }
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  function handleCloseSnackBar() {
    setSnackbarAberta(false);
  }

  return (
    <Dialog open={open} onClose={onClose} disableBackdropClick onKeyDown={handleKeyDown}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Login</Button>
      </DialogActions>
      <Snackbar open={snackBarAberta} autoHideDuration={5000} onClose={handleCloseSnackBar}>
        <Alert severity="error" onClose={handleCloseSnackBar} closeText="Fechar">
          {mensagemSnackbar}
        </Alert>
      </Snackbar>
      <ProgressoIndefinidoCircular open={progressoIndefinidoAberto}/>
    </Dialog>
  );
}


export default DialogoLogin;