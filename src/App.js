import React, { useState, useEffect, useMemo } from 'react';
import BarraSuperior from './componentes/BarraSuperior';
import Rodape from './componentes/rodape';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import BrightnessHigh from '@material-ui/icons/BrightnessHigh';
import BrightnessLow from '@material-ui/icons/BrightnessLow';
import Menu from '@material-ui/icons/Menu';
import Drawer from './componentes/Drawer';
import { ButtonGroup, createMuiTheme, ThemeProvider, } from '@material-ui/core';
import Backdrop from './componentes/Backdrop';
import Botao from './componentes/IconButton';
import Rotas from './rotas';
import BarraSuperiorContext from './componentes/BarraSuperiorContext';
import { useCallback } from 'react';
import BackdropContext from './componentes/BackdropContext';



function App() {
  const [tema, setTema] = useState("");
  const [itensBarra, setItensBarra] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("tema");
    if (t) {
      setTema(t);
    }
    else {
      setTema("claro");
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

  const botoesBarraNavegacao = (
    <ButtonGroup>
      {
        itensBarra.botoes
      }
      <Botao tooltip="Alterar Tema" onClick={alterarTema}>
        {tema === "claro" ? <BrightnessHigh /> : <BrightnessLow />}
      </Botao>
    </ButtonGroup>
  );

  const setItens = useCallback(({ itens }) => {
    setItensBarra(itens);
  }, []);

  const linksBarraNavegacao = itensBarra.links;

  const barraSuperior = useMemo(() =>
    <BarraSuperior>
      <Botao tooltip="Menu" onClick={() => { setDrawerOpen(!drawerOpen) }}>
        <Menu />
      </Botao>
      {linksBarraNavegacao}
      {botoesBarraNavegacao}
    </BarraSuperior>,
    [botoesBarraNavegacao, linksBarraNavegacao, drawerOpen]
  );

  const darkTheme = createMuiTheme({
    palette: {
      type: tema === "claro" ? "light" : "dark",
      contrastThreshold: 3
    },

  });

  return (
    <div className={`${tema}`}>
      <ThemeProvider theme={darkTheme}>
        <BackdropContext.Provider value={{ setBackdropOpen}}>
          <BrowserRouter>
            {barraSuperior}
            <BarraSuperiorContext.Provider value={{ setItens }}>
              <div className="h-min-barra-rodape">
                <Rotas />
              </div>
            </BarraSuperiorContext.Provider>
            <Rodape />
            <Drawer open={drawerOpen} onOpen={() => { setDrawerOpen(true) }} onClose={() => { setDrawerOpen(false) }} />
          </BrowserRouter>
        </BackdropContext.Provider>
        <Backdrop open={backdropOpen}/>
      </ThemeProvider>
    </div>
  );
}

export default App;