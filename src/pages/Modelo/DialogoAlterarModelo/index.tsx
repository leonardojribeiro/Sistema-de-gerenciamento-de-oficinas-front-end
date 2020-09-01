import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, useRouteMatch, useLocation, Switch, Route, Link } from 'react-router-dom';
import { DialogActions, Button, MenuItem, Typography, makeStyles, Grid, Box, Tooltip, IconButton } from '@material-ui/core';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { useMemo } from 'react';
import comparar from '../../../recursos/Comparar';
import { Form, CampoDeSelecao, CampoDeTexto } from '../../../componentes/Form';
import Marca from '../../../Types/Marca';
import Modelo from '../../../Types/Modelo';
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

const DialogoAlterarModelo: React.FC = () => {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const { get, put } = useContext(ApiContext);
  const history = useHistory();
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelo, setModelo] = useState<Modelo | undefined>();
  const refAlerta = useRef<AlertaHandles>();
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  const manipularEnvio = useCallback(async (modeloASerAlterado) => {
    if (modeloASerAlterado && modelo) {
      if (!comparar(modelo, modeloASerAlterado)) {
        modeloASerAlterado._id = modelo._id
        const resposta = await put("/modelo", modeloASerAlterado);
        if (resposta) {
          history.goBack();
        }
      }
      else {
        if (refAlerta.current) {
          refAlerta.current.setTipo("warning");
          refAlerta.current.setMensagem("Nenhuma alteração foi efetuada.");
          refAlerta.current.setAberto(true);
        }
      }
    }
  }, [history, modelo, put]);

  const id = useQuery("id");

  const popular = useCallback(async () => {
    const resposta = await get(`/modelo/id?_id=${id}`) as Modelo;
    if (resposta) {
      setModelo(resposta)
    }
  }, [get, id]);

  const listarMarcas = useCallback(async () => {
    const marcas = await get(`/marca`) as Marca[];
    if (marcas) {
      setMarcas(marcas);
    }
    popular()
  }, [get, popular]);

  useEffect(() => {
    if (pathname.endsWith("alterarmodelo")) {
      listarMarcas();
    }
  }, [listarMarcas, pathname]);

  const conteudo = useMemo(() => (
    <Form onSubmit={manipularEnvio} initialData={modelo}>
      <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="end">
        <CampoDeSelecao name="marca" label="Marca" fullWidth required>
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
        <Link to={`${path}/inserirmarca`}>
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
  ), [classes.imgLogomarca, classes.itemMenu, imagensUrl, manipularEnvio, marcas, modelo, path])

  return (
    <Dialogo open title="Alterar modelo" maxWidth="xs" fullWidth>
      {conteudo}
      <Alerta ref={refAlerta} />
      <Switch>
        <Route path={`${url}/inserirmarca`} component={DialogInserirMarca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoAlterarModelo);