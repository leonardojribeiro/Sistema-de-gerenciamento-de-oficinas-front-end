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

function ListagemModelos({modelos}) {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;

  return (
    <Box mb={2}>
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
                        {modelo.marca ? modelo.marca.descricao : ""}
                      </Typography>
                      <img
                        className={classes.imgLogomarca}
                        src={modelo.marca && modelo.marca.uriLogo && `${imagensUrl}/${modelo.marca.uriLogo}`}
                        alt={`logomarca da marca ${modelo.marca ? modelo.marca.descricao : ""}`}
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