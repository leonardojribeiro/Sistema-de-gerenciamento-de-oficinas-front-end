import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Marca from './dominios/marca/Marca';
import MarcaEditar from './dominios/marca/MarcaEditar.js';

export default function Rotas() {
    return (
        <Switch>
            <Route path="/marca" exact component={Marca} />
            <Route path="/marca/editar"  component={MarcaEditar} />
        </Switch>
    );
}