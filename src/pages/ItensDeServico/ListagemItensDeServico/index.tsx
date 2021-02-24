import React, { memo, useContext, } from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
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