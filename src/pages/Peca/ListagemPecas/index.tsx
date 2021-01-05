import React, { memo, useCallback, useEffect } from 'react';
import { Box, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Tooltip, IconButton, makeStyles, Typography } from '@material-ui/core';
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
  linhaTabela: {
    maxHeight: "78px",
    padding: 0,
    position: "relative",
  }
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
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <Box mb={2}>
        <TableContainer >
          <Table size="small">
            <TableHead>
              <TableRow >
                <TableCell padding="none">Descrição</TableCell>
                <TableCell padding="none">Marca</TableCell>
                <TableCell padding="none" align="center">Alterar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                itens?.map((peca, index) => (
                  <TableRow className={classes.linhaTabela} key={index} hover >
                    <TableCell padding="none">
                      <Typography>
                        {peca.descricao}
                      </Typography>
                    </TableCell>
                    <TableCell padding="none">
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography>
                          {peca.marca ? peca.marca.descricao : ""}
                        </Typography>
                        <img
                          className={classes.imgLogomarca}
                          src={peca.marca && peca.marca.uriLogo && `${imagensUrl}/${peca.marca.uriLogo}`}
                          alt={`logomarca ${peca.marca ? peca.marca.descricao : ""}`}
                        />
                      </Box>
                    </TableCell>
                    <TableCell padding="none" align="center">
                      <Tooltip title={`Alterar a peça ${peca.descricao}`}>
                        <IconButton component={Link} to={`/pecas/alterarpeca?id=${peca._id}`}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <BotaoIncluir titulo="Incluir peça" linkTo="/pecas/incluirpeca" />
    </>
  );
}

export default memo(ListagemPecas);