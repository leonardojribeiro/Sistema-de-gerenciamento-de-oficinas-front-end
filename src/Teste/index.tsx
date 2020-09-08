import React, { useEffect, useCallback, useState } from 'react';
import { useContext } from 'react';
import ApiContext from '../contexts/ApiContext';
import Marca from '../Types/Marca';

// import { Container } from './styles';

function Teste() {
  const [marcas, setMarcas] = useState<Marca[]>([])
  const { post, get } = useContext(ApiContext);

  const preencher = useCallback(async () => {
    const resposta = await get('marca?limite=100&pagina=1') as any;
    setMarcas(resposta.marcas as Marca[])
    for (let i = 0; i < 1000; i++) {
      //console.log({
      await post('marca',{
        descricao: Math.random().toString(36).substr(2, 5),
        //marca: resposta.marcas[i % resposta.marcas.length]._id
      })
     // })
    }

  }, [get, post]);

  console.log(marcas)

  useEffect(() => {
   // preencher();
  }, [preencher])

  return <div />;
}

export default Teste;