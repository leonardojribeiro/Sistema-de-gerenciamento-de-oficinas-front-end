import React from 'react';
import { useRef } from 'react';
import { Button } from '@material-ui/core';
import Scope from './Formulario/Scope';
import CampoTelefone from './Formulario/Campos/CampoTelefone';
import Form from './Formulario/Form';
import CampoTexto from './Formulario/Campos/CampoTexto';
import CampoSenha from './Formulario/Campos/CampoSenha';

function Teste() {
  const ref = useRef();

  function click() {
    ref.current.validar();
    console.log(ref.current.parseFormData())
  }

  return (
    <>
      <Form ref={ref}>
        <CampoTexto nome="nome" />
        <CampoTexto nome="cpf " required />
        <Scope path="contato">
          <CampoTelefone nome="telefone" />
        </Scope>
        <CampoSenha nome="senha" required/>
        <Button onClick={() => click()} >enviar</Button>
      </Form>
    </>
  );
}

export default Teste;