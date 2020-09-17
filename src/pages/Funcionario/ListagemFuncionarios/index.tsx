import React, { memo } from 'react';
import { Box, } from '@material-ui/core';
import Funcionario from '../../../Types/Funcionario';
import PessoaItem from '../../../componentes/PessoaItem';

interface ListagemUsuarioProps {
  funcionarios: Funcionario[] | undefined;
}

const ListagemFuncionarios: React.FC<ListagemUsuarioProps> = ({ funcionarios }) => {

  return (
    <Box mb={2}>
      {
        funcionarios?.map((funcionario, index) => (
          <PessoaItem
            key={index}
            {...funcionario}
            linkText={`Alterar o funcionário ${funcionario.nome}`}
            linkToChange={`funcionarios/alterarfuncionario`}
          />
        ))
      }
    </Box>
  );
}

export default memo(ListagemFuncionarios);