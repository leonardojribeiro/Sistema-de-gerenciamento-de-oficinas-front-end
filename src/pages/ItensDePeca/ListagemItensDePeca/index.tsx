import React, { memo, useContext, } from 'react';
import { Box, Grid, Typography, makeStyles, IconButton, Tooltip } from '@material-ui/core';
import OrdemDeServicoContext from '../../OrdemDeServico/OrdemDeServicoContext';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { agruparPecasPorFornecedor } from '../../../recursos/Agrupamento';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:nth-child(odd)': {
      background: theme.palette.background.default,
    },
    '&:nth-child(even)': {
      background: theme.palette.background.paper,
    },
    height: "calc(100% - 64px)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  listagem: {
    height: '100%',
    overflowY: "auto",
  }
}));

const ListagemItensDePeca: React.FC = () => {
  const classes = useStyles();
  const { itensDePeca, removerItemDePeca, alterarItemDePeca, valorTotalPecas } = useContext(OrdemDeServicoContext);

  return (
    <Box className={classes.root}>
      <Box className={classes.listagem}>
        {agruparPecasPorFornecedor(itensDePeca).map((agrupamento, index) => (
          <Box mb={1} key={index} >
            <Typography>De {agrupamento.nomeFantasia}:</Typography>
            <Box ml={1}>
              {agrupamento.itensDePeca?.map((itemDePeca, index) => (
                <Grid key={index} container justify="space-between" alignItems="center" >
                  <Grid item md={4} lg={3}>
                    <Typography>{itemDePeca.peca.descricao}</Typography>
                  </Grid>
                  <Grid item >
                    <Typography>Garantia: {itemDePeca.garantia}</Typography>
                  </Grid>
                  <Grid item >
                    <Typography>Valor unitário: {itemDePeca.valorUnitario}</Typography>
                  </Grid>
                  <Grid item >
                    <Typography>Quantidade: {itemDePeca.quantidade}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Valor total: {itemDePeca.valorTotal}</Typography>
                  </Grid>
                  <Grid item >
                    <Tooltip title={`Alterar `} onClick={() => alterarItemDePeca(itemDePeca._id)}>
                      <IconButton >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={`Excluir `} onClick={() => removerItemDePeca(itemDePeca._id)}>
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
        <Typography>Valor Total:{valorTotalPecas()}</Typography>
      </Box>
    </Box>
  )
}

export default memo(ListagemItensDePeca);