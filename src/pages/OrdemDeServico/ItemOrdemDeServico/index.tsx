import React, { memo } from 'react';
import { Grid, Paper, Typography, Box, Card, makeStyles, IconButton, Tooltip } from '@material-ui/core';
import Formato from '../../../recursos/Formato';
import OrdemDeServico from '../../../Types/OrdemDeServico';
import CircularProgressWithLabel from '../../../componentes/CircularProgressWithLabel';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { agruparPecasPorFornecedor, agruparServicosPorFuncionario } from '../../../recursos/Agrupamento';
import ItemDePecaOuServico from '../../../componentes/ItemDePecaOuServico';

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: "400px",
  },
  containerListagem: {
    background: theme.palette.action.hover,
  },
  tituloListagem: {
    display: "flex",
    justifyContent: "center",
  },
  listagem: {
    [theme.breakpoints.up("md")]: {
      minHeight: "200px"
    },
    '&>div>div>div:nth-child(2n+2)': {
      background: theme.palette.background.paper
    },
  },
  containerValorTotalListagem: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: theme.spacing(1)
  },
  agrupamentoItem: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  }
}));

interface ItemOrdemDeServicoProps {
  ordemDeServico: OrdemDeServico;
}


const ItemOrdemDeServico: React.FC<ItemOrdemDeServicoProps> = ({ ordemDeServico }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={11} lg={10} xl={8}>
      <Card className={classes.card} component={Paper} elevation={4}>
        <Paper elevation={4} square>
          <Box p={2}>
            <Grid container spacing={1} justify="space-between" alignItems="center">
              {ordemDeServico.veiculo?.placa && (
                <Grid item>
                  <Typography>Veículo: {ordemDeServico.veiculo?.placa.toLocaleUpperCase()}</Typography>
                </Grid>
              )}
              <Grid item>
                <CircularProgressWithLabel value={Number(ordemDeServico.andamento)} />
              </Grid>
              <Grid item>
                <Tooltip title={`Alterar a ordem de servico do veículo ${ordemDeServico.veiculo.placa}`}>
                  <IconButton component={Link} to={`/ordensdeservico/alterarordemdeservico?id=${ordemDeServico._id}`}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <Box p={2}>
          <Grid container spacing={1} justify="space-between">
            <Grid item xs={12}>
              <Typography>Sintoma: {ordemDeServico.sintoma}</Typography>
            </Grid>
            <Grid item>
              <Typography>Registrada em: {Formato.formatarData(ordemDeServico.dataDeRegistro)}</Typography>
            </Grid>
            <Grid item>
              <Typography>Iniciada em: {Formato.formatarData(ordemDeServico.dataDeInicio)}</Typography>
            </Grid>
            {ordemDeServico.dataDeConclusao &&
              <Grid item>
                <Typography>Finalizada em: {Formato.formatarData(ordemDeServico.dataDeConclusao)}</Typography>
              </Grid>
            }
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <div className={classes.containerListagem}>
                <div className={classes.tituloListagem}>
                  <Typography>Peças:</Typography>
                </div>
                <div className={classes.listagem}>
                  {
                    ordemDeServico.itensDePeca && agruparPecasPorFornecedor(ordemDeServico.itensDePeca)?.map((agrupamento, index) => (
                      <div key={index} >
                        <Typography>De {agrupamento.nomeFantasia}:</Typography>
                        <div className={classes.agrupamentoItem}>
                          {agrupamento.itensDePeca?.map((itemDePeca, index) => (
                            <ItemDePecaOuServico
                              key={index}
                              descricao={itemDePeca.peca.descricao}
                              valorUnitario={itemDePeca.valorUnitario}
                              valorTotal={itemDePeca.valorTotal}
                              quantidade={itemDePeca.quantidade}
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className={classes.containerValorTotalListagem}>
                  <Typography>Valor Total: R${Formato.formatarMoeda(ordemDeServico.valorTotalDasPecas)}</Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.containerListagem}>
                <div className={classes.tituloListagem}>
                  <Typography>Serviços:</Typography>
                </div>
                <div className={classes.listagem}>
                  {
                    agruparServicosPorFuncionario(ordemDeServico.itensDeServico)?.map((agrupamento, index) => (
                      <div key={index} >
                        <Typography>Por {agrupamento.nome}:</Typography>
                        <div className={classes.agrupamentoItem}>
                          {agrupamento.itensDeServico?.map((itemDeServico, index) => (
                            <ItemDePecaOuServico
                              key={index}
                              descricao={itemDeServico.servico.descricao}
                              valorUnitario={itemDeServico.valorUnitario}
                              valorTotal={itemDeServico.valorTotal}
                              quantidade={itemDeServico.quantidade}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
                <div className={classes.containerValorTotalListagem}>
                  <Typography>Valor Total: R${Formato.formatarMoeda(ordemDeServico.valorTotalDosServicos)}</Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} justify="flex-end">
                <Grid item>
                  <Typography>Desconto: R${Formato.formatarMoeda(ordemDeServico.desconto)}</Typography>
                </Grid>
                <Grid item>
                  <Typography>Valor total da ordem de serviço: R${Formato.formatarMoeda(ordemDeServico.valorTotal)}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Grid >
  );
}

export default memo(ItemOrdemDeServico);