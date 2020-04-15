import React, { useState, useEffect } from 'react';
import "./Marca.css";
import api from '../../servicos/api';
import Formulario from "./Formulario";
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
export default function Marca() {
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        listar();
    }, []);

    async function listar() {
        setMarcas((await api.get("marca")).data.marca);
    }

    async function salvar(dados) {
        await api.post("marca", dados);
        listar();
        console.log("salvou");
    }

    const buscar = async evento => {
        setMarcas((await api.get(`marca/descricao/?descricao=${evento.target.value}`)).data.marca)
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="container">
                        <div className="p-3 border d-flex flex-column align-item justify-content-center">
                            <div className="align-self-center">Cadastrar marca</div>
                            <Formulario salvar={(dados) => salvar(dados)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="container">
                        <div className="p-3 mt-5 border">
                            <div className="row m-1 mb-4 border p-2">
                                <div className="col">
                                    <div className="form-group m-1">
                                        <label htmlFor="busca">Buscar por marcas</label>
                                        <input
                                            id="busca"
                                            type="text"
                                            className="form-control"
                                            placeholder="Digite a descrição"
                                            onChange={e => { buscar(e) }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row marca-item  m-2 border">
                                <div className="col-5 d-flex justify-content-center align-items-center ">
                                    Descrição
                                </div>
                                <div className="col-5 d-flex justify-content-center align-items-center">
                                    Logomarca
                                </div>
                                <div className="col-2 d-flex justify-content-center align-items-center">
                                    Editar
                                </div>
                            </div>
                            {marcas.map((marca, key) => (
                                <div key={key} className="row marca-item shadow  m-2 border">
                                    <div className="col-5 d-flex justify-content-center align-items-center ">
                                        {marca.descricao}
                                    </div>
                                    <div className="col-5 d-flex justify-content-center align-items-center">
                                        <img className="marca-item-imagem" src={marca.caminhoLogo} alt={"logomarca $marca"} />
                                    </div>
                                    <div className="col-2 d-flex justify-content-center align-items-center">
                                        <Link to={`/marca/editar?_id=${marca._id}`}>
                                            <Icon title="Editar" >edit</Icon>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
