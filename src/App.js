import React, { useState, useEffect} from 'react';
import BarraSuperior from './componentes/barra superior/BarraSuperior';
import Rodape from './componentes/rodape';
import {BrowserRouter, Link} from 'react-router-dom';
import './App.css';
import BrightnessHigh from '@material-ui/icons/BrightnessHigh';
import BrightnessLow from '@material-ui/icons/BrightnessLow';
import Menu from '@material-ui/icons/Menu';
import AddCircle from '@material-ui/icons/AddCircle';
import Drawer from './componentes/Drawer';
import { ButtonGroup,} from '@material-ui/core';
import Backdrop from './componentes/Backdrop';
import Botao from './componentes/IconButton';
import Rotas from './rotas';

function App() {
  const [tema, setTema] = useState("");
  const [logo, setLogo] = useState({});
  const [titulo, setTitulo] = useState("");
  const [icoTema, setIcoTema] = useState(<BrightnessHigh />);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    const t = localStorage.getItem("tema");
    if(t){
      setTema(t);
    }
    else{
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
      setIcoTema(<BrightnessLow />)
      localStorage.setItem("tema", "escuro");
    }
    else {
      setTema("claro");
      setIcoTema(<BrightnessHigh />);
      localStorage.setItem("tema", "claro");
    }
    
  }

  const botoes = (
    <ButtonGroup>
      <Botao tooltip="Cadastrar Oficina" component={Link} to="/oficina/cadastro/">
        <AddCircle />
      </Botao>
      <Botao tooltip="Alterar Tema" onClick={alterarTema}>
        {icoTema}
      </Botao>
      <Botao tooltip="Menu" onClick={() => { setDrawerOpen(!drawerOpen) }}>
        <Menu />
      </Botao>
    </ButtonGroup>
  );

  return (
    <div className={`transicao-tema ${tema}`}>
      <BrowserRouter>
        <BarraSuperior logo={logo} titulo={titulo} items={botoes} />
        <div className="h-min-barra-rodape">
          <Rotas tema={tema}/>
        </div>
        <Rodape />
        <Drawer open={drawerOpen} onOpen={() => { setDrawerOpen(true) }} onClose={() => { setDrawerOpen(false) }} />
      </BrowserRouter>
      <Backdrop />
    </div>
  );
}

export default App;
