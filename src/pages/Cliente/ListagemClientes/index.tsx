import React, { memo } from 'react';
import { Box, } from '@material-ui/core';
import ClienteItem from '../ClienteItem';
import Cliente from '../../../Types/Cliente';

interface ListagemClientesProps {
  clientes: Cliente[];
}

const ListagemClientes: React.FC<ListagemClientesProps> = ({ clientes }) => {
  return (
    <Box mb={2}>
      {
        !!clientes.length && clientes.map((cliente, index) => (
          <ClienteItem cliente={cliente} key={index} />
        ))
      }
    </Box>
  );
}

export default memo(ListagemClientes);