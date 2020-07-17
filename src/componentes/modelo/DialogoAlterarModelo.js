import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../Dialogo';
import ApiContext from '../../contexts/ApiContext';
import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../Formulario/Campos/CampoTexto';
import { DialogActions, Button, MenuItem, Typography, makeStyles, Grid } from '@material-ui/core';
import CampoDeSelecao from '../Formulario/Campos/CampoDeSelecao';
import { useState } from 'react';
import useQuery from '../../hooks/useQuery';
import Alerta from '../Alerta';
import { useMemo } from 'react';

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
  const { idOficina } = useAuth();
  const formularioReferencia = useRef();
  const history = useHistory();
  const [marcas, setMarcas] = useState([]);
  const [modelo, setModelo] = useState({});
  const refAlerta = useRef();

  const manipularEnvio = useCallback(async (modeloASerAlterado) => {
    console.log("enviando")
    if (modeloASerAlterado) {
      if (!(modeloASerAlterado.descricao === modelo.descricao) || !(modeloASerAlterado.idMarca === modelo.idMarca)) {
        modeloASerAlterado._id = modelo._id
        modeloASerAlterado.idOficina = idOficina;
        const resposta = await put("/modelo", modeloASerAlterado);
        if (resposta) {
          console.log("voltou")
          history.goBack();
        }
      }
      else {
        if (refAlerta.current) {
          refAlerta.current.setTipo("warning");
          refAlerta.current.setMensagem("Nenuma alteração foi efetuada.");
          refAlerta.current.setAberto(true);
        }
      }
    }
  }, [history, idOficina, modelo, put]);

  const id = useQuery("id");

  const popular = useCallback(async () => {
    const resposta = await get(`/modelo/id?idOficina=${idOficina}&_id=${id}`)
    if (resposta) {
      setModelo(resposta)
    }
  }, [get, id, idOficina]);

  const listarMarcas = useCallback(async () => {
    const marcas = await get(`/marca?idOficina=${idOficina}`);
    if (marcas) {
      setMarcas(marcas);
    }
    popular()
  }, [get, idOficina, popular]);

  useEffect(() => {
    if (aberto) {
      listarMarcas();
    }
    return () => {
      setModelo({});
    }
  }, [popular, listarMarcas, aberto])

  const conteudo = useMemo(() => (
    <Formulario ref={formularioReferencia} aoEnviar={manipularEnvio} dadosIniciais={modelo}>
      <CampoTexto
        nome="descricao"
        label="Descrição"
        fullWidth
        required
        autoFocus
      />
      <CampoDeSelecao
        nome="idMarca"
        label="Marca"
        fullWidth
        required
      >
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