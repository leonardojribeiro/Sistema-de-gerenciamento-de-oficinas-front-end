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
        valor: 1,
        tempoDuracao: 25
      } )

    },1000);
  }, [post]);


  useEffect(() => {
  preencher();
  }, [preencher])


  return (<div />);
}

export default Teste;