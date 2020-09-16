import React, { memo } from 'react';
import { Box, } from '@material-ui/core';
import ClienteItem from '../ClienteItem';
import Cliente from '../../../Types/Cliente';
import PessoaItem from '../../../componentes/PessoaItem';

interface ListagemClientesProps {
  clientes: Cliente[];
}

const ListagemClientes: React.FC<ListagemClientesProps> = ({ clientes }) => {
  return (
    <Box mb={2}>
      {
        clientes?.map((cliente, index) => (
          <PessoaItem
            key={index}
            {...cliente}
            linkText={`Alterar o cliente ${cliente.nome}`}
            linkToChange={`clientes/alterar`}
          />
        ))
      }
    </Box>
  );
}

export default memo(ListagemClientes);