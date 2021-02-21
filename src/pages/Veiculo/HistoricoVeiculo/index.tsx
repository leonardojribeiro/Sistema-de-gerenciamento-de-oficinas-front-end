import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import Dialog from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import useQuery from '../../../hooks/useQuery';
import OrdemDeServico from '../../../Types/OrdemDeServico';
import Vinculo from '../../../Types/Vinculo';
import PersonIcon from '@material-ui/icons/Person';
import Formato, { formatarPlaca } from '../../../recursos/Formato';
import CircularProgressWithLabel from '../../../componentes/CircularProgressWithLabel';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import ShowOrdemDeServico from '../../OrdemDeServico/ShowOrdemDeServico';

interface AgrupamentoVinculoOrdemDeServico {
  vinculo: Vinculo;
  ordensDeServico: OrdemDeServico[];
}

const HistoricoVeiculo: React.FC = () => {
  const veiculo = useQuery('veiculo');
  const placa = useQuery('placa');
  const [agrupamento, setAgrupamento] = useState<AgrupamentoVinculoOrdemDeServico[]>()
  const { get } = useContext(ApiContext);
  const { path, url } = useRouteMatch();
  const listar = useCallback(async () => {
    const vinculos = await get(`/veiculo/consultaVinculo?veiculo=${veiculo}`) as any;
    if (vinculos) {
      let vinculos0 = vinculos.vinculos as Vinculo[];
      vinculos0 = vinculos0?.sort((a, b) => {
        if (new Date(a.vinculoInicial).getTime() < new Date(b.vinculoInicial).getTime()) {
          return 1;
        }
        if (new Date(a.vinculoInicial).getTime() > new Date(b.vinculoInicial).getTime()) {
          return -1;
        }
        return 0;
      })
      const resposta = await get(`/ordemdeservico/consulta?veiculo=${veiculo}&pagina=1&limite=10000`) as any;
      if (resposta) {
        const oss = resposta.itens as OrdemDeServico[];
        const agr: AgrupamentoVinculoOrdemDeServico[] = [];
        vinculos0?.forEach((vinculo, index) => {
          agr.push({ vinculo, ordensDeServico: [] });
          oss?.forEach((os) => {
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
        setAgrupamento(agr);
      }
    }
  }, [get, veiculo]);

  useEffect(() => {
    if (veiculo) {
      listar();
    }
  }, [listar, veiculo]);

  return (
    <Dialog title={`Histórico do veículo ${placa && formatarPlaca(placa)}`} open maxWidth="md" fullWidth>
      <Typography align="center" variant="h6">Ordens de serviço desse veículo</Typography>
      <Box mb={2}>
        <List dense >
          {
            agrupamento?.map((agrupamento, index) =>
              <React.Fragment key={index}>
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
                {
                  agrupamento.ordensDeServico.length > 0
                    ? agrupamento.ordensDeServico.map((ordemDeServico, index) =>
                      <Box pl={2} key={index}>
                        <ListItem divider button component={Link} to={`${path}/exibirordemdeservico?id=${ordemDeServico._id}`}>
                          <ListItemAvatar>
                            <Avatar>
                              <CircularProgressWithLabel value={ordemDeServico.andamento} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={Formato.formatarPlaca(ordemDeServico.veiculo.placa)}
                            secondary={ordemDeServico.sintoma}
                          />
                        </ListItem>
                      </Box>
                    )
                    : <ListItem divider>
                      <ListItemText primary="Não houveram ordens de serviço nesse período!" />
                    </ListItem>
                }
              </React.Fragment>
            )}
        </List>
      </Box >
      <BotaoIncluir titulo="Incluir ordem de serviço para este veículo" linkTo={`/ordensdeservico/incluir?veiculo=${veiculo}`} />
      <Switch>
        <Route path={`${url}/exibirordemdeservico`} component={ShowOrdemDeServico} />
      </Switch>
    </Dialog >
  );
}

export default HistoricoVeiculo;