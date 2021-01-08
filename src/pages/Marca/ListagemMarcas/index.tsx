import React, { memo, useCallback, useEffect } from 'react';
import { IconButton, makeStyles, Box, Tooltip, List, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Marca from '../../../Types/Marca';
import FormConsultaMarca from '../FormConsultaMarca';
import { Pagination } from '@material-ui/lab';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import useListagem from '../../../hooks/useListagem';

const useStyles = makeStyles((theme) => ({
  imgLogomarca: {
    backgroundSize: "100%",
    maxHeight: "48px",
    maxWidth: "48px",
    borderRadius: "5px",
  },
}));

const ListagemMarcas: React.FC = () => {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL as string;
  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem<Marca>("marcas", "marca");

  useEffect(() => {
    listar();
  }, [listar]);

  const handleSubmitFormSearch = useCallback((search) => {
    //handleSearch(`descricao=${search}`)
  }, [handleSearch]);

  return (
    <>
      <FormConsultaMarca onSubmit={handleSubmitFormSearch} />
      <Box mb={3}>
        <List>
          {
            itens?.map((marca, index) => (
              <ListItem divider key={index}>
                <ListItemAvatar>
                  <img
                    className={classes.imgLogomarca}
                    src={marca.uriLogo && `${imagensUrl}/${marca.uriLogo}`}
                    alt={`logomarca ${marca.descricao}`}
                  />
                </ListItemAvatar>
                <ListItemText primary={marca.descricao} />
                <ListItemSecondaryAction>
                  <Tooltip title={`Alterar a marca ${marca.descricao}`}>
                    <IconButton component={Link} to={`/marcas/alterarmarca?id=${marca._id}`}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
      </Box>
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <Link to="marcas/incluirmarca" >
        <BotaoIncluir titulo="Incluir marca" />
      </Link>
    </>
  );
}

export default memo(ListagemMarcas);