import React, { memo } from 'react';
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

function ListagemVeiculos({ veiculos = []}) {
  const classes = useStyles();
  //const imagensUrl = process.env.REACT_APP_IMAGENS_URL;

  return (
    <Box mb={2}>
      <TableContainer >
        <Table spacing={0} size="small">
          <TableHead>
            <TableRow >
              <TableCell padding="none">Placa</TableCell>
              <TableCell padding="none">Modelo</TableCell>
              <TableCell padding="none">Marca</TableCell>
              <TableCell padding="none" align="center">Alterar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              !!veiculos.length && veiculos.map((veiculo, index) => (
                <TableRow className={classes.linhaTabela} key={index} hover >
                  <TableCell padding="none">
                    <Typography>
                      {veiculo.placa}
                    </Typography>
                  </TableCell>
                  <TableCell padding="none">
                    <Typography>
                      {veiculo.modelo.descricao}
                    </Typography>
                  </TableCell>
                  <TableCell padding="none">
                    <Typography>
                      {veiculo.marca.descricao}
                    </Typography>
                  </TableCell>
                  <TableCell padding="none" align="center">
                    <Tooltip title={`Alterar o veículo ${veiculo.placa}`}>
                      <IconButton component={Link} to={`/veiculos/alterar?id=${veiculo._id}`}>
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

export default memo(ListagemVeiculos);