import { List, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import Dialog from '../../../componentes/Dialog';
import ItemVeiculo from '../../../componentes/ItemVeiculo';
import ApiContext from '../../../contexts/ApiContext';
import useQuery from '../../../hooks/useQuery';
import Vinculo from '../../../Types/Vinculo';
import FormVeiculo from '../../Veiculo/FormVeiculo';
import HistoricoVeiculo from '../../Veiculo/HistoricoVeiculo';


const DialogoVeiculosCliente: React.FC = () => {
  const cliente = useQuery('cliente');
  const [vinculos, setVinculos] = useState<Vinculo[]>();
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const resposta = await get(`/veiculo/consultaVinculo?cliente=${cliente}`) as any;
    if (resposta) {
      setVinculos(resposta.vinculos as Vinculo[]);
    }
  }, [cliente, get]);

  useEffect(() => {
    if (pathname.endsWith('veiculos')) {
      listar();
    }
  }, [listar, pathname]);

  return (
    <Dialog title="Veículos do cliente" open maxWidth="sm" fullWidth>
      {
        vinculos?.length
          ? <List>
            {vinculos?.map((vinculo, index) => <ItemVeiculo
              key={index}
              veiculo={vinculo.veiculo}
              baseURLToHistory="/clientes/veiculos/historico"
            />)}
          </List>
          : <Typography align="center" variant="h6">Não existem veículos vinculados a esse cliente!</Typography>
      }
      <BotaoIncluir titulo="Incluir veículo para esse cliente" linkTo={`/clientes/veiculos/incluirveiculo?cliente=${cliente}`} />
      <Switch>
        <Route path="/clientes/veiculos/historico" component={HistoricoVeiculo} />
        <Route path="/clientes/veiculos/incluirveiculo" component={FormVeiculo} />
      </Switch>
    </Dialog>
  );
}

export default DialogoVeiculosCliente;