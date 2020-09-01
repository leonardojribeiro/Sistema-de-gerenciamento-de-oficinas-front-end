import React, { memo } from 'react';
import { Box, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Tooltip, IconButton, makeStyles, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Peca from '../../../Types/Peca';

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

interface ListagemPecasProps {
  pecas: Peca[];
}

const ListagemPecas: React.FC<ListagemPecasProps> = ({ pecas }) => {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;

  return (
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
              pecas.map((peca, index) => (
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
                        alt={`logomarca da marca ${peca.marca ? peca.marca.descricao : ""}`}
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
  );
}

export default memo(ListagemPecas);