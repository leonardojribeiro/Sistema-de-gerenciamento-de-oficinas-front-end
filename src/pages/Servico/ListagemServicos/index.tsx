import React, { memo } from 'react';
import { Box, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Tooltip, IconButton, makeStyles, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Servico from '../../../Types/Servico';

interface ListagemServicosProps {
  servicos: Servico[] | undefined;
}

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

const ListagemServicos: React.FC<ListagemServicosProps> = ({ servicos }) => {
  const classes = useStyles();
  return (
    <Box mb={2}>
      <TableContainer >
        <Table size="small">
          <TableHead>
            <TableRow >
              <TableCell padding="none">Descrição</TableCell>
              <TableCell padding="none">Tempo de Duração</TableCell>
              <TableCell padding="none">Valor</TableCell>
              <TableCell padding="none" align="center">Alterar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              servicos?.map((servico, index) => (
                <TableRow className={classes.linhaTabela} key={index} hover >
                  <TableCell padding="none">
                    <Typography>
                      {servico.descricao}
                    </Typography>
                  </TableCell>
                  <TableCell padding="none">
                    <Typography>{servico.tempoDuracao}</Typography>
                  </TableCell>
                  <TableCell padding="none">
                    <Typography>{servico.valor}</Typography>
                  </TableCell>
                  <TableCell padding="none" align="center">
                    <Tooltip title={`Alterar o serviço ${servico.descricao}`}>
                      <IconButton component={Link} to={`/servicos/alterarservico?id=${servico._id}`}>
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

export default memo(ListagemServicos);