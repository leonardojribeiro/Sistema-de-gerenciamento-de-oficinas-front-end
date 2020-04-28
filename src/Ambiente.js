import React, { useState, useEffect } from 'react';
import Rotas from './rotas';
import BarraLateral from './componentes/barra lateral/BarraLateral';
import BarraSuperior from './componentes/barra superior/BarraSuperior';
import Rodape from './componentes/rodape';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Ambiente() {
  const [aberto, setAberto] = useState(false);
  const [logoOficina, setLogoOficina] = useState({});
  const [nomeOficina, setNomeOficina] = useState("");


  useEffect(() => {
    setLogoOficina({
      caminho: "logo.jpg",
      alt: "Logomarca da oficina"
    });
    setNomeOficina("Nome Da Oficina")
  }, []);


  return (
    <>
      <BarraSuperior
        nomeOficina={nomeOficina}
        logoOficina={logoOficina}
        menuPressionado={() => {
          setAberto(!aberto);
        }} />
      <div className="layout">
        <BarraLateral
          estaAberta={aberto}
          menuPressionado={() => {
            setAberto(!aberto);
          }}
          nomeOficina={nomeOficina}
          logoOficina={logoOficina}
        />
        <div className={aberto?"container conteudo conteudo-ligth conteudo-light-blur":"container conteudo conteudo-light"}>
          <Rotas />
        </div>
      </div>
      </>
  );
}

