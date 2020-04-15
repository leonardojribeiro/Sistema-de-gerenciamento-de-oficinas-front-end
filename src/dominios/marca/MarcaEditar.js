import React, { useState } from 'react';
import api from '../../servicos/api';

import "./Marca.css";
import Formulario from './Formulario';
import { useEffect } from 'react';
import QueryParametros from '../../recursos/QueryParametros';



export default function MarcaEditar() {
    const [marca, setMarca] = useState(null);
    const id = QueryParametros().get("_id");
    async function listar() {
        const resposta = (await api.get(`marca/id/?_id=${id}`)).data.marca;
        const req = new XMLHttpRequest();
        req.open('GET', resposta.caminhoLogo, true);
        req.responseType = 'blob';
        req.onload = () => {
            setMarca({
                _id: resposta._id,
                descricao: resposta.descricao,
                logomarca: [req.response]
            });
        }
        req.send();

    }
    useEffect(() => {
        listar();
    }, []);

    const salvar = dados => {
        console.log(dados);
    }

    return (
        <div className="altura-maxima d-flex justify-content-center align-items-center">
            <div className="container">
                <Formulario marca={marca} salvar={salvar} />
            </div>
        </div>
    );
}