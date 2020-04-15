import React, { useState, useEffect } from 'react';
import ArrastarESoltar from '../../componentes/arrastar e soltar/ArrastarESoltar';
import "./Marca.css";

export default function MarcaFormulario({ marca, salvar }) {
    const [caminhoImagemPrev, setCaminhoImagemPrev] = useState('');
    const [logomarca, setLogomarca] = useState(null);
    const [descricao, setDescricao] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        if (marca != null) {
            popular();
        }  
    }, [marca]);

    function popular(){
        setId(marca._id);
        setDescricao(marca.descricao);
        onImagem(marca.logomarca);
    }

    const onImagem = imagem => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setCaminhoImagemPrev(reader.result)
        }
        if (imagem[0]) {
            reader.readAsDataURL(imagem[0]);
            setCaminhoImagemPrev(reader.result);
            setLogomarca(imagem[0]);
        }
        else {
            setCaminhoImagemPrev("");
            setLogomarca(null);
        }
    }

    const onImagemBotao = evento => {
        onImagem(evento.target.files);
    }

    const enviar = evento => {
        evento.preventDefault();
        const dados = new FormData();
        dados.append("_id", id);
        dados.append("descricao", descricao);
        dados.append("logomarca", logomarca, logomarca.name);
        salvar(dados);
    }

    const limpar = evento => {
        setDescricao("");
        setLogomarca(null);
        setCaminhoImagemPrev("");
        if (marca) {
            popular();
        }
    }
    return (
        <form method="post" action="">
            <div className="row">
                <div className="col-md-7 col-lg-8 col-xl-9 d-flex flex-column justify-content-around">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="descricao">Descrição da marca:</label>
                                <input
                                    id="descricao"
                                    type="text"
                                    className="form-control"
                                    placeholder="Digite a descrição da marca"
                                    value={descricao}
                                    onChange={e => {
                                        setDescricao(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="d-sm-none">
                                <div className="d-sm-none">
                                    <label htmlFor="imagem" className="btn btn-light form-control">
                                        Selecione uma logomarca
                                        </label>
                                    <input
                                        id="imagem"
                                        className="d-none"
                                        type="file"
                                        accept="image/*"
                                        onChange={onImagemBotao}
                                    />
                                </div>
                                <div className="d-sm-none previa-imagem-container d-flex align-items-center justify-content-center">
                                    {!!caminhoImagemPrev.length && (
                                        <img
                                            className="img-fluid previa-imagem my-auto mx-auto"
                                            src={caminhoImagemPrev}
                                            alt="Prévia da logomarca"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col my-2">
                            <div className="d-none d-sm-flex d-md-none justify-content-center">
                                <ArrastarESoltar onImagem={onImagem} imagem={caminhoImagemPrev} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <input
                                    type="reset"
                                    className="form-control"
                                    value="Limpar campos"
                                    onClick={limpar}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <input
                                    type="submit"
                                    className="form-control"
                                    value="Salvar"
                                    onClick={enviar}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-lg-4 col-xl-3">
                    <div className="d-none d-md-block">
                        <div className="d-none d-sm-flex justify-content-center m-2">
                            <ArrastarESoltar onImagem={onImagem} imagem={caminhoImagemPrev} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
