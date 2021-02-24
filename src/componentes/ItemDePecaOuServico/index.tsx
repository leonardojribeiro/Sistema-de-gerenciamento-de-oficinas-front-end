import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { memo } from 'react';
import Formato from '../../recursos/Formato';

interface ItemDePecaOuServicoProps {
  descricao: string;
  valorUnitario: number;
  quantidade: number;
  valorTotal: number;
}

const ItemDePecaOuServico: React.FC<ItemDePecaOuServicoProps> = ({ descricao, quantidade, valorTotal, valorUnitario }) => {
  return (
    <Grid container justify="space-between" alignItems='center'>
      <Grid item xs={5} md={5}>
        <Typography>{descricao}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>R${Formato.formatarMoeda(valorUnitario)}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>X{quantidade}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Box display='flex' justifyContent='flex-end'>
          <Typography>R${Formato.formatarMoeda(valorTotal)}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default memo(ItemDePecaOuServico);