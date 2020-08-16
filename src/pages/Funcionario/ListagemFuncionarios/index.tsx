import React, { memo } from 'react';
import {  Box, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Hidden } from '@material-ui/core';
import FuncionarioItem from '../FuncionarioItem';
import Funcionario from '../../../Types/Funcionario';

interface ListagemUsuarioProps{
  funcionarios: Funcionario[] | undefined;
}

const ListagemFuncionarios: React.FC<ListagemUsuarioProps> = ({ funcionarios }) => {

  return (
    <Box mb={2}>
      <TableContainer >
        <Table size="small">
          <TableHead>
            <TableRow >
              <TableCell >Nome</TableCell>
              <Hidden xsDown>
                <TableCell >Telefone Celular</TableCell>
              </Hidden>
              <TableCell size="small" align="right">Expandir</TableCell>
              <TableCell size="small" align="right">alterar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              funcionarios?.map((funcionario, index) => (
                <FuncionarioItem funcionario={funcionario} key={index} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default memo(ListagemFuncionarios);