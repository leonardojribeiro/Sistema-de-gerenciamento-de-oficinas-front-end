import { Box, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tooltip } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BotaoIncluir from '../BotaoIncluir';
import EditIcon from '@material-ui/icons/Edit';
import useListagem from '../../hooks/useListagem';
import Modelo from '../../Types/Modelo';
import Servico from '../../Types/Servico';
import Peca from '../../Types/Peca';
import Marca from '../../Types/Marca';
import Especialidade from '../../Types/Especialidade';
import FormConsulta, { Filter } from '../FormConsulta';
import Veiculo from '../../Types/Veiculo';
import OrdemDeServico from '../../Types/OrdemDeServico';
import Cliente from '../../Types/Cliente';
import Fornecedor from '../../Types/Fornecedor';
import Funcionario from '../../Types/Funcionario';

type Value<T = any> = T;

interface BaseListagemProps<T,> {
  getPrimaryText: (item: Value<T>) => string;
  getSecondaryText?: (item: Value<T>) => string | JSX.Element;
  getLinkToChange: (item: Value<T>) => string;
  getTitleLinkToChange: (item: Value<T>) => string;
  linkToInsert: string;
  linkToInsertTitle: string;
  formSearchFilters: Filter[];
  renderSecondaryActions?: (item: Value<T>) => JSX.Element;
  renderAvatar?: (item: Value<T>) => JSX.Element;
}


type Props = (BaseListagemProps<Peca> & {
  dominio: "peca"
}) | (BaseListagemProps<Servico> & {
  dominio: "servico"
}) | (BaseListagemProps<Modelo> & {
  dominio: "modelo"
}) | (BaseListagemProps<Marca> & {
  dominio: "marca"
}) | (BaseListagemProps<Especialidade> & {
  dominio: "especialidade"
}) | (BaseListagemProps<Veiculo> & {
  dominio: "veiculo"
}) | (BaseListagemProps<Cliente> & {
  dominio: "cliente"
}) | (BaseListagemProps<Fornecedor> & {
  dominio: "fornecedor"
}) | (BaseListagemProps<Funcionario> & {
  dominio: "funcionario"
}) | (BaseListagemProps<OrdemDeServico> & {
  dominio: "ordemdeservico"
})

export default function Listagem({
  getPrimaryText,
  getSecondaryText,
  linkToInsert,
  getTitleLinkToChange,
  linkToInsertTitle,
  getLinkToChange,
  renderAvatar,
  renderSecondaryActions,
  formSearchFilters,
  dominio
}: Props): JSX.Element {

  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem(dominio);

  useEffect(() => {
    listar()
  }, [listar])

  return (
    <>
      <FormConsulta onSubmit={handleSearch} filters={formSearchFilters} />
      <Box mb={2}>
        <List>
          {
            itens?.map((item, index) => (
              <ListItem key={index} divider>
                {renderAvatar
                  ? <ListItemAvatar >
                    {renderAvatar(item)}
                  </ListItemAvatar>
                  : null
                }
                <ListItemText primary={getPrimaryText(item)} secondary={getSecondaryText ? getSecondaryText(item) : null} />
                <ListItemSecondaryAction>
                  {
                    renderSecondaryActions && renderSecondaryActions(item)
                  }
                  <Tooltip title={getTitleLinkToChange(item)}>
                    <IconButton component={Link} to={getLinkToChange(item)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
      </Box >
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <BotaoIncluir titulo={linkToInsertTitle} linkTo={linkToInsert} />
    </>
  );
}