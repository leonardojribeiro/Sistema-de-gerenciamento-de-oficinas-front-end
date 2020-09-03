import React, { memo } from 'react';
import { Box, } from '@material-ui/core';
import FuncionarioItem from '../FuncionarioItem';
import Funcionario from '../../../Types/Funcionario';

interface ListagemUsuarioProps {
  funcionarios: Funcionario[] | undefined;
}

const ListagemFuncionarios: React.FC<ListagemUsuarioProps> = ({ funcionarios }) => {

  return (
    <Box mb={2}>
      {
        funcionarios?.map((funcionario, index) => (
          <FuncionarioItem funcionario={funcionario} key={index} />
        ))
      }
    </Box>
  );
}

export default memo(ListagemFuncionarios);