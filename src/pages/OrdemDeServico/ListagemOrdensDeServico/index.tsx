import React, { useState, useEffect, useCallback, useContext, memo } from 'react';
import OrdemDeServico from '../../../Types/OrdemDeSertvico';
import ApiContext from '../../../contexts/ApiContext';
import { Grid, Paper, Typography, Box, Card, makeStyles, } from '@material-ui/core';
import Formato from '../../../recursos/Formato';

const useStyles = makeStyles((theme) => ({
  card: {
    height: "400px",
  }
}));

const ListagemOrdensDeServico: React.FC = () => {
  const classes = useStyles()
  const [ordensDeServico, setOrdensDeservico] = useState<OrdemDeServico[]>([]);
  const { get } = useContext(ApiContext);

  const listar = useCallback(async () => {
    const ordensDeServico = await get('ordemdeservico') as OrdemDeServico[];
    if (ordensDeServico) {
      setOrdensDeservico(ordensDeServico);
    }
  }, [get]);

  useEffect(() => {
    listar();
  }, [listar]);
  console.log(ordensDeServico)

  return (
    <Grid container spacing={3} justify="center">
      {
        ordensDeServico.map((ordemDeServico, index) => (
          <Grid item key={index} xs={12} sm={8} md={8} >
            <Card className={classes.card}>
              <Paper elevation={4} square>
                <Box p={2}>
                  <Grid container spacing={1} justify="space-between">
                    <Grid item>
                      <Typography>Veículo: {ordemDeServico.veiculo.placa.toLocaleUpperCase()}</Typography>
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
                    <Grid container>
                      <Grid item>
                        <Typography>Peças:</Typography>
                      </Grid>
                    </Grid>
                    {
                      ordemDeServico.itensDePeca.map((itemDePeca, index) => (
                        <Grid container key={index}>
                          <Grid item>
                            <Typography>{itemDePeca.peca.descricao} Qtd. {itemDePeca.quantidade}</Typography>
                          </Grid>
                        </Grid>
                      ))
                    }
                    <Box display="flex" justifyContent="flex-end">
                      <Typography>Valor Total: {ordemDeServico.valorTotalDasPecas}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container>
                      <Grid item>
                        <Typography>Serviços:</Typography>
                      </Grid>
                    </Grid>
                    {
                      ordemDeServico.itensDeServico.map((itemDeServico, index) => (
                        <Grid container key={index}>
                          <Grid item>
                            <Typography>{itemDeServico.servico.descricao} Qtd. {itemDeServico.quantidade}</Typography>
                          </Grid>
                        </Grid>
                      ))
                    }
                    <Box display="flex" justifyContent="flex-end">
                      <Typography>Valor Total: {ordemDeServico.valorTotalDosServicos}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid >
        ))
      }
    </Grid >
  );
}

export default memo(ListagemOrdensDeServico);