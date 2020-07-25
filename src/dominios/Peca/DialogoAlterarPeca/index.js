import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import ApiContext from '../../../contexts/ApiContext';
import useAuth from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, MenuItem, Typography, makeStyles, Grid } from '@material-ui/core';
import CampoDeSelecao from '../../../componentes/Formulario/Campos/CampoDeSelecao';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta from '../../../componentes/Alerta';
import { useMemo } from 'react';
import { Formulario, CampoDeTexto } from '../../../componentes/Formulario';

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
  const history = useHistory();
  const [marcas, setMarcas] = useState([]);
  const [peca, setPeca] = useState({});
  const refAlerta = useRef();
  const id = useQuery("id");

  const manipularEnvio = useCallback(async (pecaASerAlterada) => {
    if (pecaASerAlterada) {
      if (!(pecaASerAlterada.descricao === peca.descricao) || !(pecaASerAlterada.idMarca === peca.idMarca)) {
        pecaASerAlterada._id = peca._id
        pecaASerAlterada.idOficina = idOficina;
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
  }, [history, idOficina, peca, put]);


  const popular = useCallback(async () => {
    const resposta = await get(`/peca/id?idOficina=${idOficina}&_id=${id}`)
    if (resposta) {
      setPeca(resposta)
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