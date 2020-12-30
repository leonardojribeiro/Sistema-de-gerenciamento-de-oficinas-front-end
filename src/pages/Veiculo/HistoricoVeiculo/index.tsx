import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import Dialog from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import useQuery from '../../../hooks/useQuery';
import OrdemDeServico from '../../../Types/OrdemDeServico';
import Vinculo from '../../../Types/Vinculo';
import ItemOrdemDeServico from '../../OrdemDeServico/ItemOrdemDeServico';
import PersonIcon from '@material-ui/icons/Person';
import Formato from '../../../recursos/Formato';

interface AgrupamentoVinculoOrdemDeServico {
  vinculo: Vinculo;
  ordensDeServico: OrdemDeServico[];
}

const HistoricoVeiculo: React.FC = () => {
  const veiculo = useQuery('veiculo');
  const [agrupamento, setAgrupamento] = useState<AgrupamentoVinculoOrdemDeServico[]>()
  const { get } = useContext(ApiContext);

  const listar = useCallback(async () => {
    const vinculos = await get(`/veiculo/consultaVinculo?veiculo=${veiculo}`) as any;
    if (vinculos) {
      let vinculos0 = vinculos.vinculos as Vinculo[];

      vinculos0 = vinculos0.sort((a, b) => {
        if (new Date(a.vinculoInicial).getTime() < new Date(b.vinculoInicial).getTime()) {
          return 1;
        }
        if (new Date(a.vinculoInicial).getTime() > new Date(b.vinculoInicial).getTime()) {
          return -1;
        }
        return 0;
      })
      const resposta = await get(`/ordemdeservico/veiculo?veiculo=${veiculo}`) as any;
      const oss = resposta.ordensDeServico as OrdemDeServico[];
      const agr: AgrupamentoVinculoOrdemDeServico[] = [];
      vinculos0.forEach((vinculo, index) => {
        agr.push({ vinculo, ordensDeServico: [] });
        oss.forEach((os) => {
          if (vinculo.vinculoFinal !== undefined) {
            if (new Date(os.dataDeRegistro).getTime() >= new Date(vinculo.vinculoInicial).getTime() && new Date(os.dataDeRegistro).getTime() < new Date(vinculo.vinculoFinal).getTime()) {
              agr[index].ordensDeServico.push(os);
            }
          }
          else {
            if (new Date(os.dataDeRegistro).getTime() >= new Date(vinculo.vinculoInicial).getTime()) {
              agr[index].ordensDeServico.push(os);
            }
          }
        })
      })

      console.log(agr);
      setAgrupamento(agr);
    }
  }, [get, veiculo]);

  useEffect(() => {
    listar();
  }, [listar]);

  return (
    <Dialog title={`Histórico do veículo `} open maxWidth="lg" fullWidth>
      <Typography align="center" variant="h6">Ordens de serviço desse veículo</Typography>
      <Box mb={2}>
        <List>
          {
            agrupamento?.map((agrupamento, index) => (
              <Grid container key={index} spacing={2} justify="center" >
                <Grid item xs={12} sm={11} lg={10} xl={8}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${agrupamento.vinculo.cliente.nome}`}
                      secondary={`Desde: ${Formato.formatarData(agrupamento.vinculo.vinculoInicial)} até ${agrupamento.vinculo.vinculoFinal ? Formato.formatarData(agrupamento.vinculo.vinculoFinal) : "o momento"}.`}
                    />
                  </ListItem>
                </Grid>
                {agrupamento.ordensDeServico.length > 0
                  ? agrupamento.ordensDeServico.map((ordemDeServico, index) => (
                    <ItemOrdemDeServico ordemDeServico={ordemDeServico} key={index} />
                  ))
                  : (
                    <Grid item xs={12} sm={11} lg={10} xl={8}>
                      <Typography align="center" variant="h6">Não houveram ordens de serviço nesse período!</Typography>
                    </Grid>
                  )}
                <Grid item xs={12} sm={11} lg={10} xl={8}>
                  <Divider />
                </Grid>
              </Grid>
            ))
          }
        </List>
      </Box>
      <BotaoIncluir titulo="Incluir ordem de serviço para este veículo" linkTo={`/ordensdeservico/incluir?veiculo=${veiculo}`} />
    </Dialog>
  );
}

export default HistoricoVeiculo;