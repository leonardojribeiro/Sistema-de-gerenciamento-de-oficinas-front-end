import React, { useState, useEffect, useCallback, useContext, memo } from 'react';
import OrdemDeServico from '../../../Types/OrdemDeServico';
import ApiContext from '../../../contexts/ApiContext';
import { Grid } from '@material-ui/core';
import ItemOrdemDeServico from '../ItemOrdemDeServico';
import { useLocation } from 'react-router-dom';


const ListagemOrdensDeServico: React.FC = () => {
  const [ordensDeServico, setOrdensDeservico] = useState<OrdemDeServico[]>([]);
  const { get } = useContext(ApiContext);

  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const ordensDeServico = await get('ordemdeservico') as OrdemDeServico[];
    if (ordensDeServico) {
      setOrdensDeservico(ordensDeServico);
    }

  }, [get]);

  useEffect(() => {
    if (pathname === "/") {
      listar();
    }
  }, [listar, pathname]);

  return (
    <Grid container spacing={3} justify="center">
      {
        ordensDeServico.map((ordemDeServico, indice) =>
          <ItemOrdemDeServico ordemDeServico={ordemDeServico} key={indice} />
        )
      }
    </Grid >
  );
}

export default memo(ListagemOrdensDeServico);