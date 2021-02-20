import React, { useEffect } from 'react';
import Dialog from '../../../componentes/Dialog';
import useQuery from '../../../hooks/useQuery';
import OrdemDeServico from '../../../Types/OrdemDeServico';
import useListagemUnica from '../../../hooks/useListagemUnica';
import { Avatar, Box, createStyles, Divider, Grid, Hidden, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { formatarData, formatarMoeda, formatarPlaca, formatarTipoGarantia } from '../../../recursos/Formato';
import CircularProgressWithLabel from '../../../componentes/CircularProgressWithLabel';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PersonIcon from '@material-ui/icons/Person';
import { agruparPecasPorFornecedor, agruparServicosPorFuncionario } from '../../../recursos/Agrupamento';
import BotaoAlterar from '../../../componentes/BotaoAlterar';

const useStyles = makeStyles(theme =>
  createStyles({
    containerPecasEServicos: {
      position: "relative",
    },
    divider: {
      position: "absolute",
      left: "50%",
      right: "50%",
      [theme.breakpoints.down('sm')]: {
        display: "none"
      }
    },
    containerPecas: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(2)
      }
    },
    containerServicos: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        paddingRight: theme.spacing(2)
      }
    },
    containerValorTotal: {
      alignSelf: 'flex-end',
      justifySelf: 'end',
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

  return (
    <Dialog title="Ordem de serviço" open maxWidth="md" fullWidth>
      {
        item &&
        <>
          <Box my={1}>
            <Grid container alignItems="center" justify="space-between" spacing={2}>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <DriveEtaIcon />
                  </Grid>
                  <Grid item >
                    <Typography>{formatarPlaca(item.veiculo.placa)}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item >
                <Typography>{formatarData(item.dataDeRegistro)}</Typography>
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
            <Grid container justify="space-between">
              <Grid item>
                <Typography>{`Iniciada em ${formatarData(item.dataDeInicio)}.`}</Typography>
              </Grid>
              <Grid item>
                <Typography>{`Finalizada em ${formatarData(item.dataDeConclusao)}.`}</Typography>
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
              <Box my={1}>
                <Typography variant="h6" align="center">Serviços da ordem de serviço</Typography>
              </Box>
              <Divider />
              <Box className={classes.containerServicos}>
                {
                  agruparServicosPorFuncionario(item.itensDeServico).map((agrupamento, key) =>
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
                              </ListItem>
                            )
                          }
                        </List>
                      </Grid>
                    </Grid>
                  )
                }
              </Box>
              <Hidden mdUp>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                  <Typography>{`Valor total dos serviços: R$${formatarMoeda(item.valorTotalDosServicos)}`}</Typography>
                </Box>
                <Divider />
              </Hidden>
            </Grid>
            <Divider orientation="vertical" className={classes.divider} />
            <Grid item xs={12} md={6}>
              <Box my={1}>
                <Typography align="center" variant="h6">Peças da ordem de serviço</Typography>
              </Box>
              <Divider />
              <Box className={classes.containerPecas}>
                {
                  item.itensDePeca && agruparPecasPorFornecedor(item.itensDePeca).map((agrupamento, key) =>
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
                            agrupamento.itensDePeca.map((itemDePeca, key) =>
                              <ListItem divider key={key}>
                                <ListItemText
                                  primary={itemDePeca.peca.descricao}
                                  secondary={
                                    <>
                                      {`Valor unitário: R$ ${formatarMoeda(itemDePeca.valorUnitario)}. Quantidade: ${itemDePeca.quantidade}. Valor Total: R$ ${formatarMoeda(itemDePeca.valorTotal)}`}
                                      <br />
                                      {`Garantia: ${itemDePeca.garantia} ${formatarTipoGarantia(itemDePeca.unidadeDeGarantia)}`}
                                    </>
                                  }
                                />
                              </ListItem>
                            )
                          }
                        </List>

                      </Grid>
                    </Grid>
                  )
                }
              </Box>
              <Hidden mdUp>
                <Box display="flex" justifyContent="flex-end" pb={1}>
                  <Typography>{`Valor total das peças: R$${formatarMoeda(item.valorTotalDasPecas)}`}</Typography>
                </Box>
              </Hidden>
            </Grid>
            <Hidden smDown>
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="flex-end" pr={2} py={1}>
                  <Typography>{`Valor total dos serviços: R$${formatarMoeda(item.valorTotalDosServicos)}`}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="flex-end" pl={2} py={1}>
                  <Typography>{`Valor total das peças: R$${formatarMoeda(item.valorTotalDasPecas)}`}</Typography>
                </Box>
              </Grid>
            </Hidden>
          </Grid>
          <Divider />
          <Box display="flex" flexDirection="column" alignItems="flex-end" py={1}>
            <Typography>{`Valor total das peças e serviços: R$${formatarMoeda(item.valorTotalDasPecas + item.valorTotalDosServicos)}`}</Typography>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column" alignItems="flex-end" py={1}>
            <Typography>{`Desconto: R$${formatarMoeda(item.desconto)}`}</Typography>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column" alignItems="flex-end" py={1}>
            <Typography>{`Valor total da ordem de serviço: R$${formatarMoeda(item.valorTotal)}`}</Typography>
          </Box>
          <BotaoAlterar title="Alterar essa ordem de serviço" linkTo={`/ordensdeservico/alterarordemdeservico?id=${item._id}`} />
        </>

      }
    </Dialog >
  );
}

export default ShowOrdemDeServico;