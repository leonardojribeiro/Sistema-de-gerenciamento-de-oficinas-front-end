import React, { useCallback, useEffect } from 'react';
import { Box, Tooltip, IconButton, makeStyles, List, ListItemText, ListItem, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Modelo from '../../../Types/Modelo';
import { Pagination } from '@material-ui/lab';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import FormConsultaPeca from '../../Peca/FormConsultaPeca';
import useListagem from '../../../hooks/useListagem';
const useStyles = makeStyles((theme) => ({
  listagem: {
    minHeight: "50vh",
  },
  imgLogomarca: {
    backgroundSize: "100%",
    maxHeight: "48px",
    maxWidth: "48px",
    objectFit: "scale-down",
  },
  linhaTabela: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    borderTop: `1px solid ${theme.palette.divider}`,
    height: "64px",
  }
}));

const ListagemModelos: React.FC = () => {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem<Modelo>("modelos", "modelo");

  const handleSubmitSearch = useCallback(async (dados) => {
    handleSearch(`descricao=${dados.consulta}&marca=${dados.marca}`)
  }, [handleSearch]);

  useEffect(() => {
    listar();
  }, [listar])

  return (
    <>
      <FormConsultaPeca onSubmit={handleSubmitSearch} />
      <Box mb={2}>
        <List>
          {
            itens?.map((modelo, index) => (
              <ListItem divider key={index}>
                <ListItemAvatar>
                  <img
                    className={classes.imgLogomarca}
                    src={modelo.marca && modelo.marca.uriLogo && `${imagensUrl}/${modelo.marca.uriLogo}`}
                    alt={`logomarca da marca ${modelo.marca ? modelo.marca.descricao : ""}`}
                  />
                </ListItemAvatar>
                <ListItemText primary={modelo.descricao} secondary={modelo.marca.descricao} />
                <ListItemSecondaryAction>
                  <Tooltip title={`Alterar o modelo ${modelo.descricao}`}>
                    <IconButton component={Link} to={`/modelos/alterarmodelo?id=${modelo._id}`}>
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
      <BotaoIncluir titulo="Incluir modelo" linkTo="/modelos/incluirmodelo" />
    </>
  );
}

export default ListagemModelos;