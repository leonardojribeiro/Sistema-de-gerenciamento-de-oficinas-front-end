import { Box, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tooltip } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import { Link } from 'react-router-dom';
import BotaoIncluir from '../BotaoIncluir';
import EditIcon from '@material-ui/icons/Edit';

type Value<T = any> = T;

interface BaseListagemProps<T> {
  itens: Value<T>[];
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  total: number;
  getPrimaryText: (item: Value<T>) => string;
  getSecondaryText?: (item: Value<T>) => string | JSX.Element;
  getLinkToChange: (item: Value<T>) => string;
  getTitleLinkToChange: (item: Value<T>) => string;
  linkToInsert: string;
  linkToInsertTitle: string;
}

interface ListagemAvatarProps<T> extends BaseListagemProps<T> {
  getURLAvatar: (item: Value<T>) => string;
  getAltAvatar: (item: Value<T>) => string;
}

interface ListagemProps<T> extends BaseListagemProps<T> {
  getURLAvatar?: undefined;
  getAltAvatar?: undefined;
}


export default function Listagem<T>({ itens, getPrimaryText, getSecondaryText, linkToInsert, getTitleLinkToChange, linkToInsertTitle, getLinkToChange, getAltAvatar, onPageChange, getURLAvatar, page, total }: ListagemProps<T> | ListagemAvatarProps<T>): JSX.Element {
  return (
    <>
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
        <Pagination count={Math.ceil(Number(total) / 100)} onChange={onPageChange} page={page} />
      </Box>
      <BotaoIncluir titulo={linkToInsertTitle} linkTo={linkToInsert} />
    </>
  );
}
