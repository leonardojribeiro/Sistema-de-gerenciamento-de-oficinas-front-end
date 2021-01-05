import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Dialog from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import useQuery from '../../../hooks/useQuery';
import Vinculo from '../../../Types/Vinculo';
import HistoricoVeiculo from '../../Veiculo/HistoricoVeiculo';
import VeiculoItem from '../../Veiculo/VeiculoItem';


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
        vinculos?.map((vinculo, index) => (
          <VeiculoItem key={index} baseUrlToHistory="/clientes/veiculos/historico" veiculo={vinculo.veiculo} />
        ))
      }
      <Switch>
        <Route path="/clientes/veiculos/historico" component={HistoricoVeiculo} />
      </Switch>
    </Dialog>
  );
}

export default DialogoVeiculosCliente;