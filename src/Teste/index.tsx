import React, { useEffect, useCallback, useState } from 'react';
import { useContext } from 'react';
import ApiContext from '../contexts/ApiContext';
import Marca from '../Types/Marca';

// import { Container } from './styles';

function Teste() {
  const [marcas, setMarcas] = useState<Marca[]>([])
  const { post, get } = useContext(ApiContext);

  const preencher = useCallback(async () => {

    for (let i = 0; i < 10000; i++) {
      //console.log({
      await post('cliente', {
        nome: Math.random().toString(36).replace(/[^a-z]+/g, ''),
        dataNascimento: new Date(new Date().getTime() * Math.random()),
        sexo: Math.random() > 0.5 ? "m" : "f",
        cpfCnpj: Math.random().toString(36).replace(/[^a-z]+/g, ''),
        telefoneFixo: Math.random().toString(36).replace(/[^a-z]+/g, ''),
        telefoneCelular: Math.random().toString(36).replace(/[^a-z]+/g, ''),
        email: Math.random().toString(36).replace(/[^a-z]+/g, ''),
        endereco: {
          logradouro: Math.random().toString(36).replace(/[^a-z]+/g, ''),
          numero: Math.random().toString(36).replace(/[^a-z]+/g, ''),
          bairro: Math.random().toString(36).replace(/[^a-z]+/g, ''),
          cep: Math.random().toString(36).replace(/[^a-z]+/g, ''),
          complemento: Math.random().toString(36).replace(/[^a-z]+/g, ''),
          cidade: Math.random().toString(36).replace(/[^a-z]+/g, ''),
          estado: Math.random().toString(36).replace(/[^a-z]+/g, ''),
        }
      })
      // })
    }
    console.log(new Date(new Date().getTime() * Math.random()));
    console.log(Math.random().toString(36).replace(/[^a-z]+/g, ''))
  }, [get, post]);

  console.log(marcas)

  useEffect(() => {
    //preencher();
  }, [preencher])

  return <div />;
}

export default Teste;