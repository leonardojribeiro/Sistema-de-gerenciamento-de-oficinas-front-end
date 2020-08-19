import React, { memo } from 'react';
import FornecedorItem from '../FornecedorItem';
import Fornecedor from '../../../Types/Fornecedor';

interface ListagemFornecedoresProps {
  fornecedores: Fornecedor[];
}

const ListagemFornecedores: React.FC<ListagemFornecedoresProps> = ({ fornecedores }) => {

  return (
    <>
      {
        fornecedores.map((cliente, index) => (
          <FornecedorItem fornecedor={cliente} key={index} />
        ))
      }
    </>
  );
}

export default memo(ListagemFornecedores);