import React, { memo } from 'react';
import FornecedorItem from '../FornecedorItem';
import Fornecedor from '../../../Types/Fornecedor';
import { Box, Container } from '@material-ui/core';

interface ListagemFornecedoresProps {
  fornecedores: Fornecedor[];
}

const ListagemFornecedores: React.FC<ListagemFornecedoresProps> = ({ fornecedores }) => {

  return (
    <Container>
      <Box mb={2}>
        {
          fornecedores.map((cliente, index) => (
            <FornecedorItem fornecedor={cliente} key={index} />
          ))
        }
      </Box>
    </Container>
  );
}

export default memo(ListagemFornecedores);