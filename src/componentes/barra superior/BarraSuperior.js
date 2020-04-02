import React from 'react';
import { Navbar, Button, } from 'react-bootstrap';
//import { Link, NavLink } from 'react-router-dom'
import './BarraSuperior.css'
//import { Button } from 'react-bootstrap';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function BarraSuperior({nomeOficina, logoOficina, menuClique}) {
    return (
        <div className="d-sm-none">
            <Navbar bg="light" className="justify-content-between">
                <Navbar.Brand>
                    <img className="logoOficina" src={logoOficina.caminho} alt={logoOficina.alt}/>
                </Navbar.Brand>
                <Navbar.Brand>{nomeOficina}</Navbar.Brand>
                <Button onClick={()=>{menuClique()}}><Icon name="menu"/></Button>
            </Navbar>
        </div>
    );
};