import React from "react";

import Dropzone from "react-dropzone";
import './style.css';

export default function ArrastarESoltar({ onImagem, imagem, id }) {
    return (
        <Dropzone accept="image/*" multiple={false} onDropAccepted={onImagem}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
                let dropC;
                let mensagem;
                let dropClCon;
                dropClCon = "container-drag msg-sucesso";
                mensagem = "Solte a imagem aqui.";
                dropC = "drag drag-sucesso"
                if (!isDragActive) {
                    dropClCon = "container-drag msg-padrao";
                    mensagem = "Arraste e solte a logomarca aqui.";
                    dropC = "drag"
                }
                if (isDragReject) {
                    dropClCon = "container-drag msg-erro";
                    mensagem = "Arquivo não suportado!";
                    dropC = "drag drag-rejeicao"
                }
                return (
                    <div className={dropC} {...getRootProps()}>
                        <input {...getInputProps()} id={id} />
                        <div className={dropClCon}>
                            {!!imagem.length && (
                                <img className="imagem-drag img-fluid" src={imagem} alt="Prévia" />
                            )}
                            <div className="container-msg-drag">
                                <div className="msg-drag">{mensagem}</div>
                            </div>
                        </div>
                    </div>
                )
            }}
        </Dropzone>
    );
}