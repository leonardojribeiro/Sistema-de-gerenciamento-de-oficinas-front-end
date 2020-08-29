import React, { memo, useContext, } from 'react';
import { Box, Grid, Typography, makeStyles, IconButton, Tooltip } from '@material-ui/core';
import OrdemDeServicoContext from '../../OrdemDeServico/OrdemDeServicoContext';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:nth-child(odd)': {
      background: theme.palette.background.default,
    },
    '&:nth-child(even)': {
      background: theme.palette.background.paper,
    },
    height: "100%",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
  },
  listagem: {
    height: '100%',
    overflowY: "scroll",
  }
}));

const ListagemItensDePeca: React.FC = () => {
  const classes = useStyles();
  const { itensDePeca, removerItemDePeca, alterarItemDePeca, valorTotalPecas } = useContext(OrdemDeServicoContext);

  return (
    <Box className={classes.root}>
      <Box className={classes.listagem}>
        {itensDePeca.map((itemDePeca, indice) => (
          <Grid key={indice} container justify="space-between" alignItems="center" >
            <Grid item>
              <Typography>Peça: {itemDePeca.peca.descricao}</Typography>
            </Grid>
            <Grid item>
              <Typography>Fornecedor: {itemDePeca.fornecedor.nomeFantasia}</Typography>
            </Grid>
            <Grid item>
              <Typography>Garantia: {itemDePeca.garantia}</Typography>
            </Grid>
            <Grid item>
              <Typography>Valor unitário: {itemDePeca.valorUnitario}</Typography>
            </Grid>
            <Grid item>
              <Typography>Quantidade: {itemDePeca.quantidade}</Typography>
            </Grid>
            <Grid item>
              <Typography>Valor total: {itemDePeca.valorTotal}</Typography>
            </Grid>
            <Grid item>
              <Tooltip title={`Alterar `} onClick={() => alterarItemDePeca(indice)}>
                <IconButton >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={`Excluir `} onClick={() => removerItemDePeca(indice)}>
                <IconButton >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Box alignSelf="flex-end" justifySelf="flex-end">
        <Typography>Valor Total:{valorTotalPecas()}</Typography>
      </Box>
    </Box>
  )
}

export default memo(ListagemItensDePeca);