import React, { useCallback, useContext, useEffect, useState } from 'react';
import Dialog from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import useQuery from '../../../hooks/useQuery';
import Vinculo from '../../../Types/Vinculo'; 
import VeiculoItem from '../../Veiculo/VeiculoItem';


const DialogoVeiculosCliente: React.FC = () => {
  const cliente = useQuery('cliente');
  const [vinculos, setVinculos] = useState<Vinculo[]>();
  const { get } = useContext(ApiContext);

  const listar = useCallback(async () => {
    const resposta = await get(`/veiculo/consultaVinculo?cliente=${cliente}`) as any;
    if (resposta) {
      setVinculos(resposta.vinculos as Vinculo[]);
    }
  }, [cliente, get]);

  useEffect(() => {
    listar();
  }, [listar]);

  console.log(vinculos);

  return (
    <Dialog title="Veículos do cliente" open maxWidth="sm" fullWidth>
      {
        vinculos?.map((vinculo, index) => (
          <VeiculoItem key={index} veiculo={vinculo.veiculo} />
        ))
      }
    </Dialog>
  );
}

export default DialogoVeiculosCliente;