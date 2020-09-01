import React, { useContext, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, useLocation, useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import { DialogActions, Button, MenuItem, Typography, makeStyles, Grid, Box, Tooltip, IconButton } from '@material-ui/core';
import { useState } from 'react';
import { Form, CampoDeTexto, CampoDeSelecao } from '../../../componentes/Form';
import Marca from '../../../Types/Marca';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DialogInserirMarca from '../../Marca/DialogInserirMarca';

const useStyles = makeStyles((theme) => ({
  listagem: {
    minHeight: "50vh",
  },
  imgLogomarca: {
    maxHeight: "32px",
    maxWidth: "32px",
    objectFit: "scale-down"
  },
  itemMenu: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

const DialogoInserirPeca: React.FC = () => {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const { get, post } = useContext(ApiContext);
  const history = useHistory();
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  const manipularEnvio = useCallback(async (peca) => {
    if (peca) {
      const resposta = await post("/peca", peca);
      if (resposta) {
        history.goBack();
      }
    }
  }, [history, post]);

  const listarMarcas = useCallback(async () => {
    const marcas = await get("/marca") as Marca[];
    if (marcas) {
      setMarcas(marcas);
    }
  }, [get,]);

  useEffect(() => {
    if (pathname.endsWith("pecas/inserir")) {
      listarMarcas();
    }
  }, [listarMarcas, pathname]);

  return (
    <Dialogo open title="Inserir peça" fullWidth maxWidth="xs">
      <Form onSubmit={manipularEnvio}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
          <CampoDeSelecao name="marca" label="Marca" fullWidth required>
            <MenuItem value="" className={classes.itemMenu}>Inserir marca</MenuItem>
            {
              marcas.map((marca, index) => (
                <MenuItem key={index} value={marca._id} className={classes.itemMenu}>
                  <Grid container justify="space-between">
                    <Typography>{marca.descricao}</Typography>
                    <img src={`${imagensUrl}/${marca.uriLogo}`} alt={`logomarca da marca ${marca.descricao}`} className={classes.imgLogomarca} />
                  </Grid>
                </MenuItem>
              ))
            }
          </CampoDeSelecao>
          <Link to={`${path}/marca/inserir`}>
            <Tooltip title="Inserir marca">
              <IconButton>
                <CreateNewFolderIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <DialogActions >
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
      <Switch>
        <Route path={`${url}/marca/inserir`} component={DialogInserirMarca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoInserirPeca);