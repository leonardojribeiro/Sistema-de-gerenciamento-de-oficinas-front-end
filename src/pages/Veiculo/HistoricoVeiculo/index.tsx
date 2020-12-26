import { Box, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Dialog from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import useQuery from '../../../hooks/useQuery';
import OrdemDeServico from '../../../Types/OrdemDeServico';
import ItemOrdemDeServico from '../../OrdemDeServico/ItemOrdemDeServico';

// import { Container } from './styles';

const HistoricoVeiculo: React.FC = () => {
  const veiculo = useQuery('veiculo');
  const [ordensDeServico, setOrdensDeServico] = useState<OrdemDeServico[]>();
  const { get } = useContext(ApiContext);

  const listar = useCallback(async () => {
    const resposta = await get(`/ordemdeservico/veiculo?veiculo=${veiculo}`) as any;
    if (resposta) {
      setOrdensDeServico(resposta.ordensDeServico as OrdemDeServico[]);
    }
  }, [get, veiculo]);

  useEffect(() => {
    listar();
  }, [listar]);


  return (
    <Dialog title="Histórico do veículo" open fullScreen>
      <Grid container spacing={3} justify="center">
        <Box p={2}>
          <Typography variant="h6">Ordens de Serviço efetuadas neste veículo:</Typography>
        </Box>
        {ordensDeServico?.map((ordemDeServico, index) => (
          <ItemOrdemDeServico ordemDeServico={ordemDeServico} key={index} />
        ))}
      </Grid>
    </Dialog>
  );
}

export default HistoricoVeiculo;