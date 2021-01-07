import { Box, IconButton, List, ListItem, ListItemAvatar } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import { Link } from 'react-router-dom';
import BotaoIncluir from '../BotaoIncluir';

export type Value<T = any> = T;

interface ListagemProps<T> {
  itens: Value<T>[];
  renderListItem: (item: Value<T>) => React.ReactNode;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  total: number;
}

export default function Listagem<T>({ itens, renderListItem, onPageChange, page, total }: ListagemProps<T>): JSX.Element {
  return (
    <>
      <Box mb={2}>
        <List>
          {
            itens?.map((modelo, index) => renderListItem(modelo))
          }
        </List>
      </Box >
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(total) / 100)} onChange={onPageChange} page={page} />
      </Box>
      <BotaoIncluir titulo="Incluir modelo" linkTo="/modelos/incluirmodelo" />
    </>
  );
}
