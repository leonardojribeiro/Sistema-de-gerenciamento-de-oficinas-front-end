import React, { useState, useEffect, } from 'react';
import Rodape from './componentes/rodape';
import { BrowserRouter, } from 'react-router-dom';
import './App.css';
import Drawer from './componentes/Drawer';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core';
import Rotas from './rotas';
import BackdropContext from './componentes/BackdropContext';
import DialogoLogin from './componentes/DialogoLogin';
import api from "./servicos/api";
import AuthContext from './contexts/AuthContext';
import ProgressoIndefinidoCircular from './componentes/ProgressoIndefinidoCircular';


function App() {
  const [tema, setTema] = useState("");
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [progressoAtivo, setProgressoAtivo] = useState(false);
  const [dialogLoginAberto, setDialogLoginAberto] = useState(false);
  const [usuario, setUsuario] = useState(null);

  async function efetuarLoginPorToken(token) {
    setProgressoAtivo(true);
    const resposta = await api.post(`${process.env.REACT_APP_API_URL}/usuario/loginPorToken`, { token }).catch(err=>console.log(err));
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
    zIndex:{
      modal: 10000
    }
  });


  function logar() {
    if (!usuario) {
      setDialogLoginAberto(true);
    }
  }

  function fecharDialogoLogin(){
    setDialogLoginAberto(false);
  }

  function deslogar(){
    localStorage.removeItem("tokenUsuario");
    setUsuario(null);
  }

  const actionsContext = {
    setProgressoAtivo,
    setDrawerAberto,
    alterarTema,
  };

  const authContextValue = {
    usuario,
    setUsuario,
    logar,
    deslogar,
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
            {
              dialogLoginAberto && (
                <DialogoLogin open={dialogLoginAberto} onClose={fecharDialogoLogin} />
              )
            }
          </BackdropContext.Provider>
        </AuthContext.Provider>
        <ProgressoIndefinidoCircular open={progressoAtivo} />
      </ThemeProvider>
    </div>
  );
}

export default App;