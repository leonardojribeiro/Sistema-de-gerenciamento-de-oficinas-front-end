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
import FormConsultaPessoa, { Filter } from '../FormConsultaPessoa';
import Veiculo from '../../Types/Veiculo';

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
}

interface ListagemAvatarProps<T> extends BaseListagemProps<T> {
  getURLAvatar: (item: Value<T>) => string;
  getAltAvatar: (item: Value<T>) => string;
}

interface ListagemProps<T> extends BaseListagemProps<T> {
  getURLAvatar?: undefined;
  getAltAvatar?: undefined;
}

type Props = (ListagemAvatarProps<Peca> & {
  dominio: "peca"
}) | (ListagemProps<Servico> & {
  dominio: "servico"
}) | (ListagemAvatarProps<Modelo> & {
  dominio: "modelo"
}) | (ListagemAvatarProps<Marca> & {
  dominio: "marca"
}) | (ListagemProps<Especialidade> & {
  dominio: "especialidade"
}) | (ListagemAvatarProps<Veiculo> & {
  dominio: "veiculo"
})

export default function Listagem({
  getPrimaryText,
  getSecondaryText,
  linkToInsert,
  getTitleLinkToChange,
  linkToInsertTitle,
  getLinkToChange,
  getAltAvatar,
  getURLAvatar,
  renderSecondaryActions,
  formSearchFilters,
  dominio
}: Props): JSX.Element {

  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem(
    "servicos",
    dominio,
  );

  useEffect(() => {
    listar()
  }, [listar])

  return (
    <>
      <FormConsultaPessoa onSubmit={handleSearch} filters={formSearchFilters} />
      <Box mb={2}>
        <List>
          {
            itens?.map((item, index) => (
              <ListItem key={index} divider>
                {getURLAvatar
                  ? <ListItemAvatar>
                    <img src={getURLAvatar(item)}
                      style={{
                        maxHeight: "48px",
                        maxWidth: "48px",
                      }}
                      alt={getAltAvatar ? getAltAvatar(item) : ""}
                    />
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