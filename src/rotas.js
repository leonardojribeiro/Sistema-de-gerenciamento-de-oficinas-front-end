import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Marca from './dominios/marca/Marca';
import BarraLateral from './componentes/barra lateral/BarraLateral';
import Rodape from './componentes/rodape';
import './App.css';
import BarraSuperior from './componentes/barra superior/BarraSuperior';
export default function Rotas() {
    const [aberto, setAberto] = useState(false);
    const [logoOficina, setLogoOficina] = useState({});
    const [nomeOficina, setNomeOficina] = useState("");
    useEffect(() => {
        setLogoOficina({
            caminho: "logo192.png",
            alt: "Logomarca da oficina do zé"
        });
        setNomeOficina("Oficina do Zé")
    }, []);
    return (
        <BrowserRouter>
            <BarraSuperior
                nomeOficina={nomeOficina}
                logoOficina={logoOficina}
                menuClique={() => {
                    setAberto(!aberto);
                }} />
            <div className="layout">
                <BarraLateral
                    estaAberta={aberto}
                    nomeOficina={nomeOficina}
                    logoOficina={logoOficina}
                />
                <div className="container-fluid d-flex">
                    <Switch>
                        <Route path="/marca" exact component={Marca} />
                    </Switch>
                </div>
            </div>
            <Rodape />
        </BrowserRouter>
    );
}