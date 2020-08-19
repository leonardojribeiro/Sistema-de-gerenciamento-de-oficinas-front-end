import React, { memo, useContext, } from 'react';
import { Box, Grid, Typography, makeStyles } from '@material-ui/core';
import OrdemDeServicoContext from '../../OrdemDeServicoContext';


const useStyles = makeStyles((theme) => ({
  root: {
    '&:nth-child(odd)': {
      background: theme.palette.background.default,
    },
    '&:nth-child(even)': {
      background: theme.palette.background.paper,
    },
    height: "60%",
    overflowY: "scroll"
  }
}));

const ListagemItensDeServico: React.FC = () => {
  const classes = useStyles();
  const { itensDeServico } = useContext(OrdemDeServicoContext);
  return (
    <Box className={classes.root}>
      {itensDeServico.map((itemDeServico, indice) => (
        <Grid key={indice} container justify="space-between" >
          <Grid item>
            <Typography>Peça: {itemDeServico.servico.descricao}</Typography>
          </Grid>
          <Grid item>
            <Typography>Fornecedor: {itemDeServico.funcionario.nome}</Typography>
          </Grid>
          <Grid item>
            <Typography>Garantia: {itemDeServico.garantia}</Typography>
          </Grid>
          <Grid item>
            <Typography>Valor unitário: {itemDeServico.valorUnitario}</Typography>
          </Grid>
          <Grid item>
            <Typography>Quantidade: {itemDeServico.quantidade}</Typography>
          </Grid>
          <Grid item>
            <Typography>Valor total: {itemDeServico.valorTotal}</Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
  )
}

export default memo(ListagemItensDeServico);