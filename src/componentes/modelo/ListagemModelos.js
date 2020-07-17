import React from 'react';
import { Box, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Tooltip, IconButton, makeStyles, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  listagem: {
    minHeight: "50vh",
  },
  imgLogomarca: {
    backgroundSize: "100%",
    maxHeight: "64px",
    maxWidth: "64px",
    objectFit: "scale-down",
  },
  linhaTabela: {
    maxHeight: "78px",
    padding: 0,
    position: "relative",
  }
}));

function ListagemModelos({modelos}) {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;

  return (
    <Box className={classes.listagem} border={1} mb={2}>
      <TableContainer >
        <Table spacing={0} size="small">
          <TableHead>
            <TableRow >
              <TableCell padding="none">Descrição</TableCell>
              <TableCell padding="none">Marca</TableCell>
              <TableCell padding="none" align="center">Alterar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              !!modelos.length && modelos.map((modelo, index) => (
                <TableRow className={classes.linhaTabela} key={index} hover >
                  <TableCell padding="none">
                    <Typography>
                      {modelo.descricao}
                    </Typography>
                  </TableCell>
                  <TableCell padding="none">
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography>
                        {modelo.idMarca ? modelo.idMarca.descricao : ""}
                      </Typography>
                      <img
                        className={classes.imgLogomarca}
                        src={modelo.idMarca && modelo.idMarca.uriLogo && `${imagensUrl}/${modelo.idMarca.uriLogo}`}
                        alt={`logomarca da marca ${modelo.idMarca ? modelo.idMarca.descricao : ""}`}
                      />
                    </Box>
                  </TableCell>
                  <TableCell padding="none" align="center">
                    <Tooltip title={`Alterar o modelo ${modelo.descricao}`}>
                      <IconButton component={Link} to={`/modelos/alterar?id=${modelo._id}`}>
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
  );
}

export default ListagemModelos;