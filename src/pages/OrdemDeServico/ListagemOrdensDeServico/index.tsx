import React, { useState, useEffect, useCallback, useContext, memo } from 'react';
import OrdemDeServico from '../../../Types/OrdemDeSertvico';
import ApiContext from '../../../contexts/ApiContext';
import { Grid } from '@material-ui/core';
import ItemOrdemDeServico from './ItemOrdemDeServico';


const ListagemOrdensDeServico: React.FC = () => {
  const [ordensDeServico, setOrdensDeservico] = useState<OrdemDeServico[]>([]);
  const { get } = useContext(ApiContext);

  const listar = useCallback(async () => {
    const ordensDeServico = await get('ordemdeservico') as OrdemDeServico[];
    if (ordensDeServico) {
      setOrdensDeservico(ordensDeServico);
    }

  }, [get]);

  useEffect(() => {
    listar();
  }, [listar]);
  console.log(ordensDeServico)


  return (
    <Grid container spacing={3} justify="center">
      {
        
          <ItemOrdemDeServico  ordemDeServico={ ordensDeServico.length ? ordensDeServico[1] : {} as OrdemDeServico}/>
        
      }
    </Grid >
  );
}

export default memo(ListagemOrdensDeServico);