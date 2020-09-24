import React, { memo, useContext, } from 'react';
import { Box, Grid, Typography, makeStyles, Tooltip, IconButton } from '@material-ui/core';
import OrdemDeServicoContext from '../../OrdemDeServico/OrdemDeServicoContext';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { agruparServicosPorFuncionario } from '../../../recursos/Agrupamento';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:nth-child(odd)': {
      background: theme.palette.background.default,
    },
    '&:nth-child(even)': {
      background: theme.palette.background.paper,
    },
    height: "100%",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  listagem: {
    height: '100%',
    overflowY: "auto",
  }
}));

const ListagemItensDeServico: React.FC = () => {
  const classes = useStyles();
  const { itensDeServico, valorTotalServicos, alterarItemDeServico, removerItemDeServico } = useContext(OrdemDeServicoContext);
  return (
    <Box className={classes.root}>
      <Box className={classes.listagem}>
        {agruparServicosPorFuncionario(itensDeServico).map((agrupamento, index) => (
          <Box mb={1} key={index} >
          <Typography>De {agrupamento.nome}:</Typography>
          <Box ml={1}>
            {agrupamento.itensDeServico?.map((itemDeServico, index) => (
              <Grid key={index} container justify="space-between" alignItems="center" >
                <Grid item md={4} lg={3}>
                  <Typography>{itemDeServico.servico.descricao}</Typography>
                </Grid>
                <Grid item >
                  <Typography>Garantia: {itemDeServico.garantia}</Typography>
                </Grid>
                <Grid item >
                  <Typography>Valor unitário: {itemDeServico.valorUnitario}</Typography>
                </Grid>
                <Grid item >
                  <Typography>Quantidade: {itemDeServico.quantidade}</Typography>
                </Grid>
                <Grid item>
                  <Typography>Valor total: {itemDeServico.valorTotal}</Typography>
                </Grid>
                <Grid item >
                  <Tooltip title={`Alterar `} onClick={() => alterarItemDeServico(itemDeServico._id)}>
                    <IconButton >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={`Excluir `} onClick={() => removerItemDeServico(itemDeServico._id)}>
                    <IconButton >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Box>
        ))}
      </Box>
      <Box alignSelf="flex-end" justifySelf="flex-end">
        <Typography>Valor Total:{valorTotalServicos()}</Typography>
      </Box>
    </Box>
  )
}

export default memo(ListagemItensDeServico);