import React, { useState, useEffect } from 'react';

import { Toast } from 'react-bootstrap';
import './ToastFlutuante.css';

export default function ToastFlutuante({ exibir, tempo, titulo, mensagem, subtitulo }) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(exibir);
    }, [exibir])
    return (
        <div className="toast-fultuante-container">
            <Toast onClose={() => setShow(false)} show={show} delay={tempo} autohide className="toast-fultuante">
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                    />
                    <strong className="mr-auto">{titulo}</strong>
                    <small>{subtitulo}</small>
                </Toast.Header>
                <Toast.Body>{mensagem}</Toast.Body>
            </Toast>
        </div>
    );
}
