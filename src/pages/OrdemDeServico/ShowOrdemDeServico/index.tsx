import React, { useEffect } from 'react';
import Dialog from '../../../componentes/Dialog';
import useQuery from '../../../hooks/useQuery';
import OrdemDeServico from '../../../Types/OrdemDeServico';
import useListagemUnica from '../../../hooks/useListagemUnica';
import { Avatar, Box, createStyles, Divider, Grid, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Formato from '../../../recursos/Formato';
import CircularProgressWithLabel from '../../../componentes/CircularProgressWithLabel';
import datefns from '@date-io/date-fns';
import ptLocale from "date-fns/locale/pt-BR";
import { agruparPecasPorFornecedor, agruparServicosPorFuncionario } from '../../../recursos/Agrupamento';

const useStyles = makeStyles(theme =>
  createStyles({
    containerPecasEServicos: {
      position: "relative",
    },
    divider: {
      position: "absolute",
      left: "50%",
      right: "50%",
      [theme.breakpoints.down('sm')]:{
        display: "none"
      }
    }
  })
)

function ShowOrdemDeServico(): JSX.Element {
  const classes = useStyles();
  const id = useQuery('id');
  const { listar, item } = useListagemUnica<OrdemDeServico>('ordemdeservico', id);
  useEffect(() => {
    listar()
  }, [listar])

  console.log(item)
  return (
    <Dialog title="Ordem de serviço" open maxWidth="md" fullWidth>
      {
        item && (
          <>
            <Box my={1}>
              <Grid container alignItems="center" justify="space-between" spacing={2}>
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <DriveEtaIcon />
                    </Grid>
                    <Grid item >
                      <Typography>{Formato.formatarPlaca(item.veiculo.placa)}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item >
                  <Typography>{new datefns({ locale: ptLocale }).format(new Date(item.dataDeRegistro), "PPPP")}</Typography>
                </Grid>
                <Grid item>
                  <Avatar>
                    <CircularProgressWithLabel value={item.andamento} />
                  </Avatar>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box my={1}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography>{`Sintoma: ${item.sintoma}`}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Grid container className={classes.containerPecasEServicos}>
              <Grid item xs={12} md={6}>
                <Box pr={2}>
                  {
                    agruparServicosPorFuncionario(item.itensDeServico).map((agrupamento, key) => (
                      <Grid container key={key}>
                        <Grid item>
                          <DriveEtaIcon />
                        </Grid>
                        <Grid item>
                          <Typography>{agrupamento.nome}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <List>
                            {
                              agrupamento.itensDeServico.map((itemDeServico, key) => (
                                <ListItem divider key={key}>
                                  <ListItemText
                                    primary={itemDeServico.servico.descricao}
                                    secondary={
                                      <>
                                        {`Valor unitário: R$ ${Formato.formatarMoeda(itemDeServico.valorUnitario)}. Quantidade: ${itemDeServico.quantidade}. Valor Total: R$ ${Formato.formatarMoeda(itemDeServico.valorTotal)}`}
                                        <br />
                                        {`Garantia: ${itemDeServico.garantia} ${Formato.formatarTipoGarantia(itemDeServico.unidadeDeGarantia)}`}
                                      </>
                                    }
                                  />
                                </ListItem>
                              ))
                            }
                          </List>
                        </Grid>
                      </Grid>
                    ))
                  }
                </Box>
              </Grid>
              <Divider orientation="vertical" className={classes.divider} />
              <Grid item xs={12} md={6}>
                <Box pl={2}>
                  {
                    item.itensDePeca && agruparPecasPorFornecedor(item.itensDePeca).map((agrupamento, key) => (
                      <Grid container key={key}>
                        <Grid item>
                          <DriveEtaIcon />
                        </Grid>
                        <Grid item>
                          <Typography>{agrupamento.nomeFantasia}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <List>
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
                                </ListItem>
                              ))
                            }
                          </List>

                        </Grid>
                      </Grid>
                    ))
                  }
                </Box>
              </Grid>
            </Grid>
          </>
        )
      }
    </Dialog >
  );
}

export default ShowOrdemDeServico;