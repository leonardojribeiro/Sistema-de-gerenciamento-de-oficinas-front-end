import React, { useContext, useState, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, MenuItem, Typography, makeStyles, Grid } from '@material-ui/core';
import { Formulario, CampoDeSelecao, CampoDeTexto } from '../../../componentes/Form';

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

function DialogoInserirModelo({ aberto }) {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const { get, post } = useContext(ApiContext);
  const history = useHistory();
  const [marcas, setMarcas] = useState([]);

  const manipularEnvio = useCallback(async (modelo) => {
    if (modelo) {
      const resposta = await post("/modelo", modelo);
      if (resposta) {
        history.goBack();
      }
    }
  },[history, post]);

  const listarMarcas = useCallback(async () => {
    const marcas = await get(`/marca`);
    if (marcas) {
      setMarcas(marcas);
    }
  }, [get,]);

  useEffect(() => {
    listarMarcas();
  }, [listarMarcas]);

  return (
    <Dialogo aberto={aberto} titulo="Inserir modelo">
      <Formulario aoEnviar={manipularEnvio}>
        <CampoDeTexto nome="descricao" label="Descrição" fullWidth required autoFocus /> 
        <CampoDeSelecao  nome="idMarca" label="Marca" nfullWidth required>
          <MenuItem value="" className={classes.itemMenu}>Nenhum</MenuItem>
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
    </Dialogo>
  );
}

export default memo(DialogoInserirModelo);