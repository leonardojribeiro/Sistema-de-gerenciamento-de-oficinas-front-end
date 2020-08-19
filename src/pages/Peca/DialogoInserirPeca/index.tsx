import React, { useContext, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, MenuItem, Typography, makeStyles, Grid } from '@material-ui/core';
import { useState } from 'react';
import { Form, CampoDeTexto, CampoDeSelecao } from '../../../componentes/Form';
import Marca from '../../../Types/Marca';

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
  const { get, post} = useContext(ApiContext);
  const history = useHistory();
  const [marcas, setMarcas] = useState<Marca[]>([]);

  const manipularEnvio = useCallback(async (peca) => {
    if (peca) {
      const resposta = await post("/peca", peca);
      if (resposta) {
        history.goBack();
      }
    }
  },[history, post]);

  const listarMarcas = useCallback(async () => {
    const marcas = await get("/marca") as Marca[];
    if (marcas) {
      setMarcas(marcas);
    }
  }, [get,]);

  useEffect(() => {
    listarMarcas();
  }, [listarMarcas]);

  return (
    <Dialogo open title="Inserir peça">
      <Form onSubmit={manipularEnvio}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <CampoDeSelecao name="idMarca" label="Marca" fullWidth required  >
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
      </Form>
    </Dialogo>
  );
}

export default memo(DialogoInserirPeca);