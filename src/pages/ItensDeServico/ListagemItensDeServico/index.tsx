import React, { memo, useContext, } from 'react';
import { Box, Grid, Typography, makeStyles, Tooltip, IconButton } from '@material-ui/core';
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

const ListagemItensDeServico: React.FC = () => {
  const classes = useStyles();
  const { itensDeServico, valorTotalServicos, alterarItemDeServico, removerItemDeServico } = useContext(OrdemDeServicoContext);
  return (
    <Box className={classes.root}>
      <Box className={classes.listagem}>
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
            <Grid item>
              <Tooltip title={`Alterar `} onClick={() => alterarItemDeServico(indice)}>
                <IconButton >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={`Excluir `} onClick={() => removerItemDeServico(indice)}>
                <IconButton >
                  <DeleteIcon/>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Box alignSelf="flex-end" justifySelf="flex-end">
        <Typography>Valor Total:{valorTotalServicos()}</Typography>
      </Box>
    </Box>
  )
}

export default memo(ListagemItensDeServico);