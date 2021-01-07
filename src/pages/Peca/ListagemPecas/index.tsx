import React, { memo, useCallback, useEffect } from 'react';
import { Box, Tooltip, IconButton, makeStyles, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Peca from '../../../Types/Peca';
import FormConsultaPeca from '../FormConsultaPeca';
import { Pagination } from '@material-ui/lab';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import useListagem from '../../../hooks/useListagem';

const useStyles = makeStyles((theme) => ({
  imgLogomarca: {
    backgroundSize: "100%",
    maxHeight: "48px",
    maxWidth: "48px",
    objectFit: "scale-down",
  },
}));


const ListagemPecas: React.FC = () => {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const { handlePageChange, handleSearch, listar, total, itens, page } = useListagem<Peca>("pecas", "peca");

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
            itens?.map((peca, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <img
                    className={classes.imgLogomarca}
                    src={peca.marca && peca.marca.uriLogo && `${imagensUrl}/${peca.marca.uriLogo}`}
                    alt={`logomarca ${peca.marca ? peca.marca.descricao : ""}`}
                  />
                </ListItemAvatar>
                <ListItemText primary={peca.descricao} secondary={peca.marca?.descricao} />
                <ListItemSecondaryAction>
                  <Tooltip title={`Alterar a peça ${peca.descricao}`}>
                    <IconButton component={Link} to={`/pecas/alterarpeca?id=${peca._id}`}>
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
      <BotaoIncluir titulo="Incluir peça" linkTo="/pecas/incluirpeca" />
    </>
  );
}

export default memo(ListagemPecas);