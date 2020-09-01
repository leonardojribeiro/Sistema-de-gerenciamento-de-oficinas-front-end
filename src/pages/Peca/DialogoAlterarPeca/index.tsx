import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory, Link, Route, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import { DialogActions, Button, MenuItem, Typography, makeStyles, Grid, Box, Tooltip, IconButton } from '@material-ui/core';
import CampoDeSelecao from '../../../componentes/Form/Fields/SelectField';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { useMemo } from 'react';
import { Form, CampoDeTexto } from '../../../componentes/Form';
import Marca from '../../../Types/Marca';
import Peca from '../../../Types/Peca';
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
  const [peca, setPeca] = useState<Peca | undefined>();
  const refAlerta = useRef<AlertaHandles>();
  const id = useQuery("id");
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  const manipularEnvio = useCallback(async (pecaASerAlterada) => {
    if (pecaASerAlterada && peca) {
      if (!(pecaASerAlterada.descricao === peca.descricao) || !(pecaASerAlterada.idMarca === peca.idMarca)) {
        pecaASerAlterada._id = peca._id;
        const resposta = await put("/peca", pecaASerAlterada);
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
  }, [history, peca, put]);


  const popular = useCallback(async () => {
    const resposta = await get(`/peca/id?_id=${id}`) as Peca;
    if (resposta) {
      setPeca(resposta)
    }
  }, [get, id,]);

  const listarMarcas = useCallback(async () => {
    const marcas = await get("/marca") as Marca[];
    if (marcas) {
      setMarcas(marcas);
    }
    popular()
  }, [get, popular]);

  useEffect(() => {
    if (pathname.endsWith("pecas/alterar")) {
      popular();
      listarMarcas();
    }
  }, [popular, listarMarcas, pathname])

  const conteudo = useMemo(() => (
    <Form onSubmit={manipularEnvio} initialData={peca}>
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
  ), [classes.imgLogomarca, classes.itemMenu, imagensUrl, manipularEnvio, marcas, path, peca])

  return (
    <Dialogo open title="Alterar peça" fullWidth maxWidth="xs">
      {conteudo}
      <Alerta ref={refAlerta} />
      <Switch>
        <Route path={`${url}/marca/inserir`} component={DialogInserirMarca} />
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogoAlterarModelo);