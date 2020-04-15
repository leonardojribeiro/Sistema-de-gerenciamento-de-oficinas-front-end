import React from 'react';
import { Navbar} from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';
import './BarraSuperior.css';

export default function BarraSuperior({ nomeOficina, logoOficina, menuPressionado }) {
    return (
        <div className="d-sm-none">
            <Navbar bg="light" className="justify-content-between">
                <Navbar.Brand>
                    <img className="logo-oficina-superior" src={logoOficina.caminho} alt={logoOficina.alt} />
                </Navbar.Brand>
                <Navbar.Brand>{nomeOficina}</Navbar.Brand>
                <div
                    className="btn btn-light botao-menu"
                    onClick={() => { menuPressionado() }}
                >
                    <Icon fontSize="large" className="icone-menu">menu</Icon>
                </div>
            </Navbar>
        </div>
    );
};