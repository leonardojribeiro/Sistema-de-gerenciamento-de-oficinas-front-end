import React, { memo, useContext, } from 'react';
import { Box, Grid, Typography, makeStyles, List, ListItemText, ListItem, ListItemSecondaryAction, Tooltip, IconButton } from '@material-ui/core';
import OrdemDeServicoContext from '../../OrdemDeServico/OrdemDeServicoContext';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import { agruparServicosPorFuncionario } from '../../../recursos/Agrupamento';
import { formatarMoeda, formatarTipoGarantia } from '../../../recursos/Formato';

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


function ListagemItensDeServico(): JSX.Element {
  const classes = useStyles();
  const { itensDeServico, valorTotalServicos, alterarItemDeServico, removerItemDeServico } = useContext(OrdemDeServicoContext);

  return (
    <Box className={classes.root}>
      <Box className={classes.listagem} px={1}>
        {
          agruparServicosPorFuncionario(itensDeServico).map((agrupamento, key) =>
            <Grid container key={key} spacing={1}>
              <Grid item>
                <PersonIcon />
              </Grid>
              <Grid item>
                <Typography>{agrupamento.nome}</Typography>
              </Grid>
              <Grid item xs={12}>
                <List dense >
                  {
                    agrupamento.itensDeServico.map((itemDeServico, key) =>
                      <ListItem divider key={key}>
                        <ListItemText
                          primary={itemDeServico.servico.descricao}
                          secondary={
                            <>
                              {`Valor unitário: R$ ${formatarMoeda(itemDeServico.valorUnitario)}. Quantidade: ${itemDeServico.quantidade}. Valor Total: R$ ${formatarMoeda(itemDeServico.valorTotal)}`}
                              <br />
                              {`Garantia: ${itemDeServico.garantia} ${formatarTipoGarantia(itemDeServico.unidadeDeGarantia)}`}
                            </>
                          }
                        />
                        <ListItemSecondaryAction>
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
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  }
                </List>
              </Grid>
            </Grid>
          )
        }
      </Box>
      <Box alignSelf="flex-end" justifySelf="flex-end" py={1}>
        <Typography>{`Valor Total dos serviços: R$${formatarMoeda(valorTotalServicos())}`}</Typography>
      </Box>
    </Box>
  )
}

export default memo(ListagemItensDeServico);