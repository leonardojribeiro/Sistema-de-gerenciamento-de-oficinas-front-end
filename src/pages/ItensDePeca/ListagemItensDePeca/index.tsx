import React, { memo, useContext, } from 'react';
import { Box, Grid, Typography, makeStyles, IconButton, Tooltip, ListItemSecondaryAction, ListItemText, ListItem, List } from '@material-ui/core';
import OrdemDeServicoContext from '../../OrdemDeServico/OrdemDeServicoContext';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { agruparPecasPorFornecedor } from '../../../recursos/Agrupamento';
import Formato from '../../../recursos/Formato';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

const useStyles = makeStyles((theme) => ({
  root: {
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
      <Box className={classes.listagem} px={1}>
        {agruparPecasPorFornecedor(itensDePeca).map((agrupamento, key) => (
          <Grid container key={key} spacing={1}>
            <Grid item>
              <LocalShippingIcon />
            </Grid>
            <Grid item>
              <Typography>{agrupamento.nomeFantasia}</Typography>
            </Grid>
            <Grid item xs={12}>
              <List dense>
                {
                  agrupamento.itensDePeca.map((itemDePeca, key) => (
                    <ListItem divider key={key}>
                      <ListItemText
                        primary={itemDePeca.peca.descricao}
                        secondary={
                          <>
                            {`Valor unitário: R$ ${Formato.formatarMoeda(itemDePeca.valorUnitario)}. Quantidade: ${itemDePeca.quantidade}. Valor Total: R$ ${Formato.formatarMoeda(itemDePeca.valorTotal)}`}
                            <br />
                            {`Garantia: ${itemDePeca.garantia} ${Formato.formatarTipoGarantia(itemDePeca.unidadeDeGarantia)}`}
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
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
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                }
              </List>
            </Grid>
          </Grid>
        ))
        }
      </Box>
      <Box alignSelf="flex-end" justifySelf="flex-end" py={1}>
        <Typography>{`Valor Total das peças: R$${Formato.formatarMoeda(valorTotalPecas())}`}</Typography>
      </Box>
    </Box>
  )
}

export default memo(ListagemItensDePeca);