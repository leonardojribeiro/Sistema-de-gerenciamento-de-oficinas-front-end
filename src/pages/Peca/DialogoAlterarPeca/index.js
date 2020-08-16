import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, MenuItem, Typography, makeStyles, Grid } from '@material-ui/core';
import CampoDeSelecao from '../../../componentes/Form/Fields/SelectField';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta from '../../../componentes/Alerta';
import { useMemo } from 'react';
import { Formulario, CampoDeTexto } from '../../../componentes/Form';

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
  const [peca, setPeca] = useState({});
  const refAlerta = useRef();
  const id = useQuery("id");

  const manipularEnvio = useCallback(async (pecaASerAlterada) => {
    if (pecaASerAlterada) {
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
    const resposta = await get(`/peca/id?_id=${id}`)
    if (resposta) {
      setPeca(resposta)
    }
  }, [get, id,]);

  const listarMarcas = useCallback(async () => {
    const marcas = await get("/marca");
    if (marcas) {
      setMarcas(marcas);
    }
    popular()
  }, [get,  popular]);

  useEffect(() => {
    if (aberto) {
      listarMarcas();
    }
    return () => {
      setPeca({});
    }
  }, [popular, listarMarcas, aberto])

  const conteudo = useMemo(() => (
    <Formulario aoEnviar={manipularEnvio} dadosIniciais={peca}>
      <CampoDeTexto nome="descricao" label="Descrição" fullWidth required autoFocus />
      <CampoDeSelecao nome="idMarca" label="Marca" fullWidth required >
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
  ), [classes, imagensUrl, manipularEnvio, marcas, peca])

  return (
    <Dialogo aberto={aberto} titulo="Alterar peça">
      {conteudo}
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(DialogoAlterarModelo);