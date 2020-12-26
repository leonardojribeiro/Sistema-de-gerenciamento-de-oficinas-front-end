import React, { memo, useEffect } from 'react';
import { Box } from '@material-ui/core';
import Veiculo from '../../../Types/Veiculo';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import useListagem from '../../../hooks/useListagem';
import { Pagination } from '@material-ui/lab';
import VeiculoItem from '../VeiculoItem';

const ListagemVeiculos: React.FC = () => {
  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem<Veiculo>("veiculos", "veiculo");
  useEffect(() => {
    listar();
  }, [listar]);

  return (
    <>
      <FormularioConsulta onSubmit={handleSearch} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <Box mb={2}>
        {
          itens?.map((veiculo, index) => (
            <VeiculoItem key={index} veiculo={veiculo} />
          ))
        }
      </Box>
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <BotaoInserir titulo="Inserir veiculo" linkTo="/veiculos/inserirveiculo" />
    </>
  );
}

export default memo(ListagemVeiculos);