import React, { memo } from 'react';
import {  Box, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Hidden } from '@material-ui/core';
import FuncionarioItem from '../FuncionarioItem';


function ListagemFuncionarios({ funcionarios =[] }) {

  return (
    <Box mb={2}>
      <TableContainer >
        <Table spacing={0} size="small">
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
              !!funcionarios.length && funcionarios.map((cliente, index) => (
                <FuncionarioItem cliente={cliente} key={index} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default memo(ListagemFuncionarios);