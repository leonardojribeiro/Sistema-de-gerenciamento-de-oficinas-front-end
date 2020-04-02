import React from 'react';
import { Navbar, Nav, ListGroup, ListGroupItem, Collapse } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom'
import './BarraLateral.css'
import { Button } from 'react-bootstrap';

export default function BarraLateral({ estaAberta, nomeOficina, logoOficina}) {
    return (
        <div className={estaAberta ? "barraLateral ba" : "barraLateral"}>
            <div className="d-none d-sm-block">
                <div className="areaLogo">
                    <img className="logoOficina" src={logoOficina.caminho} alt={logoOficina.alt} />
                </div>
                <div className="nomeOficina">
                    {nomeOficina}
                </div>
            </div>
            <ListGroup className="m-2">

                <Link to="" className="list-group-item-action bg-light my-1">Início</Link>
                <Link to="marca" className=" list-group-item-action bg-light my-1">Marcas</Link>
                <a href="#" className="list-group-item-action bg-light my-1">Events</a>
                <a href="#" className="list-group-item-action bg-light my-1">Profile</a>
                <a href="#" className="list-group-item-action bg-light my-1">Status</a>
            </ListGroup>
        </div>
    );
}