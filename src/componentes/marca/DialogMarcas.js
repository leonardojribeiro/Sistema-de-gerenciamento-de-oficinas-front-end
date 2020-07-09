import React, { useState, useCallback } from 'react';
import { IconButton, makeStyles, Box, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button } from '@material-ui/core';
import { useEffect } from 'react';
import api from '../../servicos/api';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import EditIcon from '@material-ui/icons/Edit';
import Dialogo from '../Dialogo';
import { Link } from 'react-router-dom';
import CampoDeBusca from '../CampoDeBusca';
import Form from '../Formulario/Form';

const useStyles = makeStyles((theme) => ({
  listagem: {
    minHeight: "30vh",
    maxHeight: "50vh",
    overflowY: "scroll"
  },
  imgLogomarca: {
    minHeight: "32px",
    maxHeight: "64px",
    minWidth: "64px",
    maxWidth: "96px",
  },
  linhaTabela: {
    height: "78px",
  }
}));

function DialgoMarcas() {
  const classes = useStyles();
  const { usuario } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const [marcas, setMarcas] = useState(null);

  const listar = useCallback(async()=> {
    const marcas = await api.get(`${apiUrl}/marca?idOficina=${usuario.idOficina._id}`);
    console.log(marcas.data);
    setMarcas(marcas.data);
  },[apiUrl, usuario])

  useEffect(() => {
    listar();
  }, [listar]);

  return (
    <Dialogo titulo="Marcas">
      <Form >
        <Box display="flex" justifyContent="space-between" alignItems="flex-end">
          <CampoDeBusca
            nome = "marca"
            label="Buscar"
          />
          <Box ml={1}>
            <Button
              style={{ whiteSpace: 'nowrap' }}
              variant="outlined"
              component={Link}
              to={"/marcas/inserir"}
            >Inserir marca</Button>
          </Box>
        </Box>
      </Form>
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <Box className={classes.listagem} border={1} mb={2}>
        <TableContainer component={Paper}>
          <Table spacing={2} size="small">
            <TableHead>
              <TableRow >
                <TableCell>Descrição</TableCell>
                <TableCell>Logomarca</TableCell>
                <TableCell>Alterar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                marcas ? marcas.map((marca, index) => (
                  <TableRow className={classes.linhaTabela} key={index} hover>
                    <TableCell>{marca.descricao}</TableCell>
                    <TableCell align="right">
                      <Box display="flex" alignItems="center" justifyContent="center">
                        <img
                          className={classes.imgLogomarca}
                          src={`${imagensUrl}/${marca.uriLogo}`}
                          alt={`logomarca da marca ${marca.descricao}`}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                  : (
                    <>

                    </>
                  )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Dialogo>
  );
}

export default DialgoMarcas;