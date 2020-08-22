import React, { memo } from 'react';
import { Grid, Paper, Typography, Box, Card, makeStyles, } from '@material-ui/core';
import Formato from '../../../../recursos/Formato';
import OrdemDeServico from '../../../../Types/OrdemDeSertvico';
import Fornecedor from '../../../../Types/Fornecedor';
import Peca from '../../../../Types/Peca';

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
    height: "200px"
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
  pecas: Peca[];
}

const ItemOrdemDeServico: React.FC<ItemOrdemDeServicoProps> = ({ ordemDeServico }) => {
  const classes = useStyles();

  const organizarOrdensDeServico = () => {
    const agrupamentos: AgrupamentoPecasPorFornecedor[] = [];

    ordemDeServico.itensDePeca?.forEach((itemDePeca) => {
      console.log( agrupamentos)
      if (!agrupamentos.includes({...itemDePeca.fornecedor, pecas:[]})) {
        console.log('incluso')
        agrupamentos.push({...itemDePeca.fornecedor, pecas:[]});
      }
    })

    agrupamentos.forEach((agrupamento) => {
      ordemDeServico.itensDePeca?.forEach((itemDePeca, indice) => {
        if(agrupamento._id === itemDePeca.fornecedor._id && ordemDeServico.itensDePeca){
          agrupamento.pecas.push(ordemDeServico.itensDePeca[indice].peca)
        }
      })
    });

    return agrupamentos;
  }
  //console.log(ordemDeServico)
  organizarOrdensDeServico()
  return (
    <Grid item xs={12} sm={10} md={8} lg={6} >
      <Card className={classes.card} component={Paper} elevation={4}>
        <Paper elevation={4} square>
          <Box p={2}>
            <Grid container spacing={1} justify="space-between">
              <Grid item>
                <Typography>Veículo: {ordemDeServico.veiculo?.placa.toLocaleUpperCase()}</Typography>
              </Grid>
              <Grid item>
                <Typography>{Formato.formatarData(ordemDeServico.dataDeRegistro)}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <Box p={2}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Sintoma: {ordemDeServico.sintoma}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={classes.containerListagem}>
                <Box className={classes.tituloListagem}>
                  <Typography>Peças:</Typography>
                </Box>
                <Box className={classes.listagem}>
                  {
                    ordemDeServico.itensDePeca?.map((itemDePeca, index) => (
                      <Grid container key={index}>
                        <Grid item>
                          <Typography>{itemDePeca.peca.descricao} Qtd. {itemDePeca.quantidade}</Typography>
                        </Grid>
                      </Grid>
                    ))
                  }
                </Box>
                <Box className={classes.containerValorTotalListagem}>
                  <Typography>Valor Total: {Formato.formatarMoeda(ordemDeServico.valorTotalDasPecas)}</Typography>
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
                    ordemDeServico.itensDeServico?.map((itemDeServico, index) => (
                      <Grid container key={index}>
                        <Grid item>
                          <Typography>{itemDeServico.servico.descricao} Qtd. {itemDeServico.quantidade}</Typography>
                        </Grid>
                      </Grid>
                    ))
                  }
                </Box>
                <Box className={classes.containerValorTotalListagem}>
                  <Typography>Valor Total: {Formato.formatarMoeda(ordemDeServico.valorTotalDosServicos)}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} justify="flex-end">
                <Grid item>
                  <Typography>Desconto: {Formato.formatarMoeda(ordemDeServico.desconto)}</Typography>
                </Grid>
                <Grid item>
                  <Typography>Valor total da ordem de serviço: {Formato.formatarMoeda(ordemDeServico.valorTotal)}</Typography>
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