import React, { memo } from 'react';
import Fornecedor from '../../../Types/Fornecedor';
import { Box, } from '@material-ui/core';
import PessoaItem from '../../../componentes/PessoaItem';

interface ListagemFornecedoresProps {
  fornecedores: Fornecedor[];
}

const ListagemFornecedores: React.FC<ListagemFornecedoresProps> = ({ fornecedores }) => {

  return (
    <Box mb={2}>
      {
        fornecedores?.map((fornecedor, index) => (
          <PessoaItem
            {...fornecedor}
            key={index}
            linkText={`Alterar o cliente ${fornecedor.nomeFantasia}`}
            linkToChange={`fornecedores/alterarfornecedor`}
          />
        ))
      }
    </Box>
  );
}

export default memo(ListagemFornecedores);