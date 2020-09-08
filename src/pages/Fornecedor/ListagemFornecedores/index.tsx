import React, { memo } from 'react';
import FornecedorItem from '../FornecedorItem';
import Fornecedor from '../../../Types/Fornecedor';
import { Box, } from '@material-ui/core';

interface ListagemFornecedoresProps {
  fornecedores: Fornecedor[];
}

const ListagemFornecedores: React.FC<ListagemFornecedoresProps> = ({ fornecedores }) => {

  return (
    <Box mb={2}>
      {
        fornecedores.map((cliente, index) => (
          <FornecedorItem fornecedor={cliente} key={index} />
        ))
      }
    </Box>
  );
}

export default memo(ListagemFornecedores);