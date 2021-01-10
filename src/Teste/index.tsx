import React, { useCallback, useEffect, } from 'react';
import { useContext } from 'react';
import ApiContext from '../contexts/ApiContext';
//import { io } from 'socket.io-client'

// import { Container } from './styles';

function Teste() {
  const { post,  } = useContext(ApiContext);

  const preencher = useCallback(async () => {

    setInterval(async()=>{

      await post('servico', {
        descricao: Math.random().toString(36).replace(/[^a-z]+/g, ''),
        valor: Math.random()*1000,
        tempoDuracao: Math.random()*10000
      } )

    },300);
  }, [post]);


  useEffect(() => {
  preencher();
  }, [preencher])


  return (<div />);
}

export default Teste;