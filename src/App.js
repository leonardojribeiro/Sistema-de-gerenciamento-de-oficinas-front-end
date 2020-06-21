import React, { useState, useEffect, } from 'react';
import Rodape from './componentes/rodape';
import { BrowserRouter, } from 'react-router-dom';
import './App.css';
import Drawer from './componentes/Drawer';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core';
import Backdrop from './componentes/Backdrop';
import Rotas from './rotas';
import BackdropContext from './componentes/BackdropContext';
import DialogoLogin from './componentes/DialogoLogin';
import api from "./servicos/api";
import AuthContext from './contexts/AuthContext';


function App() {
  const [tema, setTema] = useState("");
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [progressoAtivo, setProgressoAtivo] = useState(false);
  const [dialogLoginAberto, setDialogLoginAberto] = useState(false);
  const [usuario, setUsuario] = useState(null);

  async function efetuarLoginPorToken(token) {
    setProgressoAtivo(true);
    const resposta = await api.post(`${process.env.REACT_APP_API_URL}/usuario/loginPorToken`, { token });
    if (resposta) {
      if (resposta.status === 200) {
        setUsuario(resposta.data);
      }
    }
    setProgressoAtivo(false);
  }

  useEffect(() => {
    const t = localStorage.getItem("tema");
    if (t) {
      setTema(t);
    }
    else {
      setTema("claro");
    }

    const token = localStorage.getItem("tokenUsuario");
    if (token) {
      efetuarLoginPorToken(token);
    }
  }, []);

  const alterarTema = () => {
    if (tema === "claro") {
      setTema("escuro");
      localStorage.setItem("tema", "escuro");
    }
    else {
      setTema("claro");
      localStorage.setItem("tema", "claro");
    }
  }

  const darkTheme = createMuiTheme({
    palette: {
      type: tema === "claro" ? "light" : "dark",
      contrastThreshold: 3
    },
  });

  async function login(usuario) {
    setProgressoAtivo(true);
    const resposta = await api.post(`${process.env.REACT_APP_API_URL}/usuario/login`, usuario);
    if (resposta) {
      if (resposta.status === 200) {
        setDialogLoginAberto(false);
        setUsuario(resposta.data);
        localStorage.setItem("tokenUsuario", resposta.data.token);
      }
    }
    setProgressoAtivo(false);
  }

  function abrirDialogoLogin() {
    if (!usuario) {
      setDialogLoginAberto(true);
    }
  }

  function fecharDialogoLogin(){
    setDialogLoginAberto(false);
  }

  const actionsContext = {
    setProgressoAtivo,
    setDrawerAberto,
    alterarTema,
  };

  const authContextValue = {
    usuario,
    abrirDialogoLogin
  }

  return (
    <div className={`${tema}`}>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={authContextValue}>
          <BackdropContext.Provider value={actionsContext}>
            <BrowserRouter>
              <div className="h-min-rodape">
                <Rotas />
              </div>
              <Rodape />
              <Drawer open={drawerAberto} onOpen={() => { setDrawerAberto(true) }} onClose={() => { setDrawerAberto(false) }} />
            </BrowserRouter>
            <DialogoLogin open={dialogLoginAberto} onSubmit={login} onClose={fecharDialogoLogin} />
          </BackdropContext.Provider>
        </AuthContext.Provider>
        <Backdrop open={progressoAtivo} />
      </ThemeProvider>
    </div>
  );
}

export default App;