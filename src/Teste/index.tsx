import React, { useEffect, useCallback, useState } from 'react';
import { useContext } from 'react';
import ApiContext from '../contexts/ApiContext';
import Marca from '../Types/Marca';

// import { Container } from './styles';

function Teste() {
  const [marcas, setMarcas] = useState<Marca[]>([])
  const { post, get } = useContext(ApiContext);

  const preencher = useCallback(async () => {
    const marcas = await get('marca') as Marca[];
    setMarcas(marcas)
    for (let i = 0; i < 10000; i++) {
      await post('peca',{
        descricao: Math.random().toString(36).substr(2, 5),
        marca: marcas[i % marcas.length]._id
      })
    }

  }, [get, post]);

  console.log(marcas)

  useEffect(() => {
   // preencher();
  }, [preencher])

  return <div />;
}

export default Teste;