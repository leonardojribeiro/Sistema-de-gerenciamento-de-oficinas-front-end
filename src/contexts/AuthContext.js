import React, { createContext, useState, useEffect } from 'react';
import DialogoLogin from '../componentes/DialogoLogin';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ProgressoIndefinidoCircular from '../componentes/ProgressoIndefinidoCircular';
import api from '../servicos/api';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [dialogLoginAberto, setDialogLoginAberto] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const [snackBarAberta, setSnackbarAberta] = useState(false);
  const [mensagemSnackbar, setMensagemSnackbar] = useState("");

  const [progressoIndefinidoAberto, setProgressoIndefinidoAtivo] = useState(false);

  const caminho = useLocation().pathname;

  const logar = useCallback(() => {
    if (!usuario) {
      setDialogLoginAberto(true);
    }
  },[usuario]);

  async function efetuarLoginPorToken(token) {
    setProgressoIndefinidoAtivo(true);
    const resposta = await api.post(`${process.env.REACT_APP_API_URL}/usuario/loginPorToken`, { token }).catch(err => console.log(err));
    if (resposta) {
      if (resposta.status === 200) {
        setUsuario(resposta.data);
      }
    }
    setProgressoIndefinidoAtivo(false);
  }

  useEffect(() => {
    if (caminho === "/login") {
      logar()
    }
  }, [caminho, logar]);

  useEffect(() => {
    const token = localStorage.getItem("tokenUsuario");
    if (token) {
      efetuarLoginPorToken(token);
    }
  }, []);

  async function efetuarLogin({ nomeUsuario, senha }) {
    setProgressoIndefinidoAtivo(true);
    let resposta = null;
    try {
      resposta = await api
        .post(
          `${process.env.REACT_APP_API_URL}/usuario/login`,
          {
            nomeUsuario,
            senha
          }
        );
    }
    catch (e) {
      if (e.response) {
        const { mensagem } = JSON.parse(e.response.request.response);
        setMensagemSnackbar(
          Array.isArray(mensagem)
            ? mensagem.map((mensagem, index) => <p key={index}>{mensagem}</p>)
            : mensagem
        )
      }
      else {
        setMensagemSnackbar(e.message === "Network Error" ? "Erro ao se conectar com o servidor." : e.message);
      }
      setSnackbarAberta(true);
    }

    if (resposta) {
      if (resposta.status === 200) {
        setUsuario(resposta.data);
        localStorage.setItem("tokenUsuario", resposta.data.token);
        setDialogLoginAberto(false);
      }
    }
    setProgressoIndefinidoAtivo(false);
  }

  const his = useHistory();

  function fecharDialogoLogin() {
    setProgressoIndefinidoAtivo(false);
    setSnackbarAberta(false);
    setDialogLoginAberto(false);
    his.goBack();
  }

  function deslogar() {
    localStorage.removeItem("tokenUsuario");
    setUsuario(null);
  }

  function handleCloseSnackBar() {
    setSnackbarAberta(false);
  }


  return (
    <AuthContext.Provider value={{ deslogar, usuario }}>
      {children}
      {
        dialogLoginAberto && (
          <DialogoLogin aberto={dialogLoginAberto} fechar={fecharDialogoLogin} enviar={efetuarLogin} />
        )
      }
      {
        usuario &&(
          <Redirect to="/"/>
        )
      }
      <Snackbar open={snackBarAberta} autoHideDuration={5000} onClose={handleCloseSnackBar}>
        <Alert severity="error" onClose={handleCloseSnackBar} closeText="Fechar">
          {mensagemSnackbar}
        </Alert>
      </Snackbar>
      <ProgressoIndefinidoCircular open={progressoIndefinidoAberto} />
    </AuthContext.Provider>
  )
}

export default AuthContext;