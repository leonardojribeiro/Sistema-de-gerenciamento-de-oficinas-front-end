import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, MenuItem, Typography, makeStyles, Grid } from '@material-ui/core';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta from '../../../componentes/Alerta';
import { useMemo } from 'react';
import comparar from '../../../recursos/Comparar';
import { Formulario, CampoDeSelecao, CampoDeTexto } from '../../../componentes/Formulario';

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

function DialogoAlterarModelo({ aberto }) {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const { get, put } = useContext(ApiContext);
  const history = useHistory();
  const [marcas, setMarcas] = useState([]);
  const [modelo, setModelo] = useState({});
  const refAlerta = useRef();

  const manipularEnvio = useCallback(async (modeloASerAlterado) => {
    if (modeloASerAlterado) {
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
    const resposta = await get(`/modelo/id?_id=${id}`)
    if (resposta) {
      setModelo(resposta)
    }
  }, [get, id]);

  const listarMarcas = useCallback(async () => {
    const marcas = await get(`/marca`);
    if (marcas) {
      setMarcas(marcas);
    }
    popular()
  }, [get, popular]);

  useEffect(() => {
    if (aberto) {
      listarMarcas();
    }
    return () => {
      setModelo({});
    }
  }, [popular, listarMarcas, aberto])

  const conteudo = useMemo(() => (
    <Formulario aoEnviar={manipularEnvio} dadosIniciais={modelo}>
      <CampoDeTexto nome="descricao" label="Descrição" fullWidth required autoFocus />
      <CampoDeSelecao nome="idMarca" label="Marca" fullWidth required>
        {
          marcas.map((marca, index) => (
            <MenuItem key={index} value={marca._id} className={classes.itemMenu}>
              <Grid container justify="space-between">
                <Typography>{marca.descricao}</Typography>
                <img src={`${imagensUrl}/${marca.uriLogo}`} alt="" className={classes.imgLogomarca} />
              </Grid>
            </MenuItem>
          ))
        }
      </CampoDeSelecao>
      <DialogActions >
        <Button type="submit">Salvar</Button>
      </DialogActions>
    </Formulario>
  ), [classes, imagensUrl, manipularEnvio, marcas, modelo])

  return (
    <Dialogo aberto={aberto} titulo="Alterar modelo">
      {conteudo}
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(DialogoAlterarModelo);