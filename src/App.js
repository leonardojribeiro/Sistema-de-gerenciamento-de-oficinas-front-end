import React, { useState, useEffect, useMemo } from 'react';
import BarraSuperior from './componentes/BarraSuperior';
import Rodape from './componentes/rodape';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import BrightnessHigh from '@material-ui/icons/BrightnessHigh';
import BrightnessLow from '@material-ui/icons/BrightnessLow';
import Menu from '@material-ui/icons/Menu';
import Drawer from './componentes/Drawer';
import { ButtonGroup, } from '@material-ui/core';
import Backdrop from './componentes/Backdrop';
import Botao from './componentes/IconButton';
import Rotas from './rotas';


function App() {
  const [tema, setTema] = useState("");
  const [logo, setLogo] = useState({});
  const [titulo, setTitulo] = useState("");
  const [itensBarra, setItensBarra] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("tema");
    if (t) {
      setTema(t);
    }
    else {
      setTema("claro");
    }
    setLogo({
      url: "logo.jpg",
      alt: "Logomarca"
    });
    setTitulo("Sistema de Gerenciamento de Oficinas");
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

  const setItens = ({ itens }) => {
    setItensBarra(itens);
  }

  const barraSuperior = useMemo(()=>
    <BarraSuperior>
      <Botao tooltip="Menu" onClick={() => { setDrawerOpen(!drawerOpen) }}>
        <Menu />
      </Botao>
      {botoesBarraNavegacao}
    </BarraSuperior>,
    [botoesBarraNavegacao]
  );

  return (
    <div className={`transicao-tema ${tema}`}>
      <BrowserRouter>
        {barraSuperior}
        <div className="h-min-barra-rodape">
          <Rotas setItensBarraNavegacao={setItens} tema={tema} />
        </div>
        <Rodape />
        <Drawer open={drawerOpen} onOpen={() => { setDrawerOpen(true) }} onClose={() => { setDrawerOpen(false) }} />
      </BrowserRouter>
      <Backdrop />
    </div>
  );
}

export default App;
