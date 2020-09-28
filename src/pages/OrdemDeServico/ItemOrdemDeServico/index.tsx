import React, { memo } from 'react';
import { Grid, Paper, Typography, Box, Card, makeStyles, IconButton, Tooltip } from '@material-ui/core';
import Formato from '../../../recursos/Formato';
import OrdemDeServico from '../../../Types/OrdemDeServico';
import Fornecedor from '../../../Types/Fornecedor';
import CircularProgressWithLabel from '../../../componentes/CircularProgressWithLabel';
import Funcionario from '../../../Types/Funcionario';
import ItemDePeca from '../../../Types/ItemDePeca';
import ItemDeServico from '../../../Types/ItemDeServico';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

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
    }
  },
  containerValorTotalListagem: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: theme.spacing(1)
  }
}));

interface ItemOrdemDeServicoProps {
  ordemDeServico: OrdemDeServico;
}

interface AgrupamentoPecasPorFornecedor extends Fornecedor {
  itensDePeca: ItemDePeca[];
}

interface AgrupamentoServicosPorFuncionario extends Funcionario {
  itensDeServico: ItemDeServico[];
}

const ItemOrdemDeServico: React.FC<ItemOrdemDeServicoProps> = ({ ordemDeServico }) => {
  const classes = useStyles();

  const agruparPecasPorFornecedor = () => {
    const agrupamentos: AgrupamentoPecasPorFornecedor[] = [];
    ordemDeServico.itensDePeca?.forEach((itemDePeca) => {
      if (agrupamentos.findIndex((agrupamento) =>
        agrupamento._id === itemDePeca.fornecedor._id
      ) === -1) {
        agrupamentos.push({ ...itemDePeca.fornecedor, itensDePeca: [] });
      }
    })
    agrupamentos.forEach((agrupamento) => {
      ordemDeServico.itensDePeca?.forEach((itemDePeca, indice) => {
        if (agrupamento._id === itemDePeca.fornecedor._id && ordemDeServico.itensDePeca) {
          agrupamento.itensDePeca.push(ordemDeServico.itensDePeca[indice])
        }
      })
    });
    return agrupamentos;
  }

  const agruparServicosPorFuncionario = () => {
    const agrupamentos: AgrupamentoServicosPorFuncionario[] = [];
    ordemDeServico.itensDeServico?.forEach((itemDeServico) => {
      if (agrupamentos.findIndex((agrupamento) =>
        agrupamento._id === itemDeServico.funcionario._id
      ) === -1) {
        agrupamentos.push({ ...itemDeServico.funcionario, itensDeServico: [] });
      }
    })
    agrupamentos.forEach((agrupamento) => {
      ordemDeServico.itensDeServico?.forEach((itemDeServico, indice) => {
        if (agrupamento._id === itemDeServico.funcionario._id && ordemDeServico.itensDeServico) {
          agrupamento.itensDeServico.push(ordemDeServico.itensDeServico[indice])
        }
      })
    });
    return agrupamentos;
  }

  return (
    <Grid item xs={12} sm={12} lg={6} >
      <Card className={classes.card} component={Paper} elevation={4}>
        <Paper elevation={4} square>
          <Box p={2}>
            <Grid container spacing={1} justify="space-between" alignItems="center">
              <Grid item>
                <Typography>Veículo: {ordemDeServico.veiculo?.placa.toLocaleUpperCase()}</Typography>
              </Grid>
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
              <Box className={classes.containerListagem}>
                <Box className={classes.tituloListagem}>
                  <Typography>Peças:</Typography>
                </Box>
                <Box className={classes.listagem}>
                  {
                    agruparPecasPorFornecedor()?.map((agrupamento, index) => (
                      <Box mb={1} key={index} >
                        <Typography>De {agrupamento.nomeFantasia}:</Typography>
                        <Box ml={1}>
                          {agrupamento.itensDePeca?.map((itemDePeca, index) => (
                            <Grid container key={index} spacing={1} justify="space-between">
                              <Grid item>
                                <Typography>{itemDePeca.peca.descricao}</Typography>
                              </Grid>
                            </Grid>
                          ))}
                        </Box>
                      </Box>
                    ))
                  }
                </Box>
                <Box className={classes.containerValorTotalListagem}>
                  <Typography>Valor Total: R${Formato.formatarMoeda(ordemDeServico.valorTotalDasPecas)}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={classes.containerListagem}>
                <Box className={classes.tituloListagem}>
                  <Typography>Serviços:</Typography>
                </Box>
                <Box className={classes.listagem}>
                  {
                    agruparServicosPorFuncionario()?.map((agrupamento, index) => (
                      <Box mb={1} key={index} >
                        <Typography>Por {agrupamento.nome}:</Typography>
                        <Box ml={1}>
                          {agrupamento.itensDeServico?.map((itemDeServico, index) => (
                            <Grid container key={index}>
                              <Typography>{itemDeServico.servico.descricao}</Typography>
                            </Grid>
                          ))}
                        </Box>
                      </Box>
                    ))}
                </Box>
                <Box className={classes.containerValorTotalListagem}>
                  <Typography>Valor Total: R${Formato.formatarMoeda(ordemDeServico.valorTotalDosServicos)}</Typography>
                </Box>
              </Box>
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