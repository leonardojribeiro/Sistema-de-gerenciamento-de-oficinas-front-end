import React, { memo } from 'react';
import { IconButton, makeStyles, Box, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  listagem: {
    minHeight: "50vh",
  },
  imgLogomarca: {
    backgroundSize: "100%",
    maxHeight: "64px",
    maxWidth: "96px",
    objectFit: "scale-down"
  },
  linhaTabela: {
    height: "78px",
    padding: 0,

  }
}));

function Listagem({ marcas }) {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;

  return (
    <Box className={classes.listagem} border={1} mb={2}>
      <TableContainer >
        <Table spacing={0} size="small">
          <TableHead>
            <TableRow >
              <TableCell padding="none">Descrição</TableCell>
              <TableCell padding="none" align="center">Logomarca</TableCell>
              <TableCell padding="none">Alterar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              !!marcas.length && marcas.map((marca, index) => (
                <TableRow className={classes.linhaTabela} key={index} hover >
                  <TableCell padding="none">{marca.descricao}</TableCell>
                  <TableCell padding="none">
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <img
                        className={classes.imgLogomarca}
                        src={marca.uriLogo && `${imagensUrl}/${marca.uriLogo}`}
                        alt={`logomarca da marca ${marca.descricao}`}
                      />
                    </Box>
                  </TableCell>
                  <TableCell padding="none">
                    <Tooltip title={`Alterar a marca ${marca.descricao}`}>
                      <IconButton component={Link} to={`/marcas/alterar?id=${marca._id}`}>
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

export default memo(Listagem);